// abstrating away the state logic
import { useCallback, useMemo, useState } from 'react';

export default function useExpanded(initalState = false) {
  const [expanded, setExpanded] = useState(initalState);
  const toggle = useCallback(
    () => setExpanded(prevExpanded => !prevExpanded),
    []
  );

  const value = useMemo(() => ({ expanded, toggle }), [expanded, toggle]);

  return value;
}