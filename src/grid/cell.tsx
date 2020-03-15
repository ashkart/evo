import React, { FC, memo, ReactChildren, ReactNode } from "react";

import "./cell.scss";

interface IProps {
    size: number;
    children: ReactNode;
    x: number;
    y: number;
}

export const Cell: FC<IProps> = memo(({ size, children }) => {
    return <div className="cell" style={{ width: size, height: size }}>{children}</div>;
}, 
(prevProps: IProps, nextProps: IProps) => {
    return prevProps.children === nextProps.children;
});