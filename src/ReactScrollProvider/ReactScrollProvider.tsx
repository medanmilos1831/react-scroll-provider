import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { ReactScrollContext } from './ReactScrollContext';

const ReactScrollProvider = ({
  children,
  onTop,
  onEnd,
}: PropsWithChildren<any>) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          Object.assign(
            entry.target.style,
            JSON.parse(entry.target.dataset.onenter)
          );
        } else {
          Object.assign(
            entry.target.style,
            JSON.parse(entry.target.dataset.onleave)
          );
        }
      });
    },
    {
      threshold: 0,
    } as any
  );
  return (
    <ReactScrollContext.Provider value={{ observer }}>
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
          }}
          onScroll={(e: any) => {
            if (e.target.scrollTop === 0) {
              onTop();
              return;
            }
            const scrollHeight = e.target.scrollHeight;
            const clientHeight = e.target.clientHeight;

            const isEnd = e.target.scrollTop + clientHeight >= scrollHeight;
            if (isEnd) {
              onEnd();
            }
          }}
        >
          {children}
        </div>
      </div>
    </ReactScrollContext.Provider>
  );
};

const ScrollItemObserver = ({
  children,
  onEnter,
  onLeave,
}: PropsWithChildren<any>) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { observer } = useContext(ReactScrollContext);
  useEffect(() => {
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
  }, []);
  return (
    <div
      data-onenter={JSON.stringify(onEnter)}
      data-onleave={JSON.stringify(onLeave)}
      ref={itemRef}
    >
      {children}
    </div>
  );
};

ReactScrollProvider.ScrollItemObserver = ScrollItemObserver;

export { ReactScrollProvider };
