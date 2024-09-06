import {
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

import { IReactScrollProvider } from '../types';
import { ReactScrollContext } from '../context/ReactScrollContext';
import { ScrollContainerContext } from '../context/ScrollContainerContext';

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

export { ScrollContainer };
