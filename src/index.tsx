import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { World } from './model/world';
import { Genome } from './model/life/genome';
import { AliveCell } from './model/life/cells/aliveCell';
import { InstinctRegistry } from './model/life/genome/instincts';
import { Point } from './model/point';

import './index.css';
import { getRandomMoveInstinct } from './model/helpers';

const world = new World();

const defaultGenome = new Genome(10000, 300, 5000);
const cell = new AliveCell(world, World.lastCellId++, new Point(4, 5), defaultGenome);
cell.energy = 1500;

defaultGenome.instincts.push(InstinctRegistry.split);
defaultGenome.instincts.push(getRandomMoveInstinct());

world.cells = [
  cell
];

ReactDOM.render(<App world={world} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
