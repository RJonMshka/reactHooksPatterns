import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import Body from "./Body";
import Header from "./Header";
import Icon from "./Icon";
import { useIsMount } from "../Hooks/useMount";

import './Expandable.css';

export const ExpandableContext = createContext();

const Expandable = ({ children, onExpand, className = '', shouldExpand, ...otherProps }) => {
    const isControlled = shouldExpand !== undefined;

    const [expanded, setExpanded] = useState(false);

    // memoizing toggle callback
    const toggle = useCallback(
        () => setExpanded(preExpanded => !preExpanded),
        []
    );

    const getToggle = isControlled ? onExpand : toggle;

    const getState = isControlled ? shouldExpand : expanded;

    const isMount = useIsMount();

    const combinedClassNames = ['Expandable', className].join('');

    // avoiding calling on first mount
    useEffect(
        () => {
            if (!isMount && !isControlled) {
                onExpand(expanded);
            }
        },
        [expanded, onExpand, isControlled]
    )

    // memoize the value reference
    const value = useMemo(
        () => ({ expanded: getState, toggle: getToggle }),
        [getState, getToggle]
    );

    return (
        <ExpandableContext.Provider value={value}>
            <div className={combinedClassNames} {...otherProps}>
                {children}
            </div>
        </ExpandableContext.Provider>
    );
};

Expandable.Header = Header;
Expandable.Body = Body;
Expandable.Icon = Icon;

export default Expandable;