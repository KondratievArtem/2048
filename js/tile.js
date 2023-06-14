class Tile {
	constructor(gameBoard) {
		this.tile = document.createElement('div');
		this.tile.classList.add('tile');
		this.tile.textContent = 2;
		gameBoard.append(this.tile);
	}

	setXY(x, y) {
		this.tile.style.setProperty('--x', x);
		this.tile.style.setProperty('--y', y);
	}
}

export default Tile;
