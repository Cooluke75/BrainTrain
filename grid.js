/**
 grid.js
 description:    Builds the gameboard for BrainTrain game.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

var rows = 9;
var cols = 16;
var grid;
var track; // A 2D array representing the train track. True means the tile is part of the track.
var level = 1;
var totalScore = 0;
var levelComplete = false;
var difficultyTier = 0;
var numberOfTrains = 1;
var startingPoints = [];
var correctAnswers = [];
var usersAnswers = [];
var counter = 0;

//The code will be executed after the animation, which is a Function as a parameter that passed to the moveTheTrain function.
function AfterTheAnimation() {
    usersAnswers.sort();
    correctAnswers.sort();

    if(usersAnswers.isEqual(correctAnswers)) {
        levelComplete = true;
        console.log('You win! Score: ' + totalScore);
    } else {
        levelComplete = false;
        console.log('You lose. Score: ' + totalScore);
    }



    // Direct page to level complete or incomplete, need to click destinations again
    levelProgress(levelComplete);
}

//This is the function that will be called when the train is moving and  the user want to skip the animation
function clickTheGridToskipTheAnimation(){


    $('#grid').click(function(){

        if(usersAnswers.length == numberOfTrains){
            counter ++;
        }

        if (counter == 1 && $('.tileTrainClass').is(":animated")){

            $('.tileTrainClass').finish();
            AfterTheAnimation();

        }
    })

}

function gameLoad() {
    counter = 0;
    startingPoints = [];
    correctAnswers = [];
    usersAnswers = [];

    grid = $('#grid');
    buildGrid();
    resizeGrid();
    $('.score').text(totalScore);
    $('.level').text(level);
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

    $('.destButton').click(function (e) {

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

                // update the score displays
                $('.score').text(totalScore);

                soundEffect.play();
            }





            if (usersAnswers.length == numberOfTrains) {
                // move the trains
                // Pause the timer when the train is moving
                myTime.pause();
                moveTheTrain(startingPoints, AfterTheAnimation);


            }

            e.stopPropagation();
            clickTheGridToskipTheAnimation();







        }
    });
}

$(document).ready(function(){

    gameLoad();
    window.myTime = startTimer(60, "timer", function() {gameOver();});
    myTime.pause();

    //hiding everything in the begining but the menu
    $("#myCarousel").hide();
    $("#leaderboardContainer").hide();
    $("#settingContainer").hide();
    $("#playContainer").hide();
    $("#gameover").hide();


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
        //window.location.assign('Successful.html');
        hideshow('#level-screen', '#playContainer');
        level++;
        if (level%5==0) {
            difficultyTier++;
            if (difficultyTier==2){
                numberOfTrains++;
            }
        }


    } else {
        //$('#level-screen-title').text('Level ' + (level + 1) + ': Incomplete');
        //$('#level-screen-buttons:first-child').text('Retry');
        //$('#level-screen').css('display', 'block');
        // window.location.assign('Unsuccessful.html');
        hideshow('#level-screen-fail', '#playContainer');
    }

    //   });
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

//Creates timer
/*function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function time() {
        // Get the number of seconds that have elapsed since
        // StartTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    // Stops from waiting a full second before the timer starts
    time();
    setInterval(time, 1000);
}
*/

//Timer Function
function startTimer(seconds, container, gameOver) {
    var startTime;
    var timer;
    var clock;
    var ms = seconds*1000;

    display = document.getElementById(container);

    clock = {};
    clock.resume = function() {
        startTime = new Date().getTime();
        // The smaller the number the higher accuracy
        timer = setInterval(clock.step,250);
    };
    clock.pause = function() {
        ms = clock.step();
        clearInterval(timer);
    };
    clock.step = function() {
        var now = Math.max(0,ms-(new Date().getTime()-startTime)),
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            if(gameOver) {
                gameOver();
            }
        }
        return now;
    };
    clock.restart = function(){
        ms = seconds*1000;
    };

    clock.resume();
    return clock;
}

//Resumes the timer
function timeResume() {
    myTime.resume();
}

//Game over function
function gameOver(){
    hideshow('#gameover','#playContainer')
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

function clearscore() {
    level=1;
    difficultyTier=0;
    numberOfTrains=1;
    totalScore=0;
    myTime.restart();
}