import { ReactScrollProvider } from 'src/ReactScrollProvider';
import { SomeComponent } from './components/SomeComponent';
import { useLayoutEffect } from 'react';

const App = () => {
  // const throttle = (fn: any, delay: any) => {
  //   // Capture the current time
  //   let time = Date.now();

  //   // Here's our logic
  //   return () => {
  //     if (time + delay - Date.now() <= 0) {
  //       // Run the function we've passed to our throttler,
  //       // and reset the `time` variable (so we can check again).
  //       fn();
  //       time = Date.now();
  //     }
  //   };
  // };

  // useLayoutEffect(() => {
  //   window.addEventListener(
  //     'scroll',
  //     throttle(() => {
  //       console.log('www');
  //     }, 1000)
  //   );
  // }, []);
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //   }}
    // >
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       height: '30rem',
    //     }}
    //   ></div>
    // </div>
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
