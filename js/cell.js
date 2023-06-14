class Cell {
	constructor(gameBoard, x, y) {
		this.x = x;
		this.y = y;
		this.cellElement = document.createElement('div');
		this.cellElement.classList.add('cell');
		gameBoard.append(this.cellElement);
	}
}

export default Cell;
