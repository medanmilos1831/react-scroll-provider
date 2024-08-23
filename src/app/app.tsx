import {
  ReactScrollProvider,
  useScroll,
  useWatchScroll,
} from 'src/ReactScrollProvider';

const SomeElement = () => {
  const { setScroll } = useScroll();
  return (
    <button
      onClick={() =>
        setScroll({
          top: 150,
          behavior: 'smooth',
        })
      }
    >
      SomeElement
    </button>
  );
};

const App = () => {
  return (
    <div>
      <div
        style={{
          height: '20vh',
          width: '100vw',
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
          <>
            <SomeElement />
            {new Array(10).fill(null).map((i, index) => {
              return (
                <div
                  style={{
                    height: '3rem',
                    width: '100%',
                    background: index % 2 === 0 ? 'red' : 'blue',
                  }}
                >
                  <>{index === 7 ? <SomeElement /> : 'nema'}</>
                </div>
              );
            })}
          </>
        </ReactScrollProvider>
      </div>
    </div>
  );
};

export { App };
