import {
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useWatchScroll } from '../ReactScrollProvider';
import { ScrollContainerContext } from '../context/ScrollContainerContext';

/**
 * A component to create a parallax effect for a banner based on the scroll position.
 *
 * The `ParallaxBanner` component applies a parallax effect to its children based on the scroll position within a specified scroll container.
 * The component observes its visibility using the `IntersectionObserver` and adjusts its position relative to the scroll position.
 *
 * @param {PropsWithChildren} props - Component properties.
 * @param {string} props.scrollContainerName - The unique name of the scroll container for tracking scroll position.
 * @param {number} props.speed - The speed of the parallax effect. A higher value results in a faster parallax effect.
 * @param {React.ReactNode} props.children - The content to be displayed inside the parallax banner.
 *
 * @returns {JSX.Element} - A div element with a parallax effect applied to its children.
 *
 * @example
 * // Usage of ParallaxBanner component
 * <ParallaxBanner scrollContainerName="mainContainer" speed={30}>
 *   <h1>Welcome to Our Site</h1>
 * </ParallaxBanner>
 */
const ParallaxBanner = ({
  children,
  speed,
}: PropsWithChildren<{ speed: number }>) => {
  const {
    scrollContainerName,
    intersectionObserver,
    parallaxBanners,
    calcParallaxProgress,
  } = useContext(ScrollContainerContext);
  const { scrollPosition } = useWatchScroll(scrollContainerName);
  const bannerElement = useRef<any>();
  const [parallaxProgres, setParallaxProgress] = useState(0);

  /**
   * Observes the visibility of the banner element using the IntersectionObserver.
   * Adds the banner element to the observer when the component mounts, and removes it when the component unmounts.
   * This ensures that the banner's visibility is tracked and its position is updated accordingly.
   */
  useEffect(() => {
    intersectionObserver.observe(bannerElement.current);
    return () => {
      intersectionObserver.unobserve(bannerElement.current);
    };
  }, [intersectionObserver]);

  /**
   * Updates the parallax progress based on the current scroll position.
   * Checks if the banner element is intersecting the viewport and updates its position
   * relative to the scroll position using the provided `calcParallaxProgress` function.
   * This effect runs whenever `scrollPosition`, `parallaxBanners`, or `calcParallaxProgress` changes.
   */
  useEffect(() => {
    if (parallaxBanners.get(bannerElement.current)?.isIntersecting === false)
      return;
    setParallaxProgress(() => calcParallaxProgress(bannerElement.current));
  }, [scrollPosition, parallaxBanners, calcParallaxProgress]);

  return (
    <div
      ref={bannerElement}
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `100%`,
          height: `${
            bannerElement?.current?.clientHeight +
            (bannerElement?.current?.clientHeight * speed) / 100
          }px`,
          transform: `translateY(${
            (-parallaxProgres * bannerElement?.current?.clientHeight * speed) /
            100
          }px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export { ParallaxBanner };
