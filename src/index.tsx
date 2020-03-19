import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { World } from './model/world';
import { Genome } from './model/genome';
import { Cell } from './model/cell';
import { InstinctRegistry } from './model/genome/instincts';

const defaultGenome = new Genome();
const cell = new Cell(1, 4, 5, defaultGenome);

defaultGenome.instincts.push(InstinctRegistry.leftOne.bind(cell));

const world = new World();
world.cells = [
  cell
];

ReactDOM.render(<App world={world} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
