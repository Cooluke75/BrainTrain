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
        var random = Math.floor(Math.random() * 2 + 1);
    } else if(tier==2){
        var random = Math.floor(Math.random() * 2 + 1);
    } else {
        var random = Math.floor(Math.random() * 2 + 2);
    }

    for (var i=0;i<8;i++) {
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
    var num=1;
    while(num<2) {
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

function placeTheTrain(trainNum){
    var condition = "horizontal";
    var nextX = 0;
    var nextY = trainNum;

    var tileTrain = $('.tile:nth-of-type('+(trainNum*cols + 1)+')');
    tileTrain.css('backgroundColor', '#009933');
    tileTrain.css('position', 'relative');
    grid.click(function moveTheTrain() {
        var speed= 100;
        if(condition=="horizontal") {

            //determine it is in the row 0, or row 8 or other
            switch(nextY) {

                case 0:
                    while(track[nextY+1][nextX] === false && nextX < cols){
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
                        nextX++;
                    }
                    break;

                case 8:
                    while(track[nextY-1][nextX] === false && nextX < cols){
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
                        nextX++;
                    }
                    break;

                default:
                    while(track[nextY+1][nextX] === false && track[nextY-1][nextX] === false && nextX < cols){
                        tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
                        nextX++;
                    }
                    break;

            }
            if(nextY !=8 && track[nextY+1][nextX]===true) {
                condition = "downVertical";

            }
            if(nextY !=0 && track[nextY-1][nextX]===true) {
                condition = "upVertical";

            }
            if(nextX != cols ){
                moveTheTrain();
            }

        }

        if(condition =="downVertical"){
            while(nextY != 8 && track[nextY+1][nextX] == true && nextY < rows) {
                tileTrain.animate({top: '+=' + tileTrain.outerWidth() + 'px'},speed);
                nextY++;

            }
            tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
            nextX++;
            condition = "horizontal";

            moveTheTrain();
        }

        if(condition =="upVertical"){

            while(nextY !=0 && track[nextY-1][nextX] == true && nextY > 0) {
                tileTrain.animate({top: '-=' + tileTrain.outerWidth() + 'px'},speed);
                nextY--;
            }

            tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
            nextX++;
            condition = "horizontal";
            moveTheTrain();
        }


    });
}
