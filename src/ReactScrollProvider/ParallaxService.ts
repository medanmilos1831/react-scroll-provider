class ParallaxService {
  calcProgress = (
    bannerElement: HTMLDivElement,
    scrollContainer: HTMLDivElement
  ) => {
    const containerHeight = scrollContainer.clientHeight;
    const elementHeight = bannerElement.clientHeight;
    const wrapper = containerHeight + elementHeight;
    const elementBottomPosition = bannerElement.getBoundingClientRect().bottom;
    const value =
      wrapper -
      (elementBottomPosition - scrollContainer.getClientRects()[0].top);
    const progress = value / wrapper;
    return Number(progress.toFixed(3));
  };
}

export { ParallaxService };
