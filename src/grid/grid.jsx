import React from "react";
import { Cell } from "./cell";

import "./grid.scss";

export const Grid = ({ cellSize = 20, maxX = 10, maxY = 10 }) => {
    const renderCells = () => {
        const cells = [];

        let x = 0;

        while (x < maxX) {
            cells[x] = [];

            let y = 0;

            while (y < maxY) {
                cells[x].push(<Cell size={cellSize} key={`${x}_${y}`}/>);
                y++;
            }

            x++;
        }

        return cells;
    };

    return (
        <div className="grid" style={{width: cellSize * maxX}}>
            {renderCells()}
        </div>
    );
};