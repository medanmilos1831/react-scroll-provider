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
          entry.target.style.opacity = '1';
          entry.target.style.transition = 'opacity 0.25s ease-in-out';
        } else {
          entry.target.style.opacity = '0';
        }
      });
    },
    {
      threshold: 0.1, // 10% elementa mora biti vidljivo pre nego što se okida
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

const ScrollItemObserver = ({ children }: PropsWithChildren) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { observer } = useContext(ReactScrollContext);
  useEffect(() => {
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
  }, []);
  return (
    <div ref={itemRef} className="animate">
      {children}
    </div>
  );
};

ReactScrollProvider.ScrollItemObserver = ScrollItemObserver;

export { ReactScrollProvider };
