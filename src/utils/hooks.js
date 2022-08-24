import { useEffect, useState, useRef } from "react";
import { MOBILE_SIZE } from "@osn/constants";

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // https://github.com/jaredLunde/react-hook/blob/60a6913d1920cee9f99c94f572a88d481fcd39ed/packages/window-size/src/index.tsx#L14-L18
  function getWindowSize() {
    const el = document?.documentElement;

    if (!el) {
      return {
        width: undefined,
        height: undefined,
      };
    }

    return {
      width: el.clientWidth,
      height: el.clientHeight,
    };
  }

  function handleResize() {
    setWindowSize(getWindowSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

export function useIsScreen() {
  const { width } = useWindowSize();

  return {
    isDesktop: width > MOBILE_SIZE,
    isMobile: width <= MOBILE_SIZE,
  };
}
