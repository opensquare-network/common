import { useEffect, useState } from "react";

/**
 * @param {Object} options
 * @param {number?} options.initialWidth
 * @param {number?} options.initialHeight
 * @param {boolean?} options.includeScrollbar
 */
export function useWindowSize(options) {
  const {
    initialWidth = Infinity,
    initialHeight = Infinity,
    includeScrollbar = true,
  } = options ?? {};

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const update = () => {
    if (window) {
      if (includeScrollbar) {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      } else {
        setWidth(window.document.documentElement.clientWidth);
        setHeight(window.document.documentElement.clientHeight);
      }
    }
  };

  update();

  useEffect(() => {
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    width,
    height,
  };
}
