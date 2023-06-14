class Cell {
	constructor(gameBoard, x, y) {
		this.x = x;
		this.y = y;
		this.cellElement = document.createElement('div');
		this.cellElement.classList.add('cell');
		gameBoard.append(this.cellElement);
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
