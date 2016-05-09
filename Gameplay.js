/**
 * Created by ROGER on 2016-05-09.
 */

function CreateArray(rows,columns) {
    var array = [];

    for(var i=0;i<rows;i++){
        array[i]=[columns];
    }

    return array;
}

var Array2D = CreateArray(9,16);

Array2D [0][0] = false;

/**
 * level 1
 */
function fillArray(Array2D){
    for(var i=0;i<16;i++) {
        Array2D[0][i] = false;
    }
}

function randomCrossing(Array2D){
    var random = Math.floor(Math.random()*15);
    return random;
}

function Walk(Array2D,x,y,row) {
    for(var i=0;i<16;i++) {

        if (Array2D[row][i] == false) {
            x += 1;
        }
        else if (Array2D[row][i] == true) {
            y += 1;
            row +=1;
        }
    }
}
