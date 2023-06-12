export class Cell {
	constructor(gridElement, x, y) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		gridElement.append(cell);
		this.x = x;
		this.y = y;
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

	linkTileForMerge(tile) {
		tile.setXY(this.x, this.y);
		this.linkedTileForMarge = tile;
	}

	unlinkTileForMerge() {
		this.linkedTileForMarge = null;
	}

	hasTileForMarge() {
		return !!this.linkedTileForMarge;
	}

	canAccept(newTile) {
		return this.isEmpty() || (!this.hasTileForMarge() && this.linkedTile.value === newTile.value);
	}

	mergeTile() {
		this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMarge.value);
		this.linkedTileForMarge.removeFromDOM();
		this.unlinkTileForMerge();
	}
}
