/**
 Grid.js
 description:    Builds the gameboard for BrainTrain game.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

/**
 * Adds the tiles to the gameboard grid.
 */
function buildGrid() {
    // clear the grid
    grid.empty();

    track = createArray(rows, cols);
    fillArray(track, rows, cols);
    buildHorizontalTracks(track, difficultyTier);
    buildVerticalTracks(track, difficultyTier);

    // add a track or an empty tile to the grid
    for(i = 0; i < rows; i++) {
        for(j = 0; j < cols; j++) {
            var trackClass = '';
            var vertTrackClass = '';
            var crossTrackClass = '';
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

                //the tile is at an intersection
                if (i < rows - 1 && track[i + 1][j] && track[i][j + 1]) {
                    trackClass = '';
                    crossTrackClass = ' cross-track-top';
                } else if (i > 0 && track[i - 1][j] && track[i][j + 1]) {
                    trackClass = '';
                    crossTrackClass = ' cross-track-bot';
                } else {
                    crossTrackClass = '';
                }

                // the tile is a button to choose a train's destination
                if (j == cols - 1) {
                    buttonClass = ' destButton';
                    buttonId = ' id="button' + i + '"';
                } else {
                    buttonClass = '';
                }
            }
            grid.append('<div class="tile'+ trackClass + vertTrackClass + buttonClass + crossTrackClass + '"' + buttonId +'></div>');
        }
    }
    //put the bigger buttons on top of the destination buttons
    for(i = 0; i < rows; i++) {
        if(track[i][0]){
            $('#button' + i).append('<button type="button" id="topButton' + i + '"class="destClick"></button>');
        }
    }
      
    
}

/**
 * Scales the grid to fit the screen.
 */
function resizeGrid() {
    // fit the grid in the window
    grid.width('80%');
    grid.height('80%');

    // get the grid's width and height in px
    var gridWidth = grid.width();
    var gridHeight = grid.height();
    var tileWidth;
    var tileHeight;

    // choose the tile size that fits both the grid's width and height
    if((gridWidth / cols) < (gridHeight / rows)) {
        tileWidth = gridWidth / cols;
        tileHeight = tileWidth;
    } else {
        tileHeight = gridHeight / rows;
        tileWidth = tileHeight;
    }

    // set the tile width and height
    $('.tile').outerHeight(tileHeight);
    $('.tile').outerWidth(tileWidth);

    // adjust the grid's width and height
    grid.width(tileWidth * cols + 1);
    grid.height(tileHeight * rows + 1);

    //make the buttons bigger
    var buttonFactor = 1.5;
    //set the width and height of the buttons
    $('.destClick').outerWidth(tileWidth * buttonFactor);
    $('.destClick').outerHeight(tileWidth * buttonFactor);

    //position the buttons
    $('.destClick').css({top:tileWidth*((1-buttonFactor)/buttonFactor)});
    
    
    
}

/**
 * Creates and returns a two-dimensional array.
 * @param rows
 * @param columns
 * @returns {Array}
 * @constructor
 */
function createArray(rows, columns) {
    var array = [];

    for(var i = 0; i < rows; i++) {
        array[i] = [columns];
    }

    return array;
}

/**
 * Populate the two-dimensional array to all false.
 */
function fillArray(array, rows, cols) {
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            array[i][j] = false;
        }
    }
}

/**
 * Builds the horizontal tracks based on the difficulty tier.
 * @param track
 * @param difficultyTier
 */
function buildHorizontalTracks(track, difficultyTier) {
    switch (difficultyTier) {
        case 0:
            for(var i = 0; i < cols; i++) {
                track[2][i] = true;
                track[6][i] = true;
            }
            break;
        case 1:
            for(var i = 0; i < cols; i++) {
                track[0][i] = true;
                track[4][i] = true;
                track[8][i] = true;
            }
            break;
        case 2:
            for(var i = 0; i < cols; i++) {
                track[1][i] = true;
                track[3][i] = true;
                track[5][i] = true;
                track[7][i] = true;
            }
            break;
        default:
            for(var i = 0; i < cols; i++) {
                track[0][i] = true;
                track[2][i] = true;
                track[4][i] = true;
                track[6][i] = true;
                track[8][i] = true;
            }
    }
}

/**
 * Builds the random vertical tracks based on the difficulty tier.
 * @param array
 * @param difficultyTier
 */
function buildVerticalTracks(array, difficultyTier) {
    if(difficultyTier == 0) {
        var random = Math.floor(Math.random() * 2 + 1);
        var num = 6;
    } else if(difficultyTier == 1) {
        var random = Math.floor(Math.random() * 2 + 2);
        var num = 8;
    } else if(difficultyTier == 2) {
        var random = Math.floor(Math.random() * 2 + 2);
        var num = 7;
    } else {
        var random = Math.floor(Math.random() * 3 + 1);
        var num = 8;
    }

    for (var i = 0; i < num; i++) {
        if(array[i][0] == true) {
            var ra = Math.floor(Math.random() * 2 + 2);
            for (var j = 0; j < ra; j++) {
                generateVerticalTracks(array, i);
            }
        }
    }
}

/**
 * Generates random vertical tracks for each horizontal track.
 * @param array
 * @param rowTop
 */
function generateVerticalTracks(array, rowTop){
    var num = 1;
    while(num < 2) {
        var ran = Math.floor(Math.random() * 13 + 1);
        if (rowTop == 0 || array[rowTop - 1][ran] == false) {
            if (array[rowTop + 1][ran - 1] == false && array[rowTop + 1][ran + 1] == false) {
                for (var i = rowTop + 1; array[i][ran] != true; i++) {
                    array[i][ran] = true;
                    num++;
                }
            }
        }
    }
}
