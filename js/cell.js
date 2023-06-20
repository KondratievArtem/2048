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

	unlinkTile() {
		this.linkedTile = null;
	}
	isEmpty() {
		return !this.linkedTile;
	}

	linkTileForMarge(tile) {
		tile.setXY(this.x, this.y);
		this.linkedTileForMarge = tile;
	}
	unlinkTileForMarge() {
		this.linkedTileForMarge = null;
	}

	hasTileForMarge() {
		return !!this.linkedTileForMarge;
	}

	cenAccept(newTile) {
		return this.isEmpty() || (!this.hasTileForMarge() && this.linkedTile.value === newTile.value);
	}

	margeTile() {
		this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMarge.value);
		this.linkedTileForMarge.removeFromDOM();
		this.unlinkTileForMarge();
	}
}

export default Cell;
