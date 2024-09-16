import {
  ReactScrollProvider,
  useScroll,
  useWatchScroll,
} from 'src/ReactScrollProvider';

const SomeComponentOne = () => {
  const { scrollToAnchor } = useScroll('containerOne');
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'yellow',
          display: 'flex',
          justifyContent: 'space-between',
          opacity: 0.1,
        }}
      >
        <span>Link 1</span>
        <span>Link 2</span>
        <span>Link 3</span>
        <span>Link 4</span>
        <span>Link 5</span>
        <button
          onClick={() => {
            scrollToAnchor('pera2');
          }}
        >
          pera
        </button>
      </div>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <ReactScrollProvider.ScrollContainer
          scrollContainerName="containerOne"
          onEnd={() => {}}
          onTop={() => {}}
          onScroll={(obj) => {}}
        >
          <div
            style={{
              height: '30rem',
              background: 'red',
            }}
          >
            <ReactScrollProvider.ParallaxBanner speed={50}>
              <img
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src="../../assets/skoda.jpg"
              />
            </ReactScrollProvider.ParallaxBanner>
          </div>
          <div
            style={{
              height: '20rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                height: '15rem',
                width: '50%',
              }}
            >
              <ReactScrollProvider.ParallaxBanner speed={50}>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  src="../../assets/skoda.jpg"
                />
              </ReactScrollProvider.ParallaxBanner>
            </div>
          </div>
          <div
            style={{
              height: '20rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                height: '15rem',
                width: '50%',
              }}
            >
              <ReactScrollProvider.ParallaxBanner speed={50}>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  src="../../assets/skoda.jpg"
                />
              </ReactScrollProvider.ParallaxBanner>
            </div>
          </div>
          <div
            style={{
              height: '20rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                height: '15rem',
                width: '50%',
              }}
            >
              <ReactScrollProvider.ParallaxBanner speed={50}>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  src="../../assets/skoda.jpg"
                />
              </ReactScrollProvider.ParallaxBanner>
            </div>
          </div>

          {new Array(5).fill(null).map((i, index) => {
            return (
              <ReactScrollProvider.ScrollAnchor
                scrollContainerName={'containerOne'}
                id={`pera${index}`}
              >
                <div
                  key={index}
                  style={{
                    background: index % 2 === 0 ? 'blue' : 'green',
                    height: '30rem',
                  }}
                >
                  <span>pera {index}</span>
                </div>
              </ReactScrollProvider.ScrollAnchor>
            );
          })}
        </ReactScrollProvider.ScrollContainer>
      </div>
    </div>
  );
};

export { SomeComponentOne };
