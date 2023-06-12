import { cell } from './cell.js';

const GRID_SIZE = 4,
	COUNT_CELL = GRID_SIZE * GRID_SIZE;

export function grid(gridField) {
	let cells = [];
	for (let i = 0; i < COUNT_CELL; i++) {
		cells.push(cell(gridField));
	}
}
