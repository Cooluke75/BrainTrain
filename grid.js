/**
 grid.js
 description:    Builds the gameboard for BrainTrain game.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

var rows;
rows = 9;
var cols = 16;
var grid;
//var activeTracks = [][];

$(document).ready(function(){
	grid = $('#grid');
	buildGrid();
	resizeGrid();
	
	// resize grid when window is resized
	$(window).resize(resizeGrid);
	
	var tile1 = $('.tile:first-of-type');
	tile1.css('backgroundColor', '#009933');
	tile1.css('position', 'relative');
	grid.click(function() {
		tile1.animate({left: '+=' + tile1.outerWidth() + 'px'});
	});
});

// Adds the tiles to the grid
function buildGrid() {
	// clear the grid
	grid.empty();
	
	for(i = 0; i < rows; i++) {
		for(j = 0; j < cols; j++) {
			grid.append('<div class="tile">' + '</div>');
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
	grid.width(tileWidth * cols);
	grid.height(tileHeight * rows);
}

// Generates the track
function buildTrack(level) {
	
}
