import React, { useState, useEffect } from 'react';
import {Grid} from "./grid/grid";

import './App.scss';
import { World } from './model/world';
import { Cell } from './model/cell';
import { Genome } from './model/genome';

const initialWorld = new World();
initialWorld.cells = [
  new Cell(4, 5, new Genome())
];

function App() {
  const [world, setWorld] = useState<World>(initialWorld);

  useEffect(() => {
    const updatedWorld: World = {...world};
    updatedWorld.cells.push(new Cell(0, 2, new Genome()))

    setWorld(updatedWorld);
  }, []);

  useEffect(() => {
      setTimeout(() => {
        const updatedWorld: World = {...world};
        updatedWorld.tick();
        setWorld(updatedWorld);
      }, 1000);
  });

  return (
    <div className="app">
      <Grid cellsData={world.cells} cellSize={20} xSize={world.xSize} ySize={world.ySize} />
    </div>
  );
}

export default App;
