import React, { FC, useEffect, useRef, ReactNode } from "react";
import { observer } from "mobx-react";
import { Cell } from "./cell";

import "./cell.scss";

interface IProps {
  children?: ReactNode;
}

export const GreenCell: FC<IProps> = observer(props => {
  const val = useRef(0);

  useEffect(() => {
    val.current += 1;
  });

  return <Cell color="green">{props.children && props.children}</Cell>;
});
