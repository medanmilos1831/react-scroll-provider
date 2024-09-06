import { ScrollContainerService } from './ScrollContainerService';
import { IReactScrollProvider } from '../types';

class ScrollService {
  scrollContainers: { [key: string]: ScrollContainerService } = {};

  createScrollContainer = (
    params: IReactScrollProvider & {
      container: HTMLDivElement;
      containerBoundingTop: number;
      scrollContainerName: string;
    }
  ) => {
    this.scrollContainers = {
      ...this.scrollContainers,
      [params.scrollContainerName]: new ScrollContainerService(params),
    };
  };
}

export { ScrollService };
