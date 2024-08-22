import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { ReactScrollContext } from './ReactScrollContext';

const ReactScrollProvider = ({
  children,
  onTop,
  onEnd,
}: PropsWithChildren<{
  onTop?: () => void;
  onEnd?: () => void;
}>) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          let list = entry.target.querySelectorAll('.animate');
          list.forEach((el: any, index: number) => {
            Object.assign(el.style, {
              ...(() => {
                return {
                  ...JSON.parse(entry.target.dataset.onenter)[index],
                  transition: `${
                    Number(entry.target.dataset.duration) / list.length
                  }s`,
                  transitionDelay: `${
                    (Number(entry.target.dataset.stagger) * (index + 1)) /
                    list.length
                  }s`,
                };
              })(),
            });
          });
        } else {
          let list = entry.target.querySelectorAll('.animate');
          list.forEach((el: any, index: number) => {
            Object.assign(el.style, {
              ...(() => {
                return {
                  ...JSON.parse(entry.target.dataset.onleave)[index],
                  transition: '0s',
                  transitionDelay: '0s',
                };
              })(),
            });
          });
        }
      });
    },
    {
      threshold: 0,
    }
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
            scrollBehavior: 'smooth',
          }}
          onScroll={(e: any) => {
            if (e.target.scrollTop === 0) {
              if (onTop) {
                onTop();
              }
              return;
            }
            const scrollHeight = e.target.scrollHeight;
            const clientHeight = e.target.clientHeight;

            const isEnd = e.target.scrollTop + clientHeight >= scrollHeight;
            if (isEnd && onEnd) {
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

const WayPoint = ({
  children,
  onEnter,
  onLeave,
  stagger = 0.4,
  duration = 0.4,
}: PropsWithChildren<{
  onEnter: any;
  onLeave: any;
  stagger?: number;
  duration?: number;
}>) => {
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
      data-duration={duration}
      data-stagger={`${stagger}`}
      ref={itemRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

ReactScrollProvider.ScrollItemObserver = ScrollItemObserver;
ReactScrollProvider.WayPoint = WayPoint;

export { ReactScrollProvider };
