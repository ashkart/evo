import React, { FC, ReactNode } from "react";
import { observer } from "mobx-react";
import { Cell } from "./cell";

import "./cell.scss";

interface IProps {
  children?: ReactNode;
}

export const GreenCell: FC<IProps> = observer(props => {
  return <Cell color="green">{props.children && props.children}</Cell>;
});
