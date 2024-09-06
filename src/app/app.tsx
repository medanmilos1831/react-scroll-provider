import { ReactScrollProvider } from 'src/ReactScrollProvider';
import { SomeComponentOne } from './components/SomeComponentOne';
import { SomeComponentTwo } from './components/SomeComponentTwo';

const App = () => {
  return (
    <ReactScrollProvider>
      <div
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '50%',
            }}
          >
            <SomeComponentOne />
          </div>
          <div
            style={{
              width: '50%',
              height: '50rem',
            }}
          >
            <SomeComponentTwo />
          </div>
        </div>
      </div>
    </ReactScrollProvider>
  );
};

export { App };
