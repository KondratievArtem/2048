class Score {
	constructor(out) {
		this.scoreElement = document.createElement('span');
		this.setCurrentValue(0);
		this.setValue(0);
		out.append(this.scoreElement);
	}

	setCurrentValue(value) {
		this.value = value;
		this.scoreElement.textContent = this.value;
	}

	setValue(value) {
		this.scoreElement.textContent = this.value += value;
	}

	getLS() {
		const getLS = JSON.parse(localStorage.getItem('score'));
		this.setValue(getLS);
	}

	setLS() {
		localStorage.setItem('score', JSON.stringify(this.value));
	}
}

export default Score;
