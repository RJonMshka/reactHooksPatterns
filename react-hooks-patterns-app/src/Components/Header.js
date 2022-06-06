import React, { useContext } from "react";
import { ExpandableContext } from "./Expandable";
import "./Header.css";

const Header = ({ children, className = "", ...otherProps }) => {
    const { toggle } = useContext(ExpandableContext);
    const customClasses = ["Expandable-trigger", className].join(" ");

    return <button className={customClasses} onClick={ toggle } {...otherProps}>{ children }</button>
};

export default Header;