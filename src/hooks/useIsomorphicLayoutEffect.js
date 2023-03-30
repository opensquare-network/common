// https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect

import { useEffect, useLayoutEffect } from "react";
import { isClient } from "../shared";

export const useIsomorphicLayoutEffect = typeof isClient
  ? useLayoutEffect
  : useEffect;
