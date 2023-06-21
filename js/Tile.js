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

	setXY(x, y) {
		this.tileElement.style.setProperty('--x', x);
		this.tileElement.style.setProperty('--y', y);
	}
}

export default Tile;
