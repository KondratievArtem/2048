class Cell {
	constructor(layout, x, y) {
		this.x = x;
		this.y = y;
		this.tegElement = document.createElement('div');
		this.tegElement.classList.add('cell');
		layout.append(this.tegElement);
	}

	linkTile(tile) {
		tile.setXY(this.x, this.y);
		this.linkedTile = tile;
	}

	isEmpty() {
		return !this.linkedTile;
	}
}

export default Cell;
