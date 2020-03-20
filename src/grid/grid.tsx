import React, { FC, ReactNode } from "react";
import { Cell } from "./cell";

import { Cell as CellData } from "../model/cell";
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
      const cells: ReactNode[][] = [];

      let y = 0;

      while (y < ySize) {
        cells[y] = [];

        let x = 0;

        while (x < xSize) {
          const cellData = cellsData.find(
            c => c.position.x === x && c.position.y === y,
          );

          cells[y].push(
            <Cell size={cellSize} key={`${x}_${y}`} x={x} y={y}>
              {cellData && <GreenCell>{cellData.id}</GreenCell>}
            </Cell>,
          );
          x++;
        }

        y++;
      }

      return cells;
    };

    return (
      <div className="grid" style={{ width: cellSize * xSize }}>
        {renderCells()}
      </div>
    );
  },
);
