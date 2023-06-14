import Cell from './Cell.js';

const GRID_SIZE = 4;
const COUNT_CELL = GRID_SIZE * GRID_SIZE;

class Grid {
	constructor(gameBoard) {
		this.cells = [];

		for (let i = 0; i < COUNT_CELL; i++) {
			const x = i % GRID_SIZE;
			const y = Math.floor(i / GRID_SIZE);

			this.cells.push(new Cell(gameBoard, x, y));
		}
	}
}

export default Grid;
