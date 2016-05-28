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
        updatePreSavedUsername();
        
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


function updatePreSavedUsername(){
    var query = '&q={"username": "'+ getStoredName("userNameTS") + '"}&c=true';

    $.ajax({
        url: usersTableURL + query,
        success: function (result) {
            console.log("Query result: " + result + " users with the username " + getStoredName("userNameTS"));
            if (result > 0) {

                $.ajax({
                    url: usersTableURL + query,
                    data: JSON.stringify({
                        "$set": {
                            'username': getStoredName("userNameTS"),
                            'achievement1': getStoredName('achievement1'),
                            'achievement2': getStoredName('achievement2'),
                            'achievement3': getStoredName('achievement3'),
                            'unlocked': getStoredName('unlocked')
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json",
                    success: function () {
                        // Notify user that their username has been saved
                        console.log(getStoredName("userNameTS") + " updated.");

                    },
                    error: function (xhr) {
                        console.log("old name is not updated.//Gameover.");
                        console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
                    }
                });
            } else {

                $.ajax({
                    url: usersTableURL,
                    data: JSON.stringify( {  'username' : getStoredName("userNameTS"),
                        'achievement1': getStoredName('achievement1'),
                        'achievement2': getStoredName('achievement2'),
                        'achievement3': getStoredName('achievement3'),
                        'unlocked': getStoredName('unlocked') } ),
                    type: "POST",
                    contentType: "application/json",
                    success: function(){
                        // Notify user that their username has been saved
                        console.log( "preEntered name" + getStoredName("userNameTS") + " updated.");

                    },
                    error: function (xhr) {
                        console.log("preEntered name"+getStoredName("userNameTS")+" is not sent.//Gameover.");
                        console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
                    }
                });


            }
        },

            error: function (xhr) {
                console.log("Fail to add one pre-saved account on usernameTB//Gameover.");
                console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
}
