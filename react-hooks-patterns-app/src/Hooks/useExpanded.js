// abstrating away the state logic
import { useCallback, useMemo, useState } from 'react';

// currying - usage as function application
const callFunctionsSequentially = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export default function useExpanded(initalState = false) {
    const [expanded, setExpanded] = useState(initalState);
    const toggle = useCallback(
        () => setExpanded(prevExpanded => !prevExpanded),
        []
    );

    //   const togglerProps = useMemo(() => ({
    //       onClick: toggle,
    //       'aria-expanded': expanded
    //   }), [expanded, toggle])
    const getTogglerProps = useCallback(
        ({ onClick, ...otherCustomProps } = {}) => ({
            'aria-expanded': expanded,
            onClick: callFunctionsSequentially(toggle, onClick),
            ...otherCustomProps,
        }),
        [toggle, expanded]
    );

    const value = useMemo(() => ({ expanded, toggle, getTogglerProps }), [expanded, toggle, getTogglerProps]);

    return value;
}