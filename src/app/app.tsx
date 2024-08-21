import { ReactScrollProvider } from 'src/ReactScrollProvider';

const App = () => {
  return (
    <div>
      <div
        style={{
          height: '20rem',
          width: '100%',
          background: 'red',
        }}
      >
        <ReactScrollProvider
          onTop={() => {
            console.log('top top topina');
          }}
          onEnd={() => {
            console.log('end');
          }}
        >
          <div>
            {new Array(50).fill(null).map((i, index: number) => {
              return (
                <ReactScrollProvider.ScrollItemObserver>
                  <div
                    style={{
                      background: index % 2 === 0 ? 'blue' : 'green',
                      width: '100%',
                      height: '3rem',
                    }}
                  ></div>
                </ReactScrollProvider.ScrollItemObserver>
              );
            })}
          </div>
        </ReactScrollProvider>
      </div>
    </div>
  );
};

export { App };
