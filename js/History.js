class History {
	constructor() {
		this.valueScore = [];
		this.valueCells = [];
	}

	setValueScore(value) {
		this.valueScore.push(value);
		if (this.valueScore.length > 2) this.valueScore.shift();

		localStorage.setItem('historyScore', JSON.stringify(this.valueScore));
	}

	setValueCells(value) {
		const cells = value.filter((call) => call.linkedTile);
		let arr = [];
		for (let i = 0; i < cells.length; i++) {
			const obj = {
				x: cells[i].x,
				y: cells[i].y,
				linkedTile: { value: cells[i].linkedTile.value },
			};

			arr.push(obj);
		}
		this.valueCells.push(arr);
		if (this.valueCells.length > 2) this.valueCells.shift();
		this.setLSValueCells();
	}

	setLSValueCells() {
		localStorage.setItem('historyCells', JSON.stringify(this.valueCells));
	}

	getLSValueScore() {
		const value = JSON.parse(localStorage.getItem('historyScore'));
		return value;
	}

	getLSValueCells() {
		const value = JSON.parse(localStorage.getItem('historyCells'));
		return value;
	}
}

export default History;
