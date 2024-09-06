import {
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ProgressLinePointer } from './ProgressLinePointer';
import { ReactScrollContext } from './ReactScrollContext';
import { ScrollService } from './ScrollService';
import { IReactScrollProvider } from './types';
import { ScrollContainerContext } from './ScrollContainerContext';
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

  function throttle(fn: any, limit: number) {
    let lastCall = 0;
    return function (...args: any) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn(...args);
      }
    };
  }

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
        onScroll={throttle((e: any) => {
          scroll.scrollContainers[rest.scrollContainerName].onScroll(e);
        }, rest.throttle ?? 0)}
      >
        {_ ? (
          <ScrollContainerContext.Provider
            value={scroll.scrollContainers[rest.scrollContainerName]}
          >
            {children}
          </ScrollContainerContext.Provider>
        ) : null}
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

const ParallaxBanner = ({
  children,
  speed,
}: PropsWithChildren<{ scrollContainerName: string; speed: number }>) => {
  const {
    scrollContainerName,
    intersectionObserver,
    parallaxBanners,
    calcParallaxProgress,
  } = useContext(ScrollContainerContext);
  const { scrollPosition } = useWatchScroll(scrollContainerName);
  const bannerElement = useRef<any>();
  const [parallaxProgres, setParallaxProgress] = useState(0);

  useEffect(() => {
    intersectionObserver.observe(bannerElement.current);
  }, []);

  useEffect(() => {
    if (parallaxBanners.get(bannerElement.current)?.isIntersecting === false)
      return;
    setParallaxProgress(() => calcParallaxProgress(bannerElement.current));
  }, [scrollPosition]);

  return (
    <div
      ref={bannerElement}
      style={{
        height: '100%',
        position: 'relative',
        backgroundColor: 'black',
        // overflow: 'hidden',
      }}
    >
      {/* progress line pointer */}
      <ProgressLinePointer parallaxProgres={parallaxProgres} />
      {/* progress line pointer */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.4,
          width: `100%`,
          height: `${
            bannerElement?.current?.clientHeight +
            (bannerElement?.current?.clientHeight * speed) / 100
          }px`,
          transform: `translateY(${
            (-parallaxProgres * bannerElement?.current?.clientHeight * speed) /
            100
          }px)`,
        }}
      >
        {children}
      </div>
    </div>
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
