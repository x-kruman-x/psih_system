import debounce from "lodash.debounce";
import { useState, useEffect, RefObject } from "react";

export function useScrollLinkContainer(ref: RefObject<HTMLDivElement>) {
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);

  const checkForScrollPosition = () => {
    const current = ref.current; // Берём из параметра
    if (current) {
      const { scrollTop, scrollHeight, clientHeight } = current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight);
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance: number) =>
    ref.current?.scrollBy({ top: distance, behavior: "smooth" });

  useEffect(() => {
    const current = ref.current;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);
  
    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  return {
    canScrollUp: canScrollUp,
    canScrollDown: canScrollDown,
    scrollContainerBy: scrollContainerBy,
  };
}
