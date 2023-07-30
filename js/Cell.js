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

	linkTileForMerge(tile) {
		this.linkedTileForMerge = tile;
		tile.setAxis(this.x, this.y);
	}

	unlinkTileForMerge() {
		this.linkedTileForMerge = null;
	}

	hasTileForMerge() {
		return !!this.linkedTileForMerge;
	}

	cenAccept(newTile) {
		return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile.value === newTile.value);
	}

	mergeTile() {
		this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
		this.linkedTileForMerge.removeForDOM();
		this.unlinkTileForMerge();
	}
}

export default Cell;
