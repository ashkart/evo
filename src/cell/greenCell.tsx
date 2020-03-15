import React, { memo, FC, useEffect, useRef } from "react";

import "./cell.scss";
import { Cell } from "./cell";

interface IProps {

}

export const GreenCell: FC<IProps> = memo(() => {
    const val = useRef(0);

    useEffect(() => {
        val.current += 1;
    });

    return <Cell color="green"></Cell>;
});