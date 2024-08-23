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

const ReactScrollProvider = ({
  children,
  onTop,
  onEnd,
}: PropsWithChildren<{
  onTop?: () => void;
  onEnd?: () => void;
}>) => {
  const element = useRef<HTMLDivElement>(null);
  const scroll = new ScrollService({
    onTop,
    onEnd,
  });
  useLayoutEffect(() => {
    scroll.setElement(element.current!);
  }, []);
  return (
    <ReactScrollContext.Provider value={scroll}>
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
          onScroll={scroll.onScroll}
        >
          {children}
        </div>
      </div>
    </ReactScrollContext.Provider>
  );
};

const useScroll = () => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    setScroll: (scrollTo: ScrollToOptions) => {
      ctx.getElement().scrollTo(scrollTo);
    },
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
  return { scrollPosition };
};

export { ReactScrollProvider, useScroll, useWatchScroll };
