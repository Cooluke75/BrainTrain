/**
 GameOver.js
 description:    Functions that save the user's score to the leaderboard.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

/**
 * Saves the user's score to the leaderboard.
 */
function saveScore() {
    //if user name is provided already.
    if(localStorage.userNameTS) {
        //send record to database
        sendScoreToDatabase();
        
        //direct the user to leader boarder
        showHide('#leaderboardContainer','#gameover');
        clearScore();
        loadGame();

        //refresh the leaderBoard
        setTimeout(function(){getUsersTopScores(10);
            getGlobalLeaderboard(10); },2000);

    } else {
        //if not, prompt for user name
        $('#saveNamePopup').modal("show");
    }
}

/**
 * Prompts a new user to enter their username and saves their score.
 */
function saveNewUserScore() {
    //check if it is an empty name
    if($("#gameoverUserName").val().trim() == ""){
        alert("Enter a valid name.");
    } else {
        //if user name is entered
        //use the function from settingPageSavingNameFunction to save it as a local variable.
        storeName("userNameTS", $("#gameoverUserName").val());
        
        //hide the popup
        $("#saveNamePopup").modal("hide");
        
        //send record to database and direct the user to leader boarder
        sendScoreToDatabase();
        showHide('#leaderboardContainer','#gameover');
        clearScore();
        loadGame();
        //refresh the leaderBoard
        setTimeout(function(){getUsersTopScores(10);
            getGlobalLeaderboard(10); },2000);
    }
}
