class Tile {
	constructor(layout) {
		this.tileElement = document.createElement('div');
		this.tileElement.classList.add('tile');
		layout.append(this.tileElement);
		this.value(2);
	}

	value(value) {
		this.tileElement.textContent = value;
	}
}

export default Tile;
