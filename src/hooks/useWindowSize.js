import { useState } from "react";
import { _document, _window } from "../shared";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Reactive window size
 * @param {Object?} options
 * @param {number?} options.initialWidth
 * @param {number?} options.initialHeight
 * @param {boolean?} options.includeScrollbar
 * @returns {{width: number, height: number}}
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
    if (_window) {
      if (includeScrollbar) {
        setWidth(_window.innerWidth);
        setHeight(_window.innerHeight);
      } else {
        setWidth(_window.document.documentElement.clientWidth);
        setHeight(_window.document.documentElement.clientHeight);
      }
    }
  };

  useIsomorphicLayoutEffect(() => {
    update();
    _window.addEventListener("resize", update, { passive: true });
    return () => _window.removeEventListener("resize", update);
  }, []);

  return { width, height };
}
