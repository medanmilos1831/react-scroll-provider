import { PropsWithChildren, useRef, useContext, useLayoutEffect } from 'react';
import { ReactScrollContext } from '../context/ReactScrollContext';

/**
 * Component to define a scroll anchor within a specified scroll container.
 *
 * This component allows you to define an anchor point within a scroll container.
 * The anchor is registered with the scroll container on mount and removed on unmount.
 * It is useful for navigating to specific positions within the scrollable area.
 *
 * @param {PropsWithChildren} props - Component properties.
 * @param {string} props.scrollContainerName - The unique name of the scroll container to register the anchor with.
 * @param {string} props.id - The unique ID for the anchor element.
 * @param {string} [props.className] - Optional CSS class to apply to the anchor element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the anchor element.
 *
 * @returns {JSX.Element} - A div element that represents the scroll anchor.
 *
 * @example
 * // Usage of ScrollAnchor component
 * <ScrollAnchor
 *   scrollContainerName="mainContainer"
 *   id="section1"
 *   className="my-anchor"
 * >
 *   <h2>Section 1</h2>
 * </ScrollAnchor>
 */
const ScrollAnchor = ({
  children,
  scrollContainerName,
  id,
  className,
}: PropsWithChildren<{
  scrollContainerName: string;
  id: string;
  className?: string;
}>) => {
  const el = useRef<HTMLDivElement>(null);
  const ctx = useContext(ReactScrollContext);

  // TODO => change this logic later
  useLayoutEffect(() => {
    if (ctx) {
      // Register the anchor with the scroll container
      ctx.scroll.scrollContainers[scrollContainerName].addAnchor(
        id,
        el.current!
      );
      // Cleanup: Remove the anchor when the component unmounts
      return () => {
        ctx.scroll.scrollContainers[scrollContainerName].removeAnchor(id);
      };
    }
  }, [ctx, scrollContainerName, id]);

  return (
    <div ref={el} id={id} className={className}>
      {children}
    </div>
  );
};

export { ScrollAnchor };
