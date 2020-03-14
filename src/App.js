import React from 'react';
import './App.scss';
import {Grid} from "./grid/grid";

function App() {
  return (
    <div className="app">
      <Grid cellSize={20} />
    </div>
  );
}

export default App;
