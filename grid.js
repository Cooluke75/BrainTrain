/**
 grid.js
 description:    Builds the gameboard for BrainTrain game.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

var rows = 9;
var cols = 16;
var grid;
var track; // A 2D array representing the train track. True means the tile is part of the track.
var level = 0;
var difficultyTier = 3;
var numberOfTrains = 2;
var correctAnswers = [];
var usersAnswers = [];

$(document).ready(function(){
	grid = $('#grid');
	buildGrid();
	resizeGrid();

	// resize grid when window is resized
	$(window).resize(resizeGrid);

    // the user has chosen a destination
    $('.destButton').click(function () {
        // get the row of the button
        var row = parseInt($(this).attr('id').replace(/\D/g, ''));

        // get the index of the row in userAnswers
         var answerIndex = usersAnswers.findIndex(function (userAnswer) { return userAnswer == row; });

        // if the row has not already been stored, add it to the array
        if(answerIndex == -1) {
            // make the button 'selected' (i.e. change its color)
            $(this).css('backgroundColor', 'yellow');
            usersAnswers.push(row); // store the button's row in the array of user's answers
        }

        var soundEffect = new Audio();
        soundEffect.src = "Correct.mp3";
        soundEffect.play();


        // when the length of the answers array == number of trains, validate each answer ( with a function)
    });

    placeTheTrain(0);
    placeTheTrain(8);

});

// Adds the tiles to the grid
function buildGrid() {
	// clear the grid
	grid.empty();

	track = CreateArray(rows, cols);
	fillArray(track, rows, cols);
    buildHorizontalTracks(track, difficultyTier);
    randomCrossing(difficultyTier, track);

    // add track or empty tile to grid
	for(i = 0; i < rows; i++) {
		for(j = 0; j < cols; j++) {
            var trackClass = '';
            var buttonClass = '';
            var buttonId = '';
            if (track[i][j]) {
                trackClass = ' track';

                if (j == cols - 1) {
                    buttonClass = ' destButton';
                    buttonId = ' id="button' + i + '"';
                } else {
                    buttonClass = '';
                }
            }
            grid.append('<div class="tile'+ trackClass + buttonClass + '"' + buttonId +'></div>');
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
