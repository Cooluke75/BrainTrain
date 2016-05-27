/**
 PageNavigation.js
 description:    Controls the screen flow.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

/**
 * Shows and hides HTML elements.
 * @param idShow the id of the element to show
 * @param idHide the id of the element to hide
 */
function showHide(idShow, idHide) {
    $(idHide).hide();
    $(idShow).show();
}

/**
 * Shows the between-level menu screen and progresses to the next level if the user was successful.
 * @param levelComplete
 */
function levelProgress(levelComplete) {
    if (levelComplete) {
        pausePopup('#level-screen');
        level++;
        
        //achievement1
        var check1 = checkAchievement1();
        $("#achievement1").css("display", "none");
        $("#achievement4").css("display", "none");

        if(check1==true)
        {
            $("#achievement1").css("display", "inline-block");
        }
        
        if (level % 5 == 0) {
            difficultyTier++;
            if (difficultyTier == 2){
                numberOfTrains++;
            }
        }
    } else {
        pausePopup('#level-screen-fail');
    }
}

/**
 * Shows the game over screen.
 */
function gameOver(){
    showHide('#gameover','#playContainer')
    var achiTot = getStoredName('unlocked');
    // alert("You have unlocked: " + achiTot + " achievements.");
}

/**
 * Shows popup page, specially for level pausing page.
 * @param idShow the id of the element to show
 */
function pausePopup(idShow) {
    $(idShow).addClass("in");
    $(idShow).show("fast");
}