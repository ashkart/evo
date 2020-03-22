import React, { FC, ReactNode } from "react";
import { Cell } from "./cell";

import { AliveCell } from "../model/life/cells/aliveCell";
import { GreenCell } from "../cell/greenCell";
import { observer } from "mobx-react";

import "./grid.scss";
import { CellType, AbstractCell } from "../model/life/cells/cell";
import { GreenPoint } from "../cell/greenPoint";

interface IProps {
  cellsData: AbstractCell[];
  cellSize: number;
  xSize: number;
  ySize: number;
}

export const Grid: FC<IProps> = observer(
  ({ cellsData = [], cellSize = 20, xSize = 10, ySize = 10 }) => {
    const renderCells = () => {
      const rows: ReactNode[][] = [];

      for (let y = 0; y < ySize; y++) {
        rows[y] = [];

        for (let x = 0; x < xSize; x++) {
          const cellData = cellsData.find(
            c => c.position.x === x && c.position.y === y,
          );

          let ContentComponent;

          if (cellData) {
            ContentComponent = contentByType(cellData.type);
          }

          rows[y].push(
            <Cell size={cellSize} key={`${x}_${y}`} x={x} y={y}>
              {cellData && ContentComponent !== undefined && <ContentComponent />}
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

const contentByType = (type: CellType) => {
  switch (type) {
    case 'alive':
      return GreenCell;
    case 'food': 
      return GreenPoint;
  }
};