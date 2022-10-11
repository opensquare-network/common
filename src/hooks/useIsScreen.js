import { useWindowSize } from "./useWindowSize";
import { MOBILE_SIZE } from "@osn/constants";

export function useIsScreen() {
  const { width } = useWindowSize();

  return {
    isDesktop: width > MOBILE_SIZE,
    isMobile: width <= MOBILE_SIZE,
  };
}
