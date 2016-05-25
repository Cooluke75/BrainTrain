/**
 Gameplay.js
 description:    Defines the gameplay functionality.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

/**
 * Loads the gameplay session.
 */
function loadGame() {
    skipCounter = 0;
    startingPoints = [];
    correctAnswers = [];
    usersAnswers = [];

    grid = $('#grid');
    buildGrid();
    resizeGrid();
    $('.score').text(totalScore);
    $('.scoreCombo1').text(combo);
    $('.level').text(level);

    // resize grid when window is resized
    $(window).resize(resizeGrid);

    // place the trains at their starting positions
    startingPoints = getStartingPoints(difficultyTier, numberOfTrains);
    for(i = 0; i < startingPoints.length; i++) {
        placeTheTrain(startingPoints[i]);
    }

    // determine the correct destinations
    correctAnswers = getCorrectAnswers(startingPoints);

        processUserInput();

    
}

/**
 * Processes the user's input when they click a destination.
 */
function processUserInput() {
    // the user has chosen a destination
    $('.destButton').click(function (e) {
        
        //make sure the counterDown runs first
        if(counter==0) {
            if (usersAnswers.length < numberOfTrains) {

                // get the row of the button
                var row = parseInt($(this).attr('id').replace(/\D/g, ''));

                // get the index of the row in userAnswers
                var userAnswerIndex = usersAnswers.findIndex(function (userAnswer) {
                    return userAnswer == row;
                });

                // if the row has not already been stored, add it to usersAnswers
                if (userAnswerIndex == -1) {
                    usersAnswers.push(row); // store the button's row in the array of user's answers

                    // get the index of the row in correctAnswers
                    var correctAnswerIndex = correctAnswers.findIndex(function (correctAnswer) {
                        return correctAnswer == row;
                    });

                    // if the row is a correct destination, add to the users score, otherwise subtract
                    if (correctAnswerIndex != -1) {
                        // add 100 points from user's score with combo
                        totalScore += 100 + combo * 10;
                        combo++;
                        soundEffect.src = "bgm/Correct.mp3";
                        $(this).css('backgroundColor', '#00ff00');
                    } else {
                        // deduct 50 points from user's score
                        if (totalScore > 50) {
                            totalScore -= 50;
                            //clears the score combo
                            clearscoreCombo();
                        }
                        else {
                            totalScore = 0;
                            clearscoreCombo()
                        }
                        soundEffect.src = "bgm/Wrong.mp3";
                        $(this).css('backgroundColor', 'red');
                    }

                    // update the score displays
                    $('.score').text(totalScore);

                    // update score combo display
                    $('.scoreCombo1').text(combo);

                    soundEffect.play();
                }

                // the user has used up all of their guesses
                if (usersAnswers.length == numberOfTrains) {
                    // Pause the timer while the train is moving
                    myTime.pause();

                    //achievement2
                    var check2 = checkAchievement2();
                    if(check2==true)
                    {
                        alert("You have unlocked achievement for getting 3000+ points!!!");
                    }

                    moveTheTrain(startingPoints, validateUserAnswers);
                }

                e.stopPropagation();
                skipTrainAnimation();
            }
        }


    });
}

/**
 * Refreshes the game progression.
 */
function clearScore() {
    level = 1;
    difficultyTier = 0;
    numberOfTrains = 1;
    totalScore = 0;
    combo = 0;
    myTime.restart();
}

/**
 * Places the train at the starting location.
 * @param startingPosition
 */
function placeTheTrain(startingPosition){
    var tileTrain = $('.tile:nth-of-type(' + (startingPosition * cols + 1) + ')');
    tileTrain.addClass('tileTrainClass');

    /* easter egg function */
    $(function() {
        $('.modal-title').click(function() {
            tileTrain.css("background-image", "url(images/train.png)");
        });
        $('#kabirCplay').click(function() {
            tileTrain.css("background-image", "url(images/KabirCahill.jpg)");
        });
        $('#kentHplay').click(function() {
            tileTrain.css("background-image", "url(images/KentHuang.jpg)");
        });
        $('#lukeLplay').click(function() {
            tileTrain.css("background-image", "url(images/LukeLee.jpg)");
        });
        $('#ericLplay').click(function() {
            tileTrain.css("background-image", "url(images/EricLin.jpg)");
        });
        $('#rogerZplay').click(function() {
            tileTrain.css("background-image", "url(images/RogerZhang.jpg)");
            var check3 = checkAchievement3();
            if (check3 == true) {
                alert("Congratulations! You have unlocked an achievement!!!");
            }
        });
    });
}

/**
 * Animates the train to move to its final destination.
 * @param trainNum
 * @param callbackFunction
 */
function moveTheTrain(trainNum, callbackFunction) {
    var train = [];
    //move all the trains
    for(i = 0; i < trainNum.length; i++) {
        var condition = "horizontal";
        var nextX = 0;
        var nextY = trainNum[i];
        train[i] = $('.tile:nth-of-type(' + (trainNum[i] * cols + 1) + ')');
        var tileTrain = train[i];
        move();
    }

    //get the train with the longest animation queue
    var longestTrain = train[0];
    for(i = 1; i < train.length; i++) {
        if(longestTrain.queue().length < train[i].queue().length) {
            longestTrain = train[i];
        }
    }

    //put the callbackFunction in the queue
    longestTrain.queue(function() {
        //execute the callback function after the animation
       setTimeout(callbackFunction, 200);
        $(this).dequeue();
    });

    // moves the train one step at a time
    function move() {
        var speed = 100;
        if(condition == "horizontal") {
            //determine it is in the row 0, or row 8 or other
            switch(nextY) {
                case 0:
                    while(track[nextY + 1][nextX] === false && nextX < cols) {
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'}, speed);
                        nextX++;
                    }
                    break;
                case 8:
                    while(track[nextY - 1][nextX] === false && nextX < cols) {
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'}, speed);
                        nextX++;
                    }
                    break;
                default:
                    while(track[nextY + 1][nextX] === false && track[nextY - 1][nextX] === false && nextX < cols) {
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'}, speed);
                        nextX++;
                    }
                    break;
            }

            if(nextY != 8 && track[nextY + 1][nextX] === true) {
                condition = "downVertical";
            }
            if(nextY != 0 && track[nextY - 1][nextX] === true) {
                condition = "upVertical";
            }
            if(nextX != cols ){
                move();
            }
        }

        if(condition == "downVertical") {
            while(nextY != 8 && track[nextY + 1][nextX] == true && nextY < rows) {
                tileTrain.animate({top: '+=' + tileTrain.outerWidth() + 'px'}, speed);
                nextY++;

            }
            tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'}, speed);
            nextX++;
            condition = "horizontal";
            move();
        }

        if(condition == "upVertical") {

            while(nextY != 0 && track[nextY - 1][nextX] == true && nextY > 0) {
                tileTrain.animate({top: '-=' + tileTrain.outerWidth() + 'px'}, speed);
                nextY--;
            }

            tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'}, speed);
            nextX++;
            condition = "horizontal";
            move();
        }
    };
}

/**
 * Returns an array of the random train starting positions.
 * @param difficultyTier
 * @param numberOfTrains
 * @returns An array
 */
function getStartingPoints(difficultyTier, numberOfTrains) {
    var startingPoints;
    switch (difficultyTier) {
        case 0:
            startingPoints =  getFromNumber(numberOfTrains, 2, 6);
            return startingPoints;
        case 1:
            startingPoints = getFromNumber(numberOfTrains, 0, 4, 8);
            return startingPoints;
        case 2:
            startingPoints = getFromNumber(numberOfTrains, 1, 3, 5, 7);
            return startingPoints;
        default:
            startingPoints = getFromNumber(numberOfTrains, 0, 2, 4, 6, 8);
            return startingPoints;
    }
}

/**
 * Generating an array with specified size, contains integers choosen from the numbers that you put in。
 * @param a The first argument is size of the array.
 * @param The rest of the arguments are the integers to be picked
 * @returns An array
 */
function getFromNumber(a, b, c, d, e, f) {
    var range = [];
    for(i = 1; i < arguments.length; i++) {
        range[i - 1] = arguments[i];
    }

    var numberOfExcludedNum = range.length - a;
    for(i = 0; i < numberOfExcludedNum; i++) {
        var randomToExclude = Math.floor(Math.random() * (range.length));
        range.splice(randomToExclude, 1);
    }
    return range;
}

/**
 * Returns the array of correct destinations.
 * @param trainNum The first argument is starting points array.
 * @returns An answer array
 */
function getCorrectAnswers(trainNum) {
    var correctAnswers = [];

    for(i = 0; i < trainNum.length; i++) {
        var condition = "horizontal";
        var nextX = 0;
        var nextY = trainNum[i];
        move();

        // moves the train one step at a time
        function move() {
            if(condition == "horizontal") {
                //determine it is in the row 0, or row 8 or other
                switch(nextY) {
                    case 0:
                        while(track[nextY + 1][nextX] === false && nextX < cols) {
                            nextX++;
                        }
                        break;
                    case 8:
                        while(track[nextY - 1][nextX] === false && nextX < cols) {
                            nextX++;
                        }
                        break;
                    default:
                        while(track[nextY + 1][nextX] === false && track[nextY - 1][nextX] === false && nextX < cols) {
                            nextX++;
                        }
                        break;
                }

                if(nextY != 8 && track[nextY + 1][nextX] === true) {
                    condition = "downVertical";
                }
                if(nextY != 0 && track[nextY - 1][nextX] === true) {
                    condition = "upVertical";
                }
                if(nextX != cols ) {
                    move();
                }
                if(nextX == cols){
                    correctAnswers[i] = nextY;
                }
            }

            if(condition == "downVertical") {
                while(nextY != 8 && track[nextY + 1][nextX] == true && nextY < rows) {
                    nextY++;
                }
                nextX++;
                condition = "horizontal";
                move();
            }

            if(condition == "upVertical") {
                while(nextY !=0 && track[nextY-1][nextX] == true && nextY > 0) {
                    nextY--;
                }
                nextX++;
                condition = "horizontal";
                move();
            }
        };
    }

    return correctAnswers;
}

/**
 * Validates the user's answers and determines if the user has passed the current level.
 */
function validateUserAnswers() {
    usersAnswers.sort();
    correctAnswers.sort();

    if(usersAnswers.isEqual(correctAnswers)) {
        levelComplete = true;
        console.log('Level ' + level + ' passed! Score: ' + totalScore);
    } else {
        levelComplete = false;
        console.log('Level ' + level + ' not passed. Score: ' + totalScore);
    }

    // Direct page to level complete or incomplete, need to click destinations again
    levelProgress(levelComplete);
}


/**
 * Compares two arrays to see if they're equal.
 * They are equal if they both have the same length, values and order of values.
 * @param otherArray
 * @returns {boolean}
 */
Array.prototype.isEqual = function (otherArray) {
    if(this.length != otherArray.length) {
        return false;
    }

    return this.every(function (value, i) {
        return value == otherArray[i];
    });
}

/**
 * Skips the train animation if the user clicks on the gameboard an additional time.
 */
function skipTrainAnimation(){
    $('#grid').click(function(){

        if(usersAnswers.length == numberOfTrains){
            skipCounter ++;
        }

        if (skipCounter == 1 && $('.tileTrainClass').is(":animated")){
            $('.tileTrainClass').finish();
            validateUserAnswers();
        }
    })
}

/**
 * Starts the gameplay timer.
 * @param seconds
 * @param container
 * @param gameOver
 * @returns {{}|*}
 */
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
        timer = setInterval(clock.step, 250);
    };

    clock.pause = function() {
        ms = clock.step();
        clearInterval(timer);
    };

    clock.step = function() {
        var now = Math.max(0, ms - (new Date().getTime() - startTime));
        var m = Math.floor(now / 60000);
        var s = Math.floor(now / 1000) % 60;
        s = (s < 10 ? "0" : "") + s;
        display.innerHTML = m + ":" + s;
        if(now == 0) {
            clearInterval(timer);
            if(gameOver) {
                gameOver();
            }
        }
        return now;
    };

    clock.restart = function(){
        //stop and reset  the timer
        clearInterval(timer);
        ms = seconds * 1000;
        //reset the time shown on the play page
        m = Math.floor(ms / 60000);
        s = Math.floor(ms / 1000) % 60;
        s = (s < 10 ? "0" : "") + s;
        display.innerHTML = m+":" + s;

    };

    clock.resume();
    return clock;
}

/**
 * Resumes the gameplay timer.
 */
function timeResume() {
    myTime.resume();
}

/*
 * Score Combo
 */
function clearscoreCombo() {
    combo = 0;
}

/*
 * Check achievement1
 */
function checkAchievement1() {
    var achievement1 = getStoredName('achievement1');
    if (achievement1=='0') {
        if (level > 20) {
            storeName('achievement1', '1');
            
            achievementNum =  parseInt(localStorage.getItem('unlocked')) + 1;
            storeName('unlocked',achievementNum);
            return true;
        }
        else {
            return false;
        }
    }
}

/*
 * Check achievement2
 */
function checkAchievement2() {
    var achievement2 = getStoredName('achievement2');
    if (achievement2=='0') {
        if (totalScore > 3000) {
            storeName('achievement2', '1');
            achievementNum =  parseInt(localStorage.getItem('unlocked')) + 1;
            storeName('unlocked',achievementNum);
            return true;
        }
        else {
            return false;
        }
    }
}

/*
 * Check achievement3
 */
function checkAchievement3(){
    var achievement3 = getStoredName('achievement3');
    if (achievement3=='0') {
        storeName('achievement3', '1');
        achievementNum =  parseInt(localStorage.getItem('unlocked')) + 1;
        storeName('unlocked',achievementNum);
        return true;
    }
    else {
        return false;
    }
}

function loadPopupBox() {
    counter = 4;
    window.timeID;
    $('#popup_countdown').fadeIn("slow");
    $("#countDown").text("Ready?");

    timeID = setInterval(function() {
        counter--;
        if(counter < 1) {
            clearInterval(timeID);
            $("#countDown").text("GO!!!");
            unloadPopupBox();
            timeResume();
        } else {
            $("#countDown").text(counter.toString());
        }
    }, 1000);

}

function unloadPopupBox() {
    $('#popup_countdown').fadeOut("slow");
}

function hidePopup() {
    $('#popup_countdown').hide();
    clearInterval(timeID);
}