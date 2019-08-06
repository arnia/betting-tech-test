import { useEffect, useRef } from "react";

/*
 * This will skip applying the effect upon the initial render
 */
export default function useDidUpdateEffect(fn, inputs = []) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}
