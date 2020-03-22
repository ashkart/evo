import React, { useEffect, useState, useRef } from "react";
import { Grid } from "./grid/grid";
import { observer } from "mobx-react";

import { World } from "./model/world";

import "./App.scss";

interface IProps {
  world: World
}

const App = observer((props: IProps) => {
  const { world } = props;

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
        <input 
          type="number" 
          value={speed} 
          onChange={e => setSpeed(Number(e.target.value))} 
        />
        <button type="button" onClick={() => {world.simSpeed = speed}}>Setup</button>
      </div>
    </div>
  );
});

export default App;
