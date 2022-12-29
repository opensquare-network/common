import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    return {
      width: window?.innerWidth,
      height: window?.innerHeight,
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
