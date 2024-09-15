import { Observable } from './Observable';
import { IScrollContainerProps } from '../types';

/**
 * ScrollContainerService manages the scroll behavior within a specific scroll container.
 * It handles scroll events, calculates parallax progress, and manages anchors within the container.
 */
class ScrollContainerService extends Observable {
  scrollContainer!: HTMLDivElement;
  scrollProgress: number = 0;
  parallaxBanners = new Map();
  private scrollContainerName!: string;
  private scrollContainerBoundingTop!: number;
  private scrollContainerAnchors: { [key: string]: number } = {};
  private onTop: IScrollContainerProps['onTop'];
  private onEnd: IScrollContainerProps['onEnd'];
  private _onScroll: IScrollContainerProps['onScroll'];

  /**
   * IntersectionObserver instance to monitor intersections of elements within the specified scroll container.
   *
   * @type {IntersectionObserver}
   */
  intersectionObserver = new IntersectionObserver(
    /**
     * Callback function that is invoked when observed elements intersect with the specified root element.
     *
     * @param {IntersectionObserverEntry[]} entries - An array of entries representing each observed element and its intersection status.
     */
    (entries) => {
      entries.forEach((entry: any) => {
        // Store the intersection details of each observed element in the parallaxBanners map
        this.parallaxBanners.set(entry.target, entry);
      });
    },
    {
      /**
       * The root element serves as the viewport for intersection observations.
       * Only elements within this container will be observed for intersection changes.
       *
       * @type {HTMLDivElement}
       */
      root: this.scrollContainer,
    }
  );
  /**
   * Constructs a ScrollContainerService instance with necessary parameters.
   *
   * @param {IScrollContainer} params - Parameters to initialize the scroll container.
   * @param {HTMLDivElement} params.container - The HTML element acting as the scroll container.
   * @param {number} params.containerBoundingTop - The top bounding position of the scroll container.
   * @param {string} params.scrollContainerName - A unique name for the scroll container.
   * @param {function} params.onTop - Callback function triggered when the top of the scroll container is reached.
   * @param {function} params.onEnd - Callback function triggered when the bottom of the scroll container is reached.
   * @param {function} params.onScroll - Callback function triggered on scroll events.
   */
  constructor({
    onTop,
    onEnd,
    onScroll,
    ...rest
  }: IScrollContainerProps & {
    container: HTMLDivElement;
    containerBoundingTop: number;
    scrollContainerName: string;
  }) {
    super();
    this.scrollContainerName = rest.scrollContainerName;
    this.scrollContainer = rest.container;
    this.scrollContainerBoundingTop = rest.containerBoundingTop;
    this.onTop = onTop;
    this.onEnd = onEnd;
    this._onScroll = onScroll;
  }

  // ===============================================================
  // Start of Parallax Progress Calculation
  // ===============================================================
  /**
   * Calculates the parallax progress of a banner element within the scroll container.
   *
   * This method determines how far a given banner element has moved within the viewport of the scroll container,
   * expressed as a ratio between 0 and 1, where 0 means the element is at the start of its visibility and
   * 1 means the element is fully visible at the end of the scroll container.
   *
   * @param {HTMLDivElement} bannerElement - The banner element whose parallax progress is to be calculated.
   * @returns {number} - The parallax progress of the banner element, a number between 0 and 1.
   *
   * @example
   * // Assuming `banner` is an HTMLDivElement and `scrollService` is an instance of ScrollService
   * const progress = scrollService.calcParallaxProgress(banner);
   * console.log(progress); // Logs the parallax progress of the banner element
   */
  calcParallaxProgress = (bannerElement: HTMLDivElement) => {
    // Get the height of the scroll container (the visible viewport area)
    const containerHeight = this.scrollContainer.clientHeight;

    // Get the height of the banner element
    const elementHeight = bannerElement.clientHeight;

    // Calculate the total height considered for parallax effect
    // This includes the height of the scroll container and the height of the banner element
    const wrapper = containerHeight + elementHeight;

    // Get the vertical position of the bottom of the banner element relative to the viewport
    const elementBottomPosition = bannerElement.getBoundingClientRect().bottom;

    // Calculate the vertical distance from the top of the scroll container to the bottom of the banner element
    const value =
      wrapper -
      (elementBottomPosition - this.scrollContainer.getClientRects()[0].top);

    // Compute the progress of the banner element's position relative to the total height (wrapper)
    const progress = value / wrapper;

    // Return the parallax progress, rounded to three decimal places for precision
    return Number(progress.toFixed(3));
  };
  // ===============================================================
  // End of Parallax Progress Calculation
  // ===============================================================

  // ===============================================================
  // Start of Scroll Event Handling
  // ===============================================================

  /**
   * Handles scroll events within the scroll container and triggers the appropriate callbacks.
   *
   * This method updates the scroll position, triggers the onScroll callback, notifies any observers
   * about the scroll event, and checks if the scroll position is at the top or the bottom of the container.
   * It also calculates the scroll progress as a percentage of the scroll container's total height.
   *
   * @param {React.UIEvent<HTMLDivElement>} e - The scroll event triggered by the user scrolling within the container.
   *
   * @example
   * // Assuming `scrollService` is an instance of ScrollService
   * // and it has callbacks defined for onScroll, onTop, and onEnd
   * scrollService.onScroll(event);
   */
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Update the current scroll position of the container
    this.scrollPosition = e.currentTarget.scrollTop;

    // Trigger the onScroll callback if it is defined
    if (this._onScroll) {
      this._onScroll({
        scrollContainerName: this.scrollContainerName,
        scrollPosition: this.scrollPosition,
      });
    }

    // Notify all observers about the scroll event
    // ===============================================================
    // Notify all registered observers about the current scroll event.
    // Observers are added via `useWatchScroll`, and `this.notifyObservers()`
    // calls each observer with the latest scroll data.
    // ===============================================================
    if (this.observers.length) {
      this.notifyObservers();
    }

    // Check if the scroll position is at the top of the container
    if (this.scrollPosition === 0 && this.onTop) {
      this.onTop();
    }

    // Check if the scroll position is at the bottom of the container
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    const isEnd = this.scrollPosition + clientHeight >= scrollHeight;

    if (isEnd && this.onEnd) {
      this.onEnd();
    }

    // Calculate the scroll progress as a percentage
    let value =
      this.scrollPosition /
      (this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight);
    this.scrollProgress = Math.min(Math.max(value * 100, 0), 100);
  };
  // ===============================================================
  // End of Scroll Event Handling
  // ===============================================================

  /**
   * Adds a new anchor with a unique ID to the scroll container.
   *
   * @param {string} id - The unique ID for the anchor.
   * @param {HTMLElement} el - The HTML element to use as an anchor.
   */
  addAnchor(id: string, el: HTMLElement) {
    this.scrollContainerAnchors[id] = el.getBoundingClientRect().top;
  }

  /**
   * Gets the position of an anchor by its unique ID.
   *
   * @param {string} id - The unique ID of the anchor.
   * @returns {number | undefined} - The position of the anchor, or undefined if it does not exist.
   */
  getAnchor(id: string) {
    return this.scrollContainerAnchors[id];
  }

  /**
   * Removes an anchor by its unique ID.
   *
   * @param {string} id - The unique ID of the anchor to remove.
   */
  removeAnchor(id: string) {
    delete this.scrollContainerAnchors[id];
  }

  /**
   * Scrolls to a specific anchor within the scroll container.
   *
   * @param {string} anchor - The unique ID of the anchor to scroll to.
   */
  scrollToAnchor(anchor: string) {
    let item = this.getAnchor(anchor);
    if (item === null || item === undefined) return;
    this.scrollContainer.scrollTo({
      top: item - this.scrollContainerBoundingTop,
    });
  }

  scrollTo(value: number) {
    this.scrollContainer.scrollTo({
      top: value,
      behavior: 'smooth',
    });
  }
}

export { ScrollContainerService };
