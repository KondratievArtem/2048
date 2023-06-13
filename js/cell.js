import { tile } from './tile.js';

export function cell(gridField, x, y) {
	return () => {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		gridField.append(cellElement);
		tile(x, y);
		return gridField;
	};
}
