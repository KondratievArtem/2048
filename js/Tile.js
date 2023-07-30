class Tile {
	constructor(board) {
		this.tileElement = document.createElement('div');
		this.tileElement.classList.add('tile');
		this.setValue(2);
		board.append(this.tileElement);
	}

	setValue(value) {
		this.value = value;
		this.tileElement.textContent = this.value;
		if (this.value < 2048) {
			if (this.tileElement.classList.contains(`tile-${this.value / 2}`)) this.tileElement.classList.remove(`tile-${this.value / 2}`);
			this.tileElement.classList.add(`tile-${this.value}`);
		}
	}

	setAxis(axisX, axisY) {
		this.tileElement.style.setProperty('--x', axisX);
		this.tileElement.style.setProperty('--y', axisY);
	}

	removeForDOM() {
		this.tileElement.remove();
	}

	witeForTransitionEnd() {
		return new Promise((res) => {
			this.tileElement.addEventListener('transitionend', res, { once: true });
		});
	}

	witeForAnimationEnd() {
		return new Promise((res) => {
			this.tileElement.addEventListener('animationend', res, { once: true });
		});
	}
}

export default Tile;
