import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Body from "./Body";
import Header from "./Header";
import Icon from "./Icon";

import './Expandable.css';

export const ExpandableContext = createContext();

const Expandable = ({ children, onExpand, className = '', ...otherProps }) => {
    const [expanded, setExpanded] = useState(false);

    // memoizing toggle callback
    const toggle = useCallback(
        () => setExpanded(preExpanded => !preExpanded),
        []
    );

    const componentJustMounted = useRef(true);

    const combinedClassNames = ['Expandable', className].join('');

    // avoiding calling on first mount
    useEffect(
        () => {
            if(!componentJustMounted.current) {
                onExpand(expanded);
            }
            componentJustMounted.current = false;
        },
        [expanded]
    )
    
    // memoize the value reference
    const value = useMemo(
        () => ({ expanded, toggle }),
        [expanded, toggle]
    );

    return (
        <ExpandableContext.Provider value={ value }>
            <div className={combinedClassNames} {...otherProps}>
                { children }
            </div>
        </ExpandableContext.Provider>
    );
};

Expandable.Header = Header;
Expandable.Body = Body;
Expandable.Icon = Icon;

export default Expandable;