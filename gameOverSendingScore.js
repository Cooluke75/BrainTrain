/**
 * Created by Kent on 2016-05-19.
 */

//When the user click the save and go to leaderboard button will trigger this function
function checkIfUserNameProvided() {
    //if user name is provided already.
    if(localStorage.userNameTS) {
        //send record to database
        sendScoreToDatabase();
        
        //direct the user to leader boarder
        hideShow('#leaderboardContainer','#gameover');
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

//the function will be triggered when user click the save button on the popup page
function gameOverSavingNameButton() {
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
        hideShow('#leaderboardContainer','#gameover');
        clearScore();
        loadGame();
        //refresh the leaderBoard
        setTimeout(function(){getUsersTopScores(10);
            getGlobalLeaderboard(10); },2000);
    }
}
