export function tile(cellElement, x, y) {
	const tile = document.createElement('div');
	tile.classList.add('tile');
	tile.textContent = 2;
	tile.style.setProperty('--x', x);
	tile.style.setProperty('--y', y);
	cellElement.append(tile);
}
