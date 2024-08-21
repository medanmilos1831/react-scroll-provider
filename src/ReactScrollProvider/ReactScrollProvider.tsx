import { PropsWithChildren, useContext } from 'react';
import { ReactScrollContext } from './ReactScrollContext';

const ReactScrollProvider = ({
  children,
  onTop,
  onEnd,
}: PropsWithChildren<any>) => {
  let options = {
    root: document.querySelectorAll('.animate'),
    rootMargin: '0px',
    threshold: 1.0,
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Element is in view:', entry.target);
          // Ovde možeš da dodaš klasu ili stajl za animaciju
          entry.target.classList.add('in-view');
        } else {
          console.log('Element is out of view:', entry.target);
          // Ako želiš da ukloniš klasu kada je van pogleda
          entry.target.classList.remove('in-view');
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
  const { observer } = useContext(ReactScrollContext);
  return <div className="animate">{children}</div>;
};

ReactScrollProvider.ScrollItemObserver = ScrollItemObserver;

export { ReactScrollProvider };
