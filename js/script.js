import Grid from './Layout.js';
import Tile from './Tile.js';

const board = document.getElementById('grid-board');

const grid = new Grid(board);

grid.cellRandomForTile().linkTile(new Tile(board));
grid.cellRandomForTile().linkTile(new Tile(board));

upsetInput();

function upsetInput() {
	window.addEventListener(
		'keyup',
		async (event) => {
			switch (event.key) {
				case 'ArrowUp':
					if (!cenMoveUp()) return upsetInput();
					await slideTile(grid.cellGroupedByColumn);
					break;

				case 'ArrowDown':
					if (!cenMoveDown()) return upsetInput();
					await slideTile(grid.cellGroupedByReverseColumn);
					break;

				case 'ArrowLeft':
					if (!cenMoveLeft()) return upsetInput();
					await slideTile(grid.cellGroupedByRow);
					break;

				case 'ArrowRight':
					if (!cenMoveRight()) return upsetInput();
					await slideTile(grid.cellGroupedByReverseRow);
					break;

				default:
					return upsetInput();
			}
			const newTile = new Tile(board);
			grid.cellRandomForTile().linkTile(newTile);

			if (!cenMoveUp() && !cenMoveDown() && !cenMoveLeft() && !cenMoveRight()) {
				await newTile.witeForAnimationEnd();
				alert('try again');
				window.location.reload();
				return;
			}

			upsetInput();
		},
		{ once: true }
	);
}

async function slideTile(cellGroup) {
	let promises = [];
	cellGroup.forEach((group) => slideTileInGroup(group, promises));

	await Promise.all(promises);

	grid.cells.forEach((cell) => {
		cell.hasTileForMarge() && cell.margeTile();
	});
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
			targetCell.linkTileForMarge(cellWithTile.linkedTile);
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
