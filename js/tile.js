class Tile {
	constructor(gameBoard) {
		this.tile = document.createElement('div');
		this.tile.classList.add('tile');
		this.setValue(2);
		gameBoard.append(this.tile);
	}

	setXY(x, y) {
		this.tile.style.setProperty('--x', x);
		this.tile.style.setProperty('--y', y);
	}

	setValue(value) {
		this.value = value;
		this.tile.textContent = value;
	}

	removeFromDOM() {
		this.tile.remove();
	}
}

export default Tile;
