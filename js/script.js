import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('grid-content');

const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
game();

function game() {
	window.addEventListener('keyup', runGame, { once: true });
}

function runGame(e) {
	switch (e.key) {
		case 'ArrowUp':
			moveUp();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
		case 'ArrowRight':
			moveRight();
			break;

		default:
			game();
			return;
	}

	grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
	console.log(grid.cells);
	game();
}

function moveUp() {
	slideTiles(grid.cellsGroupedByColumn);
}

function moveDown() {
	slideTiles(grid.cellsGroupedReverseByColumn);
}
function moveLeft() {
	slideTiles(grid.cellsGroupedByRow);
}
function moveRight() {
	slideTiles(grid.cellsGroupedReverseByRow);
}

function slideTiles(groupCells) {
	groupCells.forEach((group) => slideTilesInGroup(group));

	// grid.cells.forEach((cell) => {
	// 	cell.hasTileForMarge() && cell.margeTile();
	// });
}

function slideTilesInGroup(group) {
	for (let i = 1; i < group.length; i++) {
		if (group[i].isEmpty()) continue;

		const cellWithTile = group[i];

		let targetCell;
		let j = i - 1;
		while (j >= 0 && group[j].cenAccept(cellWithTile.linkedTile)) {
			targetCell = group[j];
			j--;
		}

		if (!targetCell) continue;

		if (targetCell.isEmpty()) {
			targetCell.linkTile(cellWithTile.linkedTile);
		} else {
			targetCell.linkTileForMarge(cellWithTile.linkedTile);
		}

		cellWithTile.unlinkTile();
	}
}
