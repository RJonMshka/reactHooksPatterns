// abstrating away the state logic
import { useCallback, useMemo, useRef, useState } from 'react';

// currying - usage as function application
const callFunctionsSequentially = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export default function useExpanded(initalState = false) {
    const [expanded, setExpanded] = useState(initalState);
    const toggle = useCallback(
        () => setExpanded(prevExpanded => !prevExpanded),
        []
    );

    // reset dependency 
    const resetDep = useRef(true);

    const reset = useCallback(() => {
        setExpanded(initalState)
        resetDep.current = !resetDep.current;
    }, [initalState])

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

    const value = useMemo(() => ({ expanded, toggle, getTogglerProps, reset,  resetDep: resetDep.current }), [expanded, toggle, getTogglerProps, reset, resetDep.current]);

    return value;
}