import { useEffect, useState } from "react";

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
