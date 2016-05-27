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

    } else {
        //if not, prompt for user name
        $('#saveNamePopup').modal("show");
    }
}

/**
 * Prompts a new user to enter their username and saves their score.
 */
function saveNewUserScore() {
    var newUsername = $("#gameoverUserName").val().trim();
    
    //check if it is an empty name
    if(newUsername == ""){
        $('#gameoverNotifi').text("Enter a valid name.");
    } else {
        // check if there is an occurrence of the username
        var query = '&q={"username": "'+ newUsername + '"}&c=true';

        $.ajax({
            url: usersTableURL + query,
            success: function (result) {
                console.log("Result: " + result + " users with this username.");
                if (result > 0) {
                    $('#gameoverNotifi').text("This userName has already been taken.");
                } else {
                    //use the function from settingPageSavingNameFunction to save it as a local variable.
                    storeName("userNameTS", newUsername);
                    username = getStoredName("userNameTS");
                    // add the new user to the users table in the database
                    sendUsernameToDatabase(username);

                    $('#gameoverNotifi').text("Saved");

                    //hide the popup
                    $("#saveNamePopup").modal("hide");

                    //send record to database and direct the user to leader boarder
                    sendScoreToDatabase();
                    showHide('#leaderboardContainer','#gameover');
                    clearScore();
                    loadGame();
                }
            },
            error: function (xhr) {
                console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    }
}
