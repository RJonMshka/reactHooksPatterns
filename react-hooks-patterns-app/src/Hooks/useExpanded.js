// abstrating away the state logic
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';

// currying - usage as function application
const callFunctionsSequentially = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

const internalReducer = (state, action) => {
    switch (action.type) {
        case useExpanded.types.toggleExpand:
            return {
                ...state,
                expanded: !state.expanded
            };
        case useExpanded.types.reset:
            return {
                ...state,
                expanded: action.payload
            };
        case useExpanded.types.override:
            return {
                ...state,
                expanded: !state.expanded
            };
        default:
            throw new Error(`Action type ${action.type} not handled`);
    }
}

export default function useExpanded(
    initialExpanded = false,
    userReducer = (s, a) => a.internalChanges
) {
    const initalState = { expanded: initialExpanded }

    const resolveChangesReducer = (currentInternalState, action) => {
        const internalChanges = internalReducer(currentInternalState, action);
        const userChanges = userReducer(currentInternalState, {
            ...action,
            internalChanges
        });
        return userChanges;
    };

    const [{ expanded }, dispatchExpandedAction] = useReducer(
        resolveChangesReducer,
        initalState
    );

    const toggle = useCallback(
        () => dispatchExpandedAction( {type: useExpanded.types.toggleExpand} ),
        []
    );

    const override = useCallback(
        () => dispatchExpandedAction( {type: useExpanded.types.override} ),
        []
    );

    // reset dependency 
    const resetDep = useRef(true);

    const reset = useCallback(() => {
        dispatchExpandedAction( {type: useExpanded.types.reset, payload: initialExpanded} )
        resetDep.current = !resetDep.current;
    }, [initialExpanded])

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

    const value = useMemo(() => ({ 
        expanded,
        toggle, 
        getTogglerProps, 
        reset, 
        resetDep: resetDep.current,
        override
    }),
    [expanded, toggle, getTogglerProps, reset, resetDep.current, override]
    );

    return value;
}


useExpanded.types = {
    toggleExpand: 'EXPAND',
    reset: 'RESET',
    override: 'OVERRIDE'
};