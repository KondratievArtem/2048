import Cell from './Cell.js';

const CELL_SIZE = 4;
const GRID_SIZE = CELL_SIZE * CELL_SIZE;

class Grid {
	constructor(layout) {
		this.cells = [];
		for (let i = 0; i < GRID_SIZE; i++) {
			const x = i % CELL_SIZE;
			const y = Math.floor(i / CELL_SIZE);
			this.cells.push(new Cell(layout, x, y));
		}
	}

	cellRandomEmpty() {
		const cellEmpty = this.cells.filter((cell) => cell.isEmpty());
		const cellIndex = Math.floor(Math.random() * cellEmpty.length);
		return cellEmpty[cellIndex];
	}
}

export default Grid;
