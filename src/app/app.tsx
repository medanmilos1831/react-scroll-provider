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
          stagger={0.2}
          threshold={0}
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
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.25s',
                    transitionDelay: '0s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(-100%)',
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
                </ReactScrollProvider.ScrollItemObserver>
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.25s',
                    transitionDelay: '.25s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(-100%)',
                  }}
                >
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
                </ReactScrollProvider.ScrollItemObserver>
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.25s',
                    transitionDelay: '.5s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(-100%)',
                  }}
                >
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
                </ReactScrollProvider.ScrollItemObserver>
              </div>
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

            <section
              style={{
                padding: '50px',
                backgroundColor: '#f4f4f4',
                textAlign: 'center',
              }}
            >
              <h2>Our Portfolio</h2>
              <p>Take a look at some of our recent work.</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.5s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(-100%)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGxhbmRzY2FwZXxlbnwwfHx8fDE2OTA0NzQ3Njg&ixlib=rb-1.2.1&q=80&w=400"
                    alt="Project 1"
                    style={{ borderRadius: '10px' }}
                  />
                </ReactScrollProvider.ScrollItemObserver>
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateY(0%)',
                    transition: '0.5s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateY(100%)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJyaWRnZXxlbnwwfHx8fDE2OTA0NzQ4MTQ&ixlib=rb-1.2.1&q=80&w=400"
                    alt="Project 2"
                    style={{ borderRadius: '10px' }}
                  />
                </ReactScrollProvider.ScrollItemObserver>
                <ReactScrollProvider.ScrollItemObserver
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.5s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(100%)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGxhbmRzY2FwZXxlbnwwfHx8fDE2OTA0NzQ3Njg&ixlib=rb-1.2.1&q=80&w=400"
                    alt="Project 3"
                    style={{ borderRadius: '10px' }}
                  />
                </ReactScrollProvider.ScrollItemObserver>
              </div>
            </section>

            <section
              style={{
                padding: '50px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <h2>Contact Us</h2>
              <p>We would love to hear from you!</p>
              <form
                style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  marginTop: '20px',
                }}
              >
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="email">Email:</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="message">Message:</label>
                  <br />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Send Message
                </button>
              </form>
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
          {/* <div>
            {new Array(50).fill(null).map((i, index: number) => {
              return (
                <ReactScrollProvider.ScrollItemObserver
                  key={index}
                  onEnter={{
                    opacity: '1',
                    transform: 'translateX(0%)',
                    transition: '0.5s',
                  }}
                  onLeave={{
                    opacity: '0',
                    transform: 'translateX(-100%)',
                  }}
                >
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
          </div> */}
          {/* <Row gutter={[24, 24]}>
            {new Array(150).fill(null).map((i, index: number) => {
              return (
                <Col span={8} key={index}>
                  <ReactScrollProvider.ScrollItemObserver
                    onEnter={{
                      opacity: '1',
                      transition: '0.4s',
                    }}
                    onLeave={{
                      opacity: '0',
                    }}
                  >
                    <div
                      style={{
                        background: 'blue',
                        height: '10rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span>milos</span>
                    </div>
                  </ReactScrollProvider.ScrollItemObserver>
                </Col>
                // <ReactScrollProvider.ScrollItemObserver
                //   key={index}
                //   onEnter={{
                //     opacity: '1',
                //     transform: 'translateX(0%)',
                //     transition: '0.5s',
                //   }}
                //   onLeave={{
                //     opacity: '0',
                //     transform: 'translateX(-100%)',
                //   }}
                // >
                //   <div
                //     style={{
                //       background: index % 2 === 0 ? 'blue' : 'green',
                //       width: '100%',
                //       height: '3rem',
                //     }}
                //   ></div>
                // </ReactScrollProvider.ScrollItemObserver>
              );
            })}
          </Row> */}
        </ReactScrollProvider>
      </div>
    </div>
  );
};

export { App };
