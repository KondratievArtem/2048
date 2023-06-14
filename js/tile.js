class Tile {
	constructor(gameBoard) {
		this.tile = document.createElement('div');
		this.tile.classList.add('tile');
		this.tile.textContent = 2;
		gameBoard.append(this.tile);
	}
}

export default Tile;
