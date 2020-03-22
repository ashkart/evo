import React, { useEffect, useState, useRef } from "react";
import { Grid } from "./grid/grid";
import { observer } from "mobx-react";

import { World } from "./model/world";

import "./App.scss";
import { Genome } from "./model/life/genome";
import { AliveCell } from "./model/life/cells/aliveCell";
import { Point } from "./model/point";
import { InstinctRegistry } from "./model/life/genome/instincts";
import { getRandomMoveInstinct } from "./model/helpers";


const App = observer(() => {
  const [world, setWorld] = useState<World>(newWorld());

  const pause = () => world.stop();
  const start = () => world.start();

  const restart = () => {
    world.stop();
    const nextW = newWorld();

    setWorld(nextW);
  };

  const [speed, setSpeed] = useState<number>(world.simSpeed);

  useEffect(() => {
    world.start();
  }, [world]);

  return (
    <div className="app">
      <Grid
        cellsData={[...world.cells, ...world.food]}
        cellSize={20}
        xSize={world.xSize}
        ySize={world.ySize}
      />

      <div className="controls">
        <label className="flex-row form-block">
          Speed
          <input 
            type="number" 
            value={speed} 
            onChange={e => setSpeed(Number(e.target.value))} 
          />
          <button type="button" onClick={() => {world.simSpeed = speed}}>Setup</button>
        </label>
        <button type="button" onClick={pause}>Pause</button>
        <button type="button" onClick={start}>Start</button>
        <button type="button" onClick={restart}>Restart</button>
      </div>
    </div>
  );
});

export default App;



const newWorld = () : World => {
  const world = new World();

  const defaultGenome = new Genome(10000, 30, 40);
  const cell = new AliveCell(world, ++World.lastCellId, new Point(4, 5), defaultGenome);

  defaultGenome.instincts.push(InstinctRegistry.split);
  defaultGenome.instincts.push(InstinctRegistry.actForInterest);
  defaultGenome.instincts.push(getRandomMoveInstinct());

  world.cells = [
    cell
  ];

  return world;
};