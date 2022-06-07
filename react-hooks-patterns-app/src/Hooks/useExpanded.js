// abstrating away the state logic
import { useCallback, useMemo, useState } from 'react';

export default function useExpanded(initalState = false) {
  const [expanded, setExpanded] = useState(initalState);
  const toggle = useCallback(
    () => setExpanded(prevExpanded => !prevExpanded),
    []
  );

  const togglerProps = useMemo(() => ({
      onClick: toggle,
      'aria-expanded': expanded
  }), [expanded, toggle])

  const value = useMemo(() => ({ expanded, toggle, togglerProps }), [expanded, toggle, togglerProps]);

  return value;
}