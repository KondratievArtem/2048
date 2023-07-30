class BestScore {
	constructor(out) {
		this.bestElement = document.createElement('span');
		this.setValue(0);
		out.append(this.bestElement);
	}

	setValue(value) {
		this.value = value;
		this.bestElement.textContent = this.value;
	}

	getLocalStorage() {
		const getLS = JSON.parse(localStorage.getItem('bestScore'));
		this.value = getLS.value;
		this.bestElement.textContent = this.value;
	}

	setLocalStorage(score) {
		localStorage.setItem('bestScore', JSON.stringify(score));
	}
}

export default BestScore;
