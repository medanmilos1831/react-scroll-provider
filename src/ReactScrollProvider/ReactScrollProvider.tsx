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

const ReactScrollProvider = ({
  children,
  ...rest
}: PropsWithChildren<IReactScrollProvider>) => {
  const element = useRef<HTMLDivElement>(null);

  const scroll = new ScrollService(rest);
  useLayoutEffect(() => {
    scroll.setElement(element.current!);
  }, []);
  return (
    <ReactScrollContext.Provider value={scroll}>
      {children}
    </ReactScrollContext.Provider>
  );
};

const ScrollAnchor = ({
  children,
  id,
  className,
}: PropsWithChildren<{ id: string; className?: string }>) => {
  const el = useRef<HTMLDivElement>(null);
  const ctx = useContext(ReactScrollContext);
  useLayoutEffect(() => {
    ctx?.addAnchor(id, el.current!);
    return () => {
      ctx?.removeAnchor(id);
    };
  });
  return (
    <div ref={el} id={id} className={className}>
      {children}
    </div>
  );
};

const ScrollContainer = ({ children }: PropsWithChildren) => {
  const { setElement, setScrollContainerBoundingTop, onScroll } =
    useContext(ReactScrollContext)!;
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setElement(element.current!);
    setScrollContainerBoundingTop(
      element.current?.getBoundingClientRect().top as number
    );
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
        onScroll={onScroll}
      >
        {children}
      </div>
    </div>
  );
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.ScrollContainer = ScrollContainer;

const useScroll = () => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    setScroll: (scrollTo: ScrollToOptions) => {
      ctx.getElement().scrollTo(scrollTo);
    },
    getScrollPosition: () => ctx.getScrollPosition(),
    getAnchors: (id: string) => ctx.getAnchor(id),
    scrollToAnchor: (anchor: string) => ctx.scrollToAnchor(anchor),
  };
};

const useWatchScroll = () => {
  const ctx = useContext(ReactScrollContext)!;
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let observer = ctx.addObserver({ setScrollPosition });
    return () => {
      observer(setScrollPosition);
    };
  }, []);
  return { scrollPosition, scrollProgress: ctx.getScrollProgress() };
};

export { ReactScrollProvider, useScroll, useWatchScroll };
