export function cell(gridField) {
	const cellElement = document.createElement('div');
	cellElement.classList.add('cell');
	gridField.append(cellElement);
}
