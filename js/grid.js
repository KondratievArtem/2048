const CELL_SIZE = 4,
	COUNT_CELL = CELL_SIZE * CELL_SIZE;

export function getGridLayout(gridField) {
	for (let i = 0; i < COUNT_CELL; i++) {
		const cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		gridField.append(cellElement);
	}
}
