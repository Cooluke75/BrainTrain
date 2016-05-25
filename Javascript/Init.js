/**
 Init.js
 description:    Initializes the game session.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

$(document).ready(function() {

    initAudio();
    loadGame();
    
    window.myTime = startTimer(60, "timer", function() {gameOver();});
    myTime.pause();

    //hiding everything in the beginning but the menu
    $("#myCarousel").hide();
    $("#leaderboardContainer").hide();
    $("#settingContainer").hide();
    $("#playContainer").hide();
    $("#gameover").hide();

    //everytime refresh initializes this
    storeName('achievement1','0');
    storeName('achievement2','0');
    storeName('achievement3','0');
    storeName('unlocked','0');

});
