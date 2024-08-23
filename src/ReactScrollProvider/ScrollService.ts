import { Observable } from './Observable';

class ScrollService extends Observable {
  private onTop: (() => void) | undefined;
  private onEnd: (() => void) | undefined;
  private element!: HTMLDivElement;

  constructor({ onTop, onEnd }: { onTop?: () => void; onEnd?: () => void }) {
    super();
    this.onTop = onTop;
    this.onEnd = onEnd;
  }
  setElement = (el: HTMLDivElement) => (this.element = el);
  getElement = () => this.element;
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.scrollPosition = e.currentTarget.scrollTop;
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
