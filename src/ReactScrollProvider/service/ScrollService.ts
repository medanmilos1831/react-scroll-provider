import { IScrollContainer } from '../types';
import { ScrollContainerService } from './ScrollContainerService';

/**
 * ScrollService manages multiple scroll containers and provides methods to create and store them.
 */
class ScrollService {
  // Dictionary to store instances of ScrollContainerService by their names
  scrollContainers: { [key: string]: ScrollContainerService } = {};

  /**
   * Creates a new scroll container and stores it in the scrollContainers dictionary.
   *
   * @param {IScrollContainer} params - Parameters needed to create and configure the scroll container.
   * @param {HTMLDivElement} params.container - The HTML element that will act as the scroll container.
   * @param {number} params.containerBoundingTop - The top bounding position of the scroll container.
   * @param {string} params.scrollContainerName - A unique name for the scroll container.
   */
  createScrollContainer = (params: IScrollContainer) => {
    // Storing a new instance of ScrollContainerService in the scrollContainers dictionary
    this.scrollContainers = {
      ...this.scrollContainers,
      [params.scrollContainerName]: new ScrollContainerService(params),
    };
  };
}

export { ScrollService };
