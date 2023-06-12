export function tile(cellElement) {
	const tile = document.createElement('div');
	tile.classList.add('tile');
	tile.textContent = 2;
	cellElement.append(tile);
}
