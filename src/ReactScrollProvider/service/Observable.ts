import { setScrollPosition } from '../types';

class Observable {
  protected scrollPosition = 0;
  protected observers: setScrollPosition[] = [];

  addObserver(observer: setScrollPosition) {
    this.observers.push(observer);
    return (
      setScrollPosition: React.Dispatch<React.SetStateAction<number>>
    ) => {
      this.observers = this.observers.filter(
        (item) => item.setScrollPosition !== setScrollPosition
      );
    };
  }
  notifyObservers() {
    this.observers.forEach(({ setScrollPosition }: setScrollPosition) => {
      setScrollPosition(() => this.scrollPosition);
    });
  }
}

export { Observable };
