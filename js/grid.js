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
		this.cellsGroupedByColumn = this.groupCellsByColumn();
		this.cellsGroupedReverseByColumn = this.cellsGroupedByColumn.map((column) => [...column].reverse());
		this.cellsGroupedByRow = this.groupCellsByRow();
		this.cellsGroupedReverseByRow = this.cellsGroupedByRow.map((column) => [...column].reverse());
	}

	getRandomEmptyCell() {
		const emptyCell = this.cells.filter((cell) => cell.isEmpty());
		const indexCell = Math.floor(Math.random() * emptyCell.length);
		return emptyCell[indexCell];
	}

	groupCellsByColumn() {
		return this.cells.reduce((groupedColumn, cell) => {
			groupedColumn[cell.x] = groupedColumn[cell.x] || [];
			groupedColumn[cell.x][cell.y] = cell;
			return groupedColumn;
		}, []);
	}

	groupCellsByRow() {
		return this.cells.reduce((groupedColumn, cell) => {
			groupedColumn[cell.y] = groupedColumn[cell.y] || [];
			groupedColumn[cell.y][cell.x] = cell;
			return groupedColumn;
		}, []);
	}
}

export default Grid;
