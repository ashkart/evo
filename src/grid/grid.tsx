import React, { FC, ReactNode } from "react";
import { Cell } from "./cell";

import { AliveCell as CellData } from "../model/life/cells/aliveCell";
import { GreenCell } from "../cell/greenCell";
import { observer } from "mobx-react";

import "./grid.scss";

interface IProps {
  cellsData: CellData[];
  cellSize: number;
  xSize: number;
  ySize: number;
}

export const Grid: FC<IProps> = observer(
  ({ cellsData = [], cellSize = 20, xSize = 10, ySize = 10 }) => {
    const renderCells = () => {
      const rows: ReactNode[][] = [];

      let y = 0;

      for (let y = 0; y < ySize; y++) {
        rows[y] = [];

        for (let x = 0; x < ySize; x++) {
          const cellData = cellsData.find(
            c => c.position.x === x && c.position.y === y,
          );

          rows[y].push(
            <Cell size={cellSize} key={`${x}_${y}`} x={x} y={y}>
              {cellData && <GreenCell>{cellData.id}</GreenCell>}
            </Cell>,
          );
        }
      }

      return rows;
    };

    return (
      <div className="grid" style={{ width: cellSize * xSize }}>
        {renderCells().map((rowElements: ReactNode[]) => <div className="flex-row">{rowElements}</div>)}
      </div>
    );
  },
);
