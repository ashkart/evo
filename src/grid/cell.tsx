import React, { FC, ReactNode } from "react";

import "./cell.scss";
import { observer } from "mobx-react";

interface IProps {
    size: number;
    children: ReactNode;
    x: number;
    y: number;
}

export const Cell: FC<IProps> = observer((props) => {
    const {size, children} = props;
    
    console.log('grid cell rendered');

    return <div className="cell" style={{ width: size, height: size }}>{children}</div>;
});