import { Observable } from './Observable';
import { IReactScrollProvider } from '../types';

class ScrollContainerService extends Observable {
  private scrollContainerName!: string;
  private scrollContainer!: HTMLDivElement;
  private scrollContainerBoundingTop!: number;
  private scrollContainerAnchorsScrollProgress: number = 0;
  private scrollContainerAnchors: { [key: string]: number } = {};
  private onTop: IReactScrollProvider['onTop'];
  private onEnd: IReactScrollProvider['onEnd'];
  private _onScroll: IReactScrollProvider['onScroll'];
  parallaxBanners = new Map();

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry: any) => {
        this.parallaxBanners.set(entry.target, entry);
      });
    },
    {
      root: this.scrollContainer,
    }
  );

  constructor({
    onTop,
    onEnd,
    onScroll,
    ...rest
  }: IReactScrollProvider & {
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

  calcParallaxProgress = (bannerElement: HTMLDivElement) => {
    const containerHeight = this.scrollContainer.clientHeight;
    const elementHeight = bannerElement.clientHeight;
    const wrapper = containerHeight + elementHeight;
    const elementBottomPosition = bannerElement.getBoundingClientRect().bottom;
    const value =
      wrapper -
      (elementBottomPosition - this.scrollContainer.getClientRects()[0].top);
    const progress = value / wrapper;
    return Number(progress.toFixed(3));
  };

  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.scrollPosition = e.currentTarget.scrollTop;
    if (this._onScroll) {
      this._onScroll({
        scrollContainerName: this.scrollContainerName,
        scrollPosition: this.scrollPosition,
      });
    }
    if (this.observers.length) {
      this.notifyObservers();
    }
    if (this.scrollPosition === 0) {
      if (this.onTop) {
        this.onTop();
      }
    } else {
      const scrollHeight = e.currentTarget!.scrollHeight;
      const clientHeight = e.currentTarget!.clientHeight;
      const isEnd = this.scrollPosition + clientHeight >= scrollHeight;
      if (isEnd && this.onEnd) {
        this.onEnd();
      }
    }
    let value =
      this.scrollPosition /
      (this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight);
    this.scrollContainerAnchorsScrollProgress = Math.min(
      Math.max(value * 100, 0),
      100
    );
  };

  getScrollProgress() {
    return this.scrollContainerAnchorsScrollProgress;
  }

  getScrollContainer() {
    return this.scrollContainer;
  }

  getScrollPosition = () => this.scrollPosition;

  addAnchor(id: string, el: HTMLElement) {
    this.scrollContainerAnchors[id] = el.getBoundingClientRect().top;
  }
  getAnchor(id: string) {
    return this.scrollContainerAnchors[id];
  }
  removeAnchor(id: string) {
    delete this.scrollContainerAnchors[id];
  }

  scrollToAnchor(anchor: string) {
    let item = this.getAnchor(anchor);
    if (item === null || item === undefined) return;
    this.scrollContainer.scrollTo({
      top: item - this.scrollContainerBoundingTop,
    });
  }
}

export { ScrollContainerService };
