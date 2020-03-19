import React, { memo, FC, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Cell } from "./cell";

import "./cell.scss";

interface IProps {

}

export const GreenCell: FC<IProps> = observer(() => {
    const val = useRef(0);

    useEffect(() => {
        val.current += 1;
    });

    return <Cell color="green"></Cell>;
});