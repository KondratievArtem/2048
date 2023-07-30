class Save {
	constructor() {
		this.value = [];
	}

	saveCells(cells) {
		this.value = cells.filter((cell) => cell.linkedTile);
	}

	setLS() {
		localStorage.setItem('currentCells', JSON.stringify(this.value));
	}

	getLS() {
		const getSavedCells = JSON.parse(localStorage.getItem('currentCells'));
		this.saveCells(getSavedCells);
	}
}

export default Save;
