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

async function runGame(e) {
	switch (e.key) {
		case 'ArrowUp':
			if (!cenMoveUp()) return game();
			await moveUp();
			break;

		case 'ArrowDown':
			if (!cenMoveDown()) return game();
			await moveDown();
			break;

		case 'ArrowLeft':
			if (!cenMoveLeft()) return game();
			await moveLeft();
			break;

		case 'ArrowRight':
			if (!cenMoveRight()) return game();
			await moveRight();
			break;

		default:
			game();
			return;
	}
	const newTile = new Tile(gameBoard);
	grid.getRandomEmptyCell().linkTile(newTile);
	game();

	if (!cenMoveUp() && !cenMoveDown() && !cenMoveLeft() && !cenMoveRight()) {
		await newTile.witeForAnimation();
		alert('game one');
	}
}

async function moveUp() {
	await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown() {
	await slideTiles(grid.cellsGroupedReverseByColumn);
}
async function moveLeft() {
	await slideTiles(grid.cellsGroupedByRow);
}
async function moveRight() {
	await slideTiles(grid.cellsGroupedReverseByRow);
}

async function slideTiles(groupCells) {
	const promises = [];
	groupCells.forEach((group) => slideTilesInGroup(group, promises));

	await Promise.all(promises);

	grid.cells.forEach((cell) => {
		cell.hasTileForMarge() && cell.margeTile();
	});
}

async function slideTilesInGroup(group, promises) {
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

		await promises.push(cellWithTile.linkedTile.witeForTransition());

		if (targetCell.isEmpty()) {
			targetCell.linkTile(cellWithTile.linkedTile);
		} else {
			targetCell.linkTileForMarge(cellWithTile.linkedTile);
		}

		cellWithTile.unlinkTile();
	}
}

function cenMoveUp() {
	return cenMove(grid.cellsGroupedByColumn);
}
function cenMoveDown() {
	return cenMove(grid.cellsGroupedReverseByColumn);
}
function cenMoveLeft() {
	return cenMove(grid.cellsGroupedByRow);
}
function cenMoveRight() {
	return cenMove(grid.cellsGroupedReverseByRow);
}

function cenMove(groupedCell) {
	return groupedCell.some((group) => cenMoveInGroup(group));
}

function cenMoveInGroup(group) {
	return group.some((cell, index) => {
		if (index === 0) return false;
		if (cell.isEmpty()) return false;

		const targetCell = group[index - 1];
		return targetCell.cenAccept(cell.linkedTile);
	});
}
