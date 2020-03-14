import React from 'react';
import {Grid} from "./grid/grid";

import './App.scss';

function App() {
  return (
    <div className="app">
      <Grid cellSize={20} maxX={10} maxY={10} />
    </div>
  );
}

export default App;
