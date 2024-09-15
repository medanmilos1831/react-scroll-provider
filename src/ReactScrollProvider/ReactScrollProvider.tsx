import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ScrollService } from './service/ScrollService';
import { ParallaxBanner } from './components/ParallaxBanner';
import { ScrollAnchor } from './components/ScrollAnchor';
import { ScrollContainer } from './components/ScrollContainer';
import { ReactScrollContext } from './context/ReactScrollContext';
/**
 * ReactScrollProvider is a provider component that shares an instance of ScrollService
 * through React Context, making it available to all child components.
 *
 * @param {React.ReactNode} props.children - Child components that will have access to the scroll service.
 * @returns {JSX.Element} - The provider component that shares the ScrollService via Context API.
 */
const ReactScrollProvider = ({ children }: PropsWithChildren) => {
  const [scroll] = useState(new ScrollService());
  return (
    <ReactScrollContext.Provider
      value={{
        scroll,
      }}
    >
      {children}
    </ReactScrollContext.Provider>
  );
};

/**
 * Custom hook to interact with a specific scroll container.
 *
 * This hook provides methods to retrieve and manipulate scroll container properties
 * and behaviors for a given scroll container name. It relies on the `ReactScrollContext`
 * to access the scroll container's data and methods.
 *
 * @param {string} scrollContainerName - The unique name of the scroll container to interact with.
 * @returns {object} - An object containing methods to interact with the specified scroll container:
 *   - `getScrollPosition`: A function that returns the current scroll position of the container.
 *   - `getScrollContainer`: A function that returns the HTML element representing the scroll container.
 *   - `getAnchor`: A function that retrieves the position of an anchor by its unique ID.
 *   - `scrollToAnchor`: A function that scrolls to a specific anchor within the container by its unique ID.
 *
 * @example
 * // Assuming `scrollContainerName` is a valid name for a scroll container
 * const { getScrollPosition, getElement, getAnchor, scrollToAnchor } = useScroll(scrollContainerName);
 *
 * const position = getScrollPosition();
 * const containerElement = getElement();
 * const anchorPosition = getAnchor('anchor-id');
 * scrollToAnchor('anchor-id');
 */
const useScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollPosition: () => {
      return ctx.scroll.scrollContainers[scrollContainerName].scrollPosition;
    },
    getScrollContainer: () =>
      ctx.scroll.scrollContainers[scrollContainerName].scrollContainer,
    getAnchor: (id: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].getAnchor(id),
    scrollToAnchor: (anchor: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].scrollToAnchor(anchor),
    scrollTo: (value: number) => {
      ctx.scroll.scrollContainers[scrollContainerName].scrollTo(value);
    },
  };
};

/**
 * Custom hook to monitor scroll position and progress of a specific scroll container.
 *
 * This hook subscribes to scroll events of a specified scroll container and provides
 * the current scroll position and progress. It uses the `ReactScrollContext` to access
 * the scroll container's methods and state. The hook sets up an observer to update the scroll
 * position and cleans up the observer on component unmount.
 *
 * @param {string} scrollContainerName - The unique name of the scroll container to observe.
 * @returns {object} - An object containing:
 *   - `scrollPosition`: The current scroll position of the container.
 *   - `scrollProgress`: The current scroll progress as a percentage, if available.
 *
 * @example
 * // Assuming `scrollContainerName` is a valid name for a scroll container
 * const { scrollPosition, scrollProgress } = useWatchScroll(scrollContainerName);
 * console.log(scrollPosition); // Logs the current scroll position
 * console.log(scrollProgress); // Logs the current scroll progress percentage
 */
const useWatchScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    // Register an observer to track scroll position changes
    let observer = ctx.scroll.scrollContainers[scrollContainerName].addObserver(
      { setScrollPosition }
    );
    // Cleanup the observer when the component unmounts
    return () => {
      observer(setScrollPosition);
    };
  }, []);
  return {
    scrollPosition,
    scrollProgress:
      ctx.scroll.scrollContainers[scrollContainerName]?.scrollProgress,
  };
};

const useGetScrollProvider = () => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollProvider: () => ctx.scroll,
  };
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.ParallaxBanner = ParallaxBanner;
ReactScrollProvider.ScrollContainer = ScrollContainer;

export { ReactScrollProvider, useScroll, useWatchScroll, useGetScrollProvider };
