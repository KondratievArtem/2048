import { getGridLayout } from './grid.js';
import { tile } from './tile.js';

const gridField = document.getElementById('grid-content');

getGridLayout(gridField);

tile(gridField);
tile(gridField);
