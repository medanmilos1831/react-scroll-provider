import { PropsWithChildren, useRef, useContext, useLayoutEffect } from 'react';
import { ReactScrollContext } from '../context/ReactScrollContext';

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
  useLayoutEffect(() => {
    ctx?.scroll.scrollContainers[scrollContainerName].addAnchor(
      id,
      el.current!
    );
    return () => {
      ctx?.scroll.scrollContainers[scrollContainerName].removeAnchor(id);
    };
  });
  return (
    <div ref={el} id={id} className={className}>
      {children}
    </div>
  );
};

export { ScrollAnchor };
