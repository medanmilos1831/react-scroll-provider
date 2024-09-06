import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ScrollService } from './service/ScrollService';
import { ParallaxBanner } from './components/ParallaxBanner';
import { ScrollAnchor } from './components/ScrollAnchor';
import { ScrollContainer } from './components/ScrollContainer';
import { ReactScrollContext } from './context/ReactScrollContext';
const ReactScrollProvider = ({ children }: PropsWithChildren) => {
  const scroll = new ScrollService();
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

const useScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollPosition: () => {
      return ctx.scroll.scrollContainers[
        scrollContainerName
      ].getScrollPosition();
    },
    getElement: () =>
      ctx.scroll.scrollContainers[scrollContainerName].getScrollContainer,
    getAnchor: (id: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].getAnchor(id),
    scrollToAnchor: (anchor: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].scrollToAnchor(anchor),
  };
};

const useWatchScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let observer = ctx.scroll.scrollContainers[scrollContainerName].addObserver(
      { setScrollPosition }
    );
    return () => {
      observer(setScrollPosition);
    };
  }, []);
  return {
    scrollPosition,
    scrollProgress:
      ctx.scroll.scrollContainers[scrollContainerName]?.getScrollProgress(),
  };
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.ParallaxBanner = ParallaxBanner;
ReactScrollProvider.ScrollContainer = ScrollContainer;

export { ReactScrollProvider, useScroll, useWatchScroll };
