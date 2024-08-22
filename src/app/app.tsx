import { ReactScrollProvider } from 'src/ReactScrollProvider';
import { Row, Col } from 'antd';

const App = () => {
  return (
    <div>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          // background: 'red',
        }}
      >
        <ReactScrollProvider
          onTop={() => {
            // console.log('top top topina');
          }}
          onEnd={() => {
            // console.log('end');
          }}
        >
          <>
            <header
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                textAlign: 'center',
                padding: '50px',
              }}
            >
              <h1>Welcome to Our Landing Page</h1>
              <p>Discover amazing things</p>
            </header>

            <section
              style={{
                padding: '50px',
                backgroundColor: '#f4f4f4',
                textAlign: 'center',
              }}
            >
              <h2>About Us</h2>
              <p>
                We are a company dedicated to bringing you the best products and
                services.
              </p>
            </section>

            <section
              style={{
                padding: '50px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <h2>Our Services</h2>
              <p>We offer a wide range of services to meet your needs.</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 1</h3>
                  <p>Details about service 1.</p>
                </div>
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 2</h3>
                  <p>Details about service 2.</p>
                </div>
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 3</h3>
                  <p>Details about service 3.</p>
                </div>
              </div>
            </section>
            <div
              style={{
                height: '10rem',
              }}
            ></div>

            {/* ovo */}
            <section
              style={{
                padding: '50px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <h2>Our Services ITEMS</h2>
              <p>We offer a wide range of services to meet your needs.</p>
              <ReactScrollProvider.WayPoint
                onEnter={[
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                  {
                    opacity: '1',
                    transform: 'translateY(0%)',
                  },
                ]}
                onLeave={[
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                  {
                    opacity: '0',
                    transform: 'translateY(100%)',
                  },
                ]}
                stagger={0.4}
                duration={1}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 1</h3>
                    <p>Details about service 1.</p>
                  </div>
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 2</h3>
                    <p>Details about service 2.</p>
                  </div>
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 3</h3>
                    <p>Details about service 2.</p>
                  </div>
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 1</h3>
                    <p>Details about service 1.</p>
                  </div>
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 2</h3>
                    <p>Details about service 2.</p>
                  </div>
                  <div
                    style={{
                      width: '150px',
                      padding: '20px',
                      backgroundColor: '#e7e7e7',
                    }}
                    className="animate"
                  >
                    <h3>Service 3</h3>
                    <p>Details about service 2.</p>
                  </div>
                </div>
              </ReactScrollProvider.WayPoint>
            </section>

            {/* end :: ovo */}

            <div
              style={{
                height: '50rem',
              }}
            ></div>
            <section
              style={{
                padding: '50px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <h2>Our Services</h2>
              <p>We offer a wide range of services to meet your needs.</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 1</h3>
                  <p>Details about service 1.</p>
                </div>
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 2</h3>
                  <p>Details about service 2.</p>
                </div>
                <div
                  style={{
                    width: '150px',
                    padding: '20px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  <h3>Service 3</h3>
                  <p>Details about service 3.</p>
                </div>
              </div>
            </section>

            <footer
              style={{
                backgroundColor: '#333',
                color: 'white',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
          </>
        </ReactScrollProvider>
      </div>
    </div>
  );
};

export { App };
