import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('grid-content');

const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
