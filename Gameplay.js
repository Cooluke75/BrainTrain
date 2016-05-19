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
 * Random generated crossing.
 * @param array
 * @returns {number}
 */
function randomCrossing(tier,array){
    if(tier==0){
        var random = Math.floor(Math.random() * 2 + 1);
        var num = 6;
    } else if(tier==1) {
        var random = Math.floor(Math.random() * 2 + 2);
        var num = 8;
    } else if(tier==2){
        var random = Math.floor(Math.random() * 2 + 2);
        var num =7;
    } else {
        var random = Math.floor(Math.random() * 3 + 1);
        var num=8;
    }

    for (var i=0;i<num;i++) {
        if(array[i][0]==true) {
            var ra = Math.floor(Math.random() * 2 + 2);
            for (var j = 0; j < ra; j++) {
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

    var tileTrain = $('.tile:nth-of-type('+(trainNum*cols + 1)+')');
    tileTrain.addClass('tileTrainClass');

    /* easter egg function */
    $(function() {
        $('.modal-title').click(function() {
            tileTrain.css("background-image", "url(images/train.jpg)");
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
        });
    });
}

function moveTheTrain(trainNum, afterFunction){
    var train = [];
    //move all the trains
    for(i=0; i<trainNum.length;i++){
        var condition = "horizontal";
        var nextX = 0;
        var nextY = trainNum[i];
        train[i] = $('.tile:nth-of-type('+(trainNum[i]*cols + 1)+')');
        var tileTrain = train[i];
        move();
    }

    //get the train with the longest animation queue
    var longestTrain = train[0];
    for(i = 1;i < train.length;i++){
        if(longestTrain.queue().length < train[i].queue().length) {
            longestTrain = train[i];
        }
    }

    //put the afterFunction in the queue
    longestTrain.queue(function(){
        //execute the function after the animation
       setTimeout(afterFunction,200);
        $(this).dequeue();
    })




    function move() {
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
                move();
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

            move();
        }

        if(condition =="upVertical"){

            while(nextY !=0 && track[nextY-1][nextX] == true && nextY > 0) {
                tileTrain.animate({top: '-=' + tileTrain.outerWidth() + 'px'},speed);
                nextY--;
            }

            tileTrain.animate({left: '+=' + tileTrain.outerWidth() + 'px'},speed);
            nextX++;
            condition = "horizontal";
            move();
        }


    };
}


/**
 * Put in the Tier difficulty and how many train you want, it will return an array contains random row numbers.
 * @param TierNum
 * @param howManyTrains
 * @returns An array
 */
function randomTrains(TierNum, howManyTrains) {
    var arr;
    switch (TierNum) {
        case 0:
            arr =  getFromNumebr(howManyTrains,2,6);
            return arr;
        case 1:
            arr = getFromNumebr(howManyTrains,0,4,8);
            return arr;
        case 2:
            arr = getFromNumebr(howManyTrains,1,3,5,7);
            return arr;
        default:
            arr = getFromNumebr(howManyTrains,0,2,4,6,8);
            return arr;
    }
}

/**
 * Generating an array with specified size, contains integers choosen from the numbers that you put in。
 * @param a The first argument is size of the array.
 * @param The rest of the arguments are the integers to be picked
 * @returns An array
 */
function getFromNumebr(a,b,c,d,e,f) {
    var range = [];
    for(i = 1; i < arguments.length; i++) {
        range[i - 1] = arguments[i];
    }

    var numberOfExcludedNum = range.length  - a;
    for(i = 0; i < numberOfExcludedNum; i++) {
        var randomToExclude = Math.floor(Math.random() * (range.length));
        range.splice(randomToExclude, 1);
    }
    return range;
}

/**
 * Return the answer array, if you put in the entry array.
 * @param trainNum The first argument is starting points array.
 * @returns An answer array
 */
function giveTheAnswerArr(trainNum){
    var answerArr = [];

    for(i = 0; i < trainNum.length; i++) {
        var condition = "horizontal";
        var nextX = 0;
        var nextY = trainNum[i];
        move();
        function move() {
            var speed= 100;
            if(condition=="horizontal") {

                //determine it is in the row 0, or row 8 or other
                switch(nextY) {

                    case 0:
                        while(track[nextY+1][nextX] === false && nextX < cols){
                            nextX++;
                        }
                        break;

                    case 8:
                        while(track[nextY-1][nextX] === false && nextX < cols){
                            nextX++;
                        }
                        break;

                    default:
                        while(track[nextY+1][nextX] === false && track[nextY-1][nextX] === false && nextX < cols){
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
                    move();
                }
                if(nextX == cols){
                    answerArr[i] = nextY;
                }


            }

            if(condition =="downVertical"){
                while(nextY != 8 && track[nextY+1][nextX] == true && nextY < rows) {
                    nextY++;

                }
                nextX++;
                condition = "horizontal";

                move();
            }

            if(condition =="upVertical"){

                while(nextY !=0 && track[nextY-1][nextX] == true && nextY > 0) {
                    nextY--;
                }
                nextX++;
                condition = "horizontal";
                move();
            }


        };
    }

    return answerArr;

}

//hide show function for all webpage
function hideshow(idShow,idHide) {
    $(idHide).hide();
    $(idShow).show();
}