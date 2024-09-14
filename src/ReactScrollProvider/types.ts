export type setScrollPosition = {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
};

export interface IScrollContainerProps {
  onTop?: () => void;
  onEnd?: () => void;
  onScroll?:
    | ((obj: { scrollPosition: number; scrollContainerName: string }) => void)
    | undefined;
  scrollContainerName: string;
  throttle?: number;
}

export interface IScrollContainer extends IScrollContainerProps {
  container: HTMLDivElement;
  containerBoundingTop: number;
  scrollContainerName: string;
}
