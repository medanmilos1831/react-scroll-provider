import { Observable } from './Observable';
import { IReactScrollProvider } from './types';

class ScrollService extends Observable {
  private onTop: IReactScrollProvider['onTop'];
  private onEnd: IReactScrollProvider['onEnd'];
  private _onScroll: IReactScrollProvider['onScroll'];
  private element!: HTMLDivElement;
  private scrollContainerBoundingTop!: number;
  private scrollProgress: number = 0;
  private anchors: { [key: string]: number } = {};

  constructor({ onTop, onEnd, onScroll }: IReactScrollProvider) {
    super();
    this.onTop = onTop;
    this.onEnd = onEnd;
    this._onScroll = onScroll;
  }

  setElement = (el: HTMLDivElement) => (this.element = el);
  getElement = () => this.element;
  setScrollContainerBoundingTop = (top: number) => {
    this.scrollContainerBoundingTop = top;
  };
  getScrollPosition = () => this.scrollPosition;
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.scrollPosition = e.currentTarget.scrollTop;
    if (this._onScroll) {
      this._onScroll({
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
      (this.element.scrollHeight - this.element.clientHeight);
    this.scrollProgress = Math.min(Math.max(value * 100, 0), 100);
  };

  getScrollProgress() {
    return this.scrollProgress;
  }

  addAnchor(id: string, el: HTMLElement) {
    this.anchors[id] = el.getBoundingClientRect().top;
  }
  getAnchor(id: string) {
    return this.anchors[id];
  }
  removeAnchor(id: string) {
    delete this.anchors[id];
  }

  scrollToAnchor(anchor: string) {
    let item = this.getAnchor(anchor);
    if (item === null || item === undefined) return;
    this.getElement().scrollTo({
      top: item - this.scrollContainerBoundingTop,
    });
  }
}

export { ScrollService };
