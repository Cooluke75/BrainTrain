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