import React, { useEffect } from "react";
import { Grid } from "./grid/grid";
import { observer } from "mobx-react";

import { World } from "./model/world";
import { Cell } from "./model/cell";
import { Genome } from "./model/genome";

import "./App.scss";

interface IProps {
  world: World
}

const App = observer((props: IProps) => {
  const {world} = props;

  useEffect(() => {
    world.start();
  }, []);

  return (
    <div className="app">
      <Grid
        cellsData={world.cells}
        cellSize={20}
        xSize={world.xSize}
        ySize={world.ySize}
      />
    </div>
  );
});

export default App;