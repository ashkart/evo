import React, { FC, ReactNode, useMemo } from "react";
import { Cell } from "./cell";

import {Cell as CellData} from "../model/cell";

import "./grid.scss";
import { GreenCell } from "../cell/greenCell";

interface IProps {
    cellsData: CellData[];
    cellSize: number; 
    xSize: number;
    ySize: number;
}

export const Grid: FC<IProps> = ({ cellsData = [], cellSize = 20, xSize = 10, ySize = 10 }) => {
    // const renderCellsMemoized = useMemo(
    //     () => renderCells(cellsData, cellSize, xSize, ySize), 
    //     [cellsData, cellSize, xSize, ySize]
    // );

    const renderCells = () => {
        const cells: ReactNode[][] = [];
    
        let y = 0;
    
        while (y < ySize) {
            cells[y] = [];
    
            let x = 0;
    
            while (x < xSize) {
                const cellData = cellsData.find(c => c.x === x && c.y === y);

                cells[y].push(
                    <Cell size={cellSize} key={`${x}_${y}`} x={x} y={y}>
                        {
                            cellData && 
                            <GreenCell/>
                        }
                    </Cell>
                );
                x++;
            }
    
            y++;
        }
    
        return cells;
    };

    console.log('grid rendered');

    return (
        <div className="grid" style={{width: cellSize * xSize}}>
            {renderCells()}
        </div>
    );
};

/*
const renderCells = (cellsData: CellData[], cellSize: number, xSize: number, ySize: number) => {
    const cells: ReactNode[][] = [];

    let x = 0;

    while (x < xSize) {
        cells[x] = [];

        let y = 0;

        while (y < ySize) {
            const cellData = cellsData.find(c => c.x === x && c.y === y);

            cells[x].push(
                <Cell size={cellSize} key={`${x}_${y}`}>
                    {
                        cellData && 
                        <GreenCell/>
                    }
                </Cell>
            );
            y++;
        }

        x++;
    }

    return cells;
};
*/