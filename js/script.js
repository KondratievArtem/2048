import Grid from './Layout.js';
import Tile from './Tile.js';

const board = document.getElementById('grid-board');

const grid = new Grid(board);

grid.cellRandomEmpty().linkTile(new Tile(board));
// grid.cellRandomEmpty().linkTile(new Tile(board));

setupInputArrow();

function setupInputArrow() {
	window.addEventListener('keyup', handleBoard, { once: true });
}

function handleBoard(event) {
	switch (event.key) {
		case 'ArrowUp':
			slideTile(grid.cellGroupedByColumn);
			break;
		case 'ArrowDown':
			slideTile(grid.cellGroupedByReverseColumn);
			break;
		case 'ArrowLeft':
			slideTile(grid.cellGroupedByRow);
			break;
		case 'ArrowRight':
			slideTile(grid.cellGroupedByReverseRow);
			break;

		default:
			return setupInputArrow();
	}

	// const newTile = new Tile(board);
	// grid.cellRandomEmpty().linkTile(newTile);

	setupInputArrow();
}

function slideTile(cellGroup) {
	cellGroup.forEach((group) => slideTileInGroup(group));
}

function slideTileInGroup(group) {
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
			targetCell.linkTile(cellWithTile.linkedTile);
		}
		cellWithTile.unlinkTile();
	}
}
