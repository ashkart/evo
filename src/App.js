import React from 'react';
import './App.scss';
import {Cell} from "./grid/cell";

function App() {
  return (
    <div className="app">
      <Cell size={20}/>
    </div>
  );
}

export default App;
