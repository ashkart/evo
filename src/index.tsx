import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { World } from './model/world';
import { Genome } from './model/genome';
import { Cell } from './model/cell';
import { InstinctRegistry } from './model/genome/instincts';
import { Point } from './model/point';

import './index.css';
import { getRandomMoveInstinct } from './model/helpers';

const defaultGenome = new Genome(10000, 300, 5000);
const cell = new Cell(World.lastCellId++, new Point(4, 5), defaultGenome);
cell.energy = 1500;

defaultGenome.instincts.push(InstinctRegistry.split);
defaultGenome.instincts.push(getRandomMoveInstinct());

const world = new World();
world.cells = [
  cell
];

ReactDOM.render(<App world={world} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
