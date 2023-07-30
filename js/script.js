import Grid from './Grid.js';
import Tile from './Tile.js';
import Score from './Score.js';
import BestScore from './BestScore.js';
import Save from './Save.js';
import History from './History.js';

const board = document.getElementById('grid-board');
const score = document.querySelector('#score');
const best = document.querySelector('#best-score');
const restart = document.querySelector('.restart');
const stepBack = document.querySelector('.step-back');

const grid = new Grid(board);
const scoreClass = new Score(score);
const bestScore = new BestScore(best);
const save = new Save();
const history = new History();

grid.cellRandomForTile().linkTile(new Tile(board));
grid.cellRandomForTile().linkTile(new Tile(board));

if (!localStorage.getItem('currentCells')) {
	save.saveCells(grid.cells);
	save.setLS();
	history.setValueCells(save.value);
}

if (!!localStorage.getItem('bestScore')) bestScore.getLocalStorage();
if (!!localStorage.getItem('score')) scoreClass.getLS();
if (!!localStorage.getItem('currentCells')) {
	save.getLS();
	newGrid(save.value);
}

startGame();

function startGame() {
	window.addEventListener(
		'keyup',
		async (event) => {
			switch (event.key) {
				case 'ArrowUp':
					if (!cenMoveUp()) return startGame();
					await slideTile(grid.cellGroupedByColumn);
					break;

				case 'ArrowDown':
					if (!cenMoveDown()) return startGame();
					await slideTile(grid.cellGroupedByReverseColumn);
					break;

				case 'ArrowLeft':
					if (!cenMoveLeft()) return startGame();
					await slideTile(grid.cellGroupedByRow);
					break;

				case 'ArrowRight':
					if (!cenMoveRight()) return startGame();
					await slideTile(grid.cellGroupedByReverseRow);
					break;

				default:
					startGame();
					return;
			}

			const newTile = new Tile(board);
			grid.cellRandomForTile().linkTile(newTile);

			if (!cenMoveUp() && !cenMoveDown() && !cenMoveLeft() && !cenMoveRight()) {
				await newTile.witeForAnimationEnd();
				alert('try again');
				newGame();
				scoreClass.setCurrentValue(0);
				grid.cellRandomForTile().linkTile(new Tile(board));
				grid.cellRandomForTile().linkTile(new Tile(board));
				startGame();
				return;
			}

			save.saveCells(grid.cells);
			save.setLS();

			history.setValueCells(grid.cells);

			startGame();
		},
		{ once: true }
	);
}

restart.onclick = () => {
	newGame();
	scoreClass.setCurrentValue(0);
	grid.cellRandomForTile().linkTile(new Tile(board));
	grid.cellRandomForTile().linkTile(new Tile(board));
	// window.location.reload();
};

stepBack.onclick = () => {
	backStepScore();
	backStepCells();
};

function backStepScore() {
	scoreClass.value = 0;
	scoreClass.setValue(history.getLSValueScore()[0]);
	scoreClass.setLS();
	history.valueScore = [];
}

function backStepCells() {
	newGrid(history.getLSValueCells()[0]);
	save.saveCells(history.getLSValueCells()[0]);
	save.setLS();
	// history.setValueCells(save.value);
	// history.setLSValueCells();
}

function newGrid(value) {
	for (let i = 0; i < grid.cells.length; i++) {
		if (grid.cells[i].linkedTile) {
			grid.cells[i].linkedTile.removeForDOM();
			grid.cells[i].unlinkTile();
		}

		for (let j = 0; j < value.length; j++) {
			if (grid.cells[i].x === value[j].x && grid.cells[i].y === value[j].y) {
				grid.cells[i].linkTile(new Tile(board));
				grid.cells[i].linkedTile.setValue(value[j].linkedTile.value);
			}
		}
	}
}

function newGame() {
	for (let i = 0; i < grid.cells.length; i++) {
		if (grid.cells[i].linkedTile) {
			grid.cells[i].linkedTile.removeForDOM();
			grid.cells[i].unlinkTile();
		}
	}
}

async function slideTile(cellGroup) {
	let promises = [];
	cellGroup.forEach((group) => slideTileInGroup(group, promises));

	await Promise.all(promises);

	grid.cells.forEach((cell) => {
		if (cell.hasTileForMerge()) {
			let count = cell.linkedTile.value + cell.linkedTileForMerge.value;
			scoreClass.setValue(count);
			cell.mergeTile();
			scoreClass.setLS();
			history.setValueScore(scoreClass.value);
		}
	});

	if (scoreClass.value >= bestScore.value) {
		bestScore.setValue(scoreClass.value);
		bestScore.setLocalStorage(scoreClass);
	}
}

function slideTileInGroup(group, promises) {
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

		promises.push(cellWithTile.linkedTile.witeForTransitionEnd());

		if (targetCell.isEmpty()) {
			targetCell.linkTile(cellWithTile.linkedTile);
		} else {
			targetCell.linkTileForMerge(cellWithTile.linkedTile);
		}
		cellWithTile.unlinkTile();
	}
}

function cenMoveUp() {
	return cenMove(grid.cellGroupedByColumn);
}
function cenMoveDown() {
	return cenMove(grid.cellGroupedByReverseColumn);
}
function cenMoveLeft() {
	return cenMove(grid.cellGroupedByRow);
}
function cenMoveRight() {
	return cenMove(grid.cellGroupedByReverseRow);
}

function cenMove(cellGroup) {
	return cellGroup.some((group) => cenMoveInGroup(group));
}

function cenMoveInGroup(group) {
	return group.some((cell, index) => {
		if (index === 0) return false;
		if (cell.isEmpty()) return false;

		const targetCell = group[index - 1];
		return targetCell.cenAccept(cell.linkedTile);
	});
}
