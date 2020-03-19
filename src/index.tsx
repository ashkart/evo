import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { World } from './model/world';
import { Genome } from './model/genome';
import { Cell } from './model/cell';


const world = new World();
world.cells = [
  new Cell(4, 5, new Genome())
];

ReactDOM.render(<App world={world} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
