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

		const lightness = 100 - Math.log2(value) * 9;

		this.tileElement.style.setProperty('--tile-background-index', `${lightness}%`);
		this.tileElement.style.setProperty('--text-color-index', `${lightness < 50 ? 10 : 50}%`);
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
