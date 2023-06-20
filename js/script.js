import Grid from './Layout.js';
import Tile from './Tile.js';

const board = document.getElementById('grid-board');

const grid = new Grid(board);

const tile = new Tile(board);
const tile2 = new Tile(board);
