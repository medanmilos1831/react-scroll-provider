export type setScrollPosition = {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
};

export interface IReactScrollProvider {
  onTop?: () => void;
  onEnd?: () => void;
  onScroll?:
    | ((obj: { scrollPosition: number; scrollContainerName: string }) => void)
    | undefined;
  scrollContainerName: string;
  throttle?: number;
}
