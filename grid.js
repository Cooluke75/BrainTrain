/**
 grid.js
 description:    Builds the gameboard for BrainTrain game.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

var rows = 9;
var cols = 16;
var grid;
var track;

$(document).ready(function(){
	grid = $('#grid');
	buildGrid();
	resizeGrid();
	
	// resize grid when window is resized
	$(window).resize(resizeGrid);
});

// Adds the tiles to the grid
function buildGrid() {
	// clear the grid
	grid.empty();

	track = CreateArray(rows, cols);
	fillArray(track, rows, cols);
    buildHorizontalTracks(track, 3);

	// add track or empty tile to grid
	for(i = 0; i < rows; i++) {
		for(j = 0; j < cols; j++) {
			if (track[i][j]) {
				if (j == cols - 1) {
					buttonId = 'id="destButton"'
				} else {
					buttonId = ''
				}
				grid.append('<div class="tile track" '+ buttonId + '>' + track[i][j] + '</div>');

			} else {
				grid.append('<div class="tile">' + track[i][j] + '</div>');
			}
		}
	}
}
	
// Scales the grid to fit the screen
function resizeGrid() {
	// fit grid in window
	grid.width('80%');
	grid.height('80%');
	
	// get grid width and height in px
	var gridWidth = grid.width();
	var gridHeight = grid.height();
	var tileWidth;
	var tileHeight;
	
	// choose tile size that fits both grid width and height
	if((gridWidth / cols) < (gridHeight / rows)) {
		tileWidth = gridWidth / cols;
		tileHeight = tileWidth;
	} else {
		tileHeight = gridHeight / rows;
		tileWidth = tileHeight;
	}

	// set tile width and height
	$('.tile').outerHeight(tileHeight);
	$('.tile').outerWidth(tileWidth);
	
	// adjust grid width and height
	grid.width(tileWidth * cols + 1);
	grid.height(tileHeight * rows + 1);
}

// Generates the track
function buildTrack(level) {
	
}
