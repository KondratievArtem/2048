import Grid from './Layout.js';
import Tile from './Tile.js';

const board = document.getElementById('grid-board');

const grid = new Grid(board);

grid.cellRandomEmpty().linkTile(new Tile(board));
grid.cellRandomEmpty().linkTile(new Tile(board));
