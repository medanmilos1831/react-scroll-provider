import { ReactScrollProvider, useScroll } from 'src/ReactScrollProvider';

const SomeComponent = () => {
  const { scrollToAnchor } = useScroll();
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
        <ReactScrollProvider.ScrollContainer>
          {new Array(5).fill(null).map((i, index) => {
            return (
              <ReactScrollProvider.ScrollAnchor id={`pera${index}`}>
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

export { SomeComponent };
