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
function randomCrossing(level,array,rowTop,rowBot){
    if(level<=5){
        var random = math.floor(Math.random() * 2 + 1);
    } else if(level>5) {
        var random = math.floor(Math.random() * 2 + 2);
    }
    for (var i=0;i<random;i++){
        generateCrossing(array,rowTop,rowBot);
    }
}

/**
 * Generate vertical
 */
function generateCrossing(array,rowTop,rowBot){
    var ran = math.floor(Math.random()*13+1);
    if(array[rowTop+1][ran+1]==false || array[rowTop+1][ran-1]==false) {
        for (var i = rowTop + 1; i < rowBot; i++) {
            array[i][ran] == true;
        }
    }
}

var level = 1;
/**
 * Tier1
 */
Tier1_array(array_track,cols);
randomCrossing(level,array_track,2,6);
