class Cell {
	constructor(board, axisX, axisY) {
		this.x = axisX;
		this.y = axisY;
		this.cellElement = document.createElement('div');
		this.cellElement.classList.add('cell');
		board.append(this.cellElement);
	}

	linkTile(tile) {
		tile.setAxis(this.x, this.y);
		this.linkedTile = tile;
	}

	isEmpty() {
		return !this.linkedTile;
	}

	unlinkTile() {
		this.linkedTile = null;
	}

	linkTileForMarge(tile) {
		this.linkedTileForMarge = tile;
		tile.setAxis(this.x, this.y);
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
		this.linkedTileForMarge.removeForDOM();
		this.unlinkTileForMarge();
	}
}

export default Cell;
