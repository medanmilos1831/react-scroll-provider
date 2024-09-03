import { ReactScrollProvider } from 'src/ReactScrollProvider';
import { SomeComponent } from './components/SomeComponent';

const App = () => {
  return (
    <ReactScrollProvider>
      <div
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <SomeComponent />
      </div>
    </ReactScrollProvider>
  );
};

export { App };
