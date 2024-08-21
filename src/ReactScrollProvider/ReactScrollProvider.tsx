import { PropsWithChildren, useContext } from 'react';
import { ReactScrollContext } from './ReactScrollContext';

const ReactScrollProvider = ({
  children,
  onTop,
  onEnd,
}: PropsWithChildren<any>) => {
  return (
    <ReactScrollContext.Provider value={undefined}>
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

// const useScroll = () => {
//   const ctx = useContext(ReactScrollContext);
//   return ctx;
// };

export { ReactScrollProvider };
