/**
 * Created by ROGER on 2016-05-09.
 */
var rows = 9;
var cols = 16;

function CreateArray(rows,columns) {
    var array = [];

    for(var i=0;i<rows;i++){
        array[i]=[columns];
    }

    return array;
}

/**
 * Populate the array to all false.
 */
function fillArray(array,rows,cols){
    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++)
            array[i][j] = false;
    }
}

var array_track = CreateArray(rows,cols);
fillArray(array_track,rows,cols);

// Builds the horizontal tracks based on the difficulty tier
function buildHorizontalTracks(array, difficultyTier) {
    switch (difficultyTier) {
        case 0:
            for(var i = 0; i < cols; i++) {
                array[2][i] = true;
                array[6][i] = true;
            }
            break;
        case 1:
            for(var i = 0; i < cols; i++) {
                array[0][i] = true;
                array[4][i] = true;
                array[8][i] = true;
            }
            break;
        case 2:
            for(var i = 0; i < cols; i++) {
                array[1][i] = true;
                array[3][i] = true;
                array[5][i] = true;
                array[7][i] = true;
            }
            break;
        default:
            for(var i = 0; i < cols; i++) {
                array[0][i] = true;
                array[2][i] = true;
                array[4][i] = true;
                array[6][i] = true;
                array[8][i] = true;
            }
    }
}

/**
 * Populate the array for Tier 1.
 */
function Tier1_array(array,cols){
    for(var i=0;i<cols;i++) {
        array[2][i] = true;
        array[6][i] = true;
    }
}

/**
 * Populate the array for Tier 2.
 */
function Tier2_array(array,cols){
    for(var i=0;i<cols;i++) {
        array[0][i] = true;
        array[4][i] = true;
        array[8][i] = true;
    }
}

/**
 * Populate the array for Tier 3.
 */
function Tier3_array(array,cols){
    for(var i=0;i<cols;i++) {
        array[1][i] = true;
        array[3][i] = true;
        array[5][i] = true;
        array[7][i] = true;
    }
}

/**
 * Populate the array for Tier 4.
 */
function Tier4_array(array,cols){
    for(var i=0;i<cols;i++) {
        array[0][i] = true;
        array[2][i] = true;
        array[4][i] = true;
        array[6][i] = true;
        array[8][i] = true;
    }
}

/**
 * Random generated crossing.
 * @param array
 * @returns {number}
 */
function randomCrossing(tier,array){
    if(tier==0){
        var random = Math.floor(Math.random() * 2 + 1);
    } else if(tier==1) {
        var random = Math.floor(Math.random() * 2 + 2);
    } else if(tier==2){
        var random = Math.floor(Math.random() * 2 + 2);
    } else {
        var random = Math.floor(Math.random() * 3 + 2);
    }

    for (var i=0;i<9;i++) {
        if(array[i][0]==true) {
            for (var j = 0; j < random; j++) {
                generateCrossing(array, i);
            }
        }
    }
}

/**
 * Generate vertical
 */
function generateCrossing(array,rowTop){
    var ran = Math.floor(Math.random()*13+1);
    if (array[rowTop + 1][ran - 1] == false && array[rowTop + 1][ran + 1] == false) {
        for (var i = rowTop + 1; array[i][ran] != true; i++) {
            array[i][ran] = true;
        }
    }
}

var level = 1;
/**
 * Tier1
 */
Tier1_array(array_track,cols);
randomCrossing(level,array_track,2,6);
