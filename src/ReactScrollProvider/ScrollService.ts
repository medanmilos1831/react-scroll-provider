import { Observable } from './Observable';
import { IReactScrollProvider } from './types';

class ScrollService extends Observable {
  private onTop: IReactScrollProvider['onTop'];
  private onEnd: IReactScrollProvider['onEnd'];
  private _onScroll: IReactScrollProvider['onScroll'];
  private element!: HTMLDivElement;

  constructor({ onTop, onEnd, onScroll }: IReactScrollProvider) {
    super();
    this.onTop = onTop;
    this.onEnd = onEnd;
    this._onScroll = onScroll;
  }

  setElement = (el: HTMLDivElement) => (this.element = el);
  getElement = () => this.element;
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
  };
}

export { ScrollService };
