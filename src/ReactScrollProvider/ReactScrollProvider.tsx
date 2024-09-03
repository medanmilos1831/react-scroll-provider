import {
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ReactScrollContext } from './ReactScrollContext';
import { ScrollService } from './ScrollService';
import { IReactScrollProvider } from './types';

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

const ScrollContainer = ({
  children,
  ...rest
}: PropsWithChildren<IReactScrollProvider>) => {
  const { scroll } = useContext(ReactScrollContext)!;
  const element = useRef<HTMLDivElement>(null);
  const [_, setState] = useState(false);
  useEffect(() => {
    scroll.createScrollContainer({
      ...rest,
      container: element.current!,
      containerBoundingTop: element.current?.getBoundingClientRect()
        .top as number,
    });
    setState((prev) => !prev);
  }, []);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          overflow: 'scroll',
          scrollBehavior: 'smooth',
        }}
        ref={element}
        onScroll={(e) => {
          scroll.scrollContainers[rest.scrollContainerName].onScroll(e);
        }}
      >
        {_ ? children : null}
      </div>
    </div>
  );
};

const ScrollAnchor = ({
  children,
  scrollContainerName,
  id,
  className,
}: PropsWithChildren<{
  scrollContainerName: string;
  id: string;
  className?: string;
}>) => {
  const el = useRef<HTMLDivElement>(null);
  const ctx = useContext(ReactScrollContext);
  useLayoutEffect(() => {
    ctx?.scroll.scrollContainers[scrollContainerName].addAnchor(
      id,
      el.current!
    );
    return () => {
      ctx?.scroll.scrollContainers[scrollContainerName].removeAnchor(id);
    };
  });
  return (
    <div ref={el} id={id} className={className}>
      {children}
    </div>
  );
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.ScrollContainer = ScrollContainer;

const useScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollPosition: () => {
      return ctx.scroll.scrollContainers[
        scrollContainerName
      ].getScrollPosition();
    },
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

export { ReactScrollProvider, useScroll, useWatchScroll };
