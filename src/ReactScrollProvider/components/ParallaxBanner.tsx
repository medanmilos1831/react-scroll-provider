import {
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { ProgressLinePointer } from './ProgressLinePointer';
import { useWatchScroll } from '../ReactScrollProvider';
import { ScrollContainerContext } from '../context/ScrollContainerContext';

const ParallaxBanner = ({
  children,
  speed,
}: PropsWithChildren<{ scrollContainerName: string; speed: number }>) => {
  const {
    scrollContainerName,
    intersectionObserver,
    parallaxBanners,
    calcParallaxProgress,
  } = useContext(ScrollContainerContext);
  const { scrollPosition } = useWatchScroll(scrollContainerName);
  const bannerElement = useRef<any>();
  const [parallaxProgres, setParallaxProgress] = useState(0);

  useEffect(() => {
    intersectionObserver.observe(bannerElement.current);
  }, []);

  useEffect(() => {
    if (parallaxBanners.get(bannerElement.current)?.isIntersecting === false)
      return;
    setParallaxProgress(() => calcParallaxProgress(bannerElement.current));
  }, [scrollPosition]);

  return (
    <div
      ref={bannerElement}
      style={{
        height: '100%',
        position: 'relative',
        // backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      {/* progress line pointer */}
      <ProgressLinePointer parallaxProgres={parallaxProgres} />
      {/* progress line pointer */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          // opacity: 0.4,
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
