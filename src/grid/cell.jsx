import React from "react";

import "./cell.scss";

export const Cell = ({size}) => {
    return <div className="cell" style={{width: size, height: size}}></div>;
};