import Cell from './Cell.js';

const cellSize = 4;
const tablaSize = cellSize * cellSize;
class Grid {
	constructor(board) {
		this.cells = [];
		for (let i = 0; i < tablaSize; i++) {
			const axisX = Math.floor(i % cellSize);
			const axisY = Math.floor(i / cellSize);

			this.cells.push(new Cell(board, axisX, axisY));
		}

		this.cellGroupedByColumn = this.cellGroupColumn();
		this.cellGroupedByReverseColumn = this.cellGroupedByColumn.map((column) => [...column].reverse());
		this.cellGroupedByRow = this.cellGroupRow();
		this.cellGroupedByReverseRow = this.cellGroupedByRow.map((row) => [...row].reverse());
	}

	cellRandomForTile() {
		const cellElement = this.cells.filter((cell) => cell.isEmpty());
		const cellIndex = Math.floor(Math.random() * cellElement.length);
		return cellElement[cellIndex];
	}

	cellGroupColumn() {
		return this.cells.reduce((cellGroup, cell) => {
			cellGroup[cell.x] = cellGroup[cell.x] || [];
			cellGroup[cell.x][cell.y] = cell;
			return cellGroup;
		}, []);
	}

	cellGroupRow() {
		return this.cells.reduce((cellGroup, cell) => {
			cellGroup[cell.y] = cellGroup[cell.y] || [];
			cellGroup[cell.y][cell.x] = cell;
			return cellGroup;
		}, []);
	}
}
export default Grid;
