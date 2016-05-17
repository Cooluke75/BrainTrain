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
var totalScore = 0;
var levelComplete = false;
var difficultyTier = 2;
var numberOfTrains = 2;
var startingPoints = [];
var correctAnswers = [];
var usersAnswers = [];

// Get global variable
var globalScore = getStoredValue("globalScore");
totalScore += globalScore;

$(document).ready(function(){
	grid = $('#grid');
	buildGrid();
	resizeGrid();
    $('.score').text(totalScore);

    // resize grid when window is resized
	$(window).resize(resizeGrid);

    // place the trains at their starting position
    startingPoints = randomTrains(difficultyTier,numberOfTrains);
    for(i = 0; i < startingPoints.length; i++) {
        placeTheTrain(startingPoints[i]);
    }

    // determine the correct destinations
    correctAnswers = giveTheAnswerArr(startingPoints);

    // the user has chosen a destination
    $('.destButton').click(function () {

        if (usersAnswers.length < numberOfTrains) {

            // get the row of the button
            var row = parseInt($(this).attr('id').replace(/\D/g, ''));

            // get the index of the row in userAnswers
            var userAnswerIndex = usersAnswers.findIndex(function (userAnswer) {
                return userAnswer == row;
            });

            // if the row has not already been stored, add it to the array
            if (userAnswerIndex == -1) {
                usersAnswers.push(row); // store the button's row in the array of user's answers

                var soundEffect = new Audio();

                // get the index of the row in correctAnswers
                var correctAnswerIndex = correctAnswers.findIndex(function (correctAnswer) {
                    return correctAnswer == row;
                });

                // if the row is a correct destination, add to the users score, otherwise subtract
                if (correctAnswerIndex != -1) {
                    // add 100 points from user's score
                    totalScore += 100;
                    soundEffect.src = "bgm/Correct.mp3";
                    $(this).css('backgroundColor', '#00ff00');
                } else {
                    // deduct 50 points from user's score
                    if (totalScore > 50) {
                        totalScore -= 50;
                    }
                    else {
                        totalScore = 0;
                    }
                    soundEffect.src = "bgm/Wrong.mp3";
                    $(this).css('backgroundColor', 'red');
                }

                //Store Global variable
                storeValue('globalScore', totalScore);


                soundEffect.play();
            }



            if (usersAnswers.length == numberOfTrains) {
                // move the trains
                    moveTheTrain(startingPoints, AfterTheAnimation);
            }

            //The code will be executed after the animation, which is a Function as a parameter that passed to the moveTheTrain function.
            function AfterTheAnimation() {
                usersAnswers.sort();
                correctAnswers.sort();

                if(usersAnswers.isEqual(correctAnswers)) {
                    levelComplete = true;
                    console.log('You win! Score: ' + totalScore);
                } else {
                    console.log('You lose. Score: ' + totalScore);
                }

                // update the score displays
                $('.score').text(totalScore);

                // Direct page to level complete or incomplete, need to click destinations again
                levelProgress(levelComplete);
            }
        }
    });
});

// An array method that compares if two arrays are equal (same length, values and order)
Array.prototype.isEqual = function (otherArray) {
    if(this.length != otherArray.length) {
        return false;
    }

    return this.every(function (value, i) {
        return value == otherArray[i];
    });
}

// Direct page to level complete or incomplete, need to click destinations again
function levelProgress(levelComplete) {
   // $('.destButton').click(function() {

        if (levelComplete) {
            //$('#level-screen-title').text('Level ' + (level + 1) + ': Complete!');
            //$('#level-screen-buttons:first-child').text('Next Level');
            //$('#level-screen').css('display', 'block');
            window.location.assign('Successful.html');
        } else {
            //$('#level-screen-title').text('Level ' + (level + 1) + ': Incomplete');
            //$('#level-screen-buttons:first-child').text('Retry');
            //$('#level-screen').css('display', 'block');
            window.location.assign('Unsuccessful.html');
        }

 //   });
}

// clears the score when user click menu
function clearScore() {
        storeValue('globalScore', 0);
        location.href='Menu.html';
}

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
            var vertTrackClass = '';
            var buttonClass = '';
            var buttonId = '';

            if (track[i][j]) {
                trackClass = ' track';

                // the tile is a vertical track
                if (track[i][j + 1] == false) {
                    vertTrackClass = ' vert-track';
                } else {
                    vertTrackClass = '';
                }

                // the tile is a button to choose a train's destination
                if (j == cols - 1) {
                    buttonClass = ' destButton';
                    buttonId = ' id="button' + i + '"';
                } else {
                    buttonClass = '';
                }
            }
            grid.append('<div class="tile'+ trackClass + vertTrackClass + buttonClass + '"' + buttonId +'></div>');
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

// Cookie to store score points
function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

function getStoredValue(key) {
    if (localStorage) {
        return parseInt(localStorage.getItem(key));
    } else {
        return $.cookies.get(key);
    }
}