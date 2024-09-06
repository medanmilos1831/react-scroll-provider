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
import { configConsumerProps } from 'antd/es/config-provider';
import { constrainedMemory } from 'process';

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

class Pera {
  private elementClientHeight: number | null = 0;
  private elementRectBottom: number | null = 0;

  // constructor() {
  //   console.log('PERA CONSTRUCTOR');
  // }

  setElementClientHeight = (clientHeight: number) => {
    this.elementClientHeight = clientHeight;
  };
  setElementRectBottom = (elementRectBottom: number) => {
    this.elementRectBottom = elementRectBottom;
  };
}

const Parallax = ({
  children,
  scrollContainerName,
  speed,
}: PropsWithChildren<{ scrollContainerName: string; speed: number }>) => {
  const { scrollPosition } = useWatchScroll(scrollContainerName);
  const { getElement } = useScroll(scrollContainerName);
  const element = useRef<any>();
  const init = useRef<any>();
  const isInViewPort = useRef<any>();
  const progress = useRef<any>(0);
  const [s, setS] = useState(0);
  const [p, setP] = useState(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInViewPort.current = true;
          } else {
            isInViewPort.current = false;
          }
          setS((prev) => prev + 1);
        });
      },
      {
        root: getElement(),
      }
    )
  );
  useEffect(() => {
    observer.current.observe(element.current);
  }, []);
  useEffect(() => {
    if (isInViewPort.current) {
      const containerHeight = getElement().clientHeight;
      const elementHeight = element.current.clientHeight;
      const wrapper = containerHeight + elementHeight;
      const elementBottomPosition =
        element.current.getBoundingClientRect().bottom;
      let value =
        wrapper -
        (elementBottomPosition - getElement().getClientRects()[0].top);
      let bottomPercet = value / wrapper;
      init.current = Number(bottomPercet.toFixed(3));
      setP(() => Number(bottomPercet.toFixed(3)));
    }
  }, [scrollPosition, s]);
  return (
    <div
      ref={element}
      style={{
        height: '100%',
        position: 'relative',
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: 'green',
          position: 'absolute',
          left: 0,
          top: `${p * 100}%`,
          transform: `translateX(100%)`,
          height: '2px',
          width: '5rem',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.4,
          height: `${element?.current?.clientHeight * 2}px`,
          width: `100%`,
          transform: `translateY(${-p * 50}%)`,
        }}
      >
        {children}
      </div>
      <span
        style={{
          color: 'white',
        }}
      >
        {p}
      </span>
    </div>
  );
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.Parallax = Parallax;
ReactScrollProvider.ScrollContainer = ScrollContainer;

const useScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollPosition: () => {
      return ctx.scroll.scrollContainers[
        scrollContainerName
      ].getScrollPosition();
    },
    getElement: () =>
      ctx.scroll.scrollContainers[scrollContainerName].getScrollContainer(),
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
