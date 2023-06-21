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

		this.cellGroupedByColumn = this.cellGroupByColumn();
		this.cellGroupedByReverseColumn = this.cellGroupedByColumn.map((column) => [...column].reverse());
		this.cellGroupedByRow = this.cellGroupByRow();
		this.cellGroupedByReverseRow = this.cellGroupedByRow.map((row) => [...row].reverse());
	}

	cellRandomEmpty() {
		const cellEmpty = this.cells.filter((cell) => cell.isEmpty());
		const cellIndex = Math.floor(Math.random() * cellEmpty.length);
		return cellEmpty[cellIndex];
	}

	cellGroupByColumn() {
		return this.cells.reduce((elementCell, cell) => {
			elementCell[cell.x] = elementCell[cell.x] || [];
			elementCell[cell.x][cell.y] = cell;
			return elementCell;
		}, []);
	}
	cellGroupByRow() {
		return this.cells.reduce((elementCell, cell) => {
			elementCell[cell.y] = elementCell[cell.y] || [];
			elementCell[cell.y][cell.x] = cell;
			return elementCell;
		}, []);
	}
}

export default Grid;
