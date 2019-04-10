import { useEffect, useRef } from 'react';

export default function useSubsequentEffect(effect, dependencies) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
  }, dependencies);
}
