import { setScrollPosition } from '../types';

/**
 * `Observable` class provides a mechanism to manage and notify observers about changes in scroll position.
 * Observers are functions that get updated with the current scroll position when notified.
 */
class Observable {
  scrollPosition = 0; // Current scroll position
  protected observers: setScrollPosition[] = []; // List of observer functions

  /**
   * Registers a new observer function to listen for scroll position changes.
   *
   * @param {setScrollPosition} observer - Function to be called when the scroll position updates.
   * @returns {Function} - A function to unregister the observer when no longer needed.
   *
   * @example
   * const unregister = observable.addObserver((newScrollPosition) => {
   *   console.log(newScrollPosition);
   * });
   * // To unregister the observer
   * unregister();
   */
  addObserver(observerItem: setScrollPosition) {
    this.observers.push(observerItem);
    return (
      setScrollPosition: React.Dispatch<React.SetStateAction<number>>
    ) => {
      this.observers = this.observers.filter(
        (item) => item.setScrollPosition !== setScrollPosition
      );
    };
  }

  /**
   * Notifies all registered observers about the current scroll position.
   * Each observer function is called with the updated scroll position.
   *
   * @example
   * // Assuming `observable` is an instance of `Observable`
   * observable.notifyObservers();
   */
  notifyObservers() {
    this.observers.forEach(({ setScrollPosition }: setScrollPosition) => {
      setScrollPosition(() => this.scrollPosition);
    });
  }
}

export { Observable };
