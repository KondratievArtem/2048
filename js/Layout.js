import Cell from './Cell.js';

const CELL_SIZE = 4;
const GRID_SIZE = CELL_SIZE * CELL_SIZE;

class Grid {
	constructor(layout) {
		let cells = [];
		for (let i = 0; i < GRID_SIZE; i++) {
			cells.push(new Cell(layout));
		}
	}
}

export default Grid;
