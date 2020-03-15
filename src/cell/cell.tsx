import React, { FC } from "react";

import "./cell.scss";

interface IProps {
    color: string;
}

export const Cell: FC<IProps> = ({color, children}) => {
    return <div className={`livecell ${color}`}>{children}</div>;
};