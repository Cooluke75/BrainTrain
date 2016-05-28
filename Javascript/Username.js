/**
 Username.js
 description:    Functions that store, delete and update the username.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

// get the URL of the users table
var usersTableURL = 'https://api.mlab.com/api/1/databases/braintrain/collections/users'
    + '?apiKey=SWfr016sOh1qeUqTCZuHb7O9IMMDgBby';

/**
 * Stores the user's username to local storage.
 * @param key
 * @param value
 */
function storeName(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

/**
 * Deletes the user's username.
 * @param key
 */
function deleteName(key){
    if(localStorage) {
        window.localStorage.removeItem(key);
    }
}

/**
 * Returns the user's username.
 * @param key
 * @returns {*}
 */
function getStoredName(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}

function hideNotif(){
    $("#userName").val(username);
    $("#notif").hide();
}


/**
 * Saves the new username that the user typed in.
 */
function saveUserName() {
    var newUsername = $("#userName").val().trim();

    if(newUsername == username) {
        // do nothing: the user hasn't entered an different name
    } else if(newUsername == ""){
        $("#notif").text("Enter a valid name.");
        $("#notif").show();
    } else {
        // check if there is an occurrence of the username
        var query = '&q={"username": "'+ newUsername + '"}&c=true';

        $.ajax({
            url: usersTableURL + query,
            success: function (result) {
                console.log("Query result: " + result + " users with the username " + newUsername);
                if (result > 0) {
                    $("#notif").text(newUsername + " has already been taken.");
                    $("#notif").show();
                } else {
                    // username has not been set locally
                    if(getStoredName("userNameTS") === null) {
                        sendUsernameToDatabase(newUsername);
                    } else {
                        // update the database to the new username
                        changeUsernameOnDatabase(username, newUsername);
                    }

                    storeName("userNameTS", newUsername);
                    username = getStoredName("userNameTS");


                  //  $('.input').attr('value','');
                  //  var namekk = getStoredName("userNameTS");
                 //   $('#showName').text(namekk);
                   // $("#savingUserName").hide();
                  //  $("#afterSaving").show();
                }
            },
            error: function (xhr) {
                console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    }
}

/**
 * Changes the username.
 */
function changeTheName() {
    alert("The local leaderboard will be erased.");
    //deleteName("userNameTS");
  //  $("#afterSaving").hide();
    $("#savingUserName").show();
}

$(document).ready(function() {
    /**if(getStoredName("userNameTS")){
        $("#savingUserName").hide();
        $('#showName').text(getStoredName("userNameTS"));
    } else {
        $("#afterSaving").hide();
    }
     $("#save").click(saveUserName);
     $("#change").click(changeTheName);
     */
    $("#afterSaving").hide();
    $("#save").click(saveUserName);

});


/**
 * Sends the user's username to the database.
 */
function sendUsernameToDatabase(username) {
    var titleToBeSent = 'Noob';

    //send the data
    $.ajax({
        url: usersTableURL,
        data: JSON.stringify({
            "username" : username,
            "title": titleToBeSent,
            'achievement1': getStoredName('achievement1'),
            'achievement2': getStoredName('achievement2'),
            'achievement3': getStoredName('achievement3'),
            'unlocked': getStoredName('unlocked')
        }),
        type: "POST",
        contentType: "application/json",
        success: function(){
            // Notify user that their username has been saved
            $("#notif").text( username + " saved.");
            $("#notif").show();
        },
        error: function (xhr) {
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

/**
 * Updates the database with the user's new username.
 * @param oldUsername
 * @param newUsername
 */
function changeUsernameOnDatabase(oldUsername, newUsername) {
    var query = '&q={"username": "' + oldUsername + '"}';

    $.ajax({
        url: usersTableURL + query,
        data: JSON.stringify( { "$set" : { "username" : newUsername } } ),
        type: "PUT",
        contentType: "application/json",
        success: function(){
            // Notify user that their username has been saved
            $("#notif").text( newUsername + " saved.");
            $("#notif").show();
        },
        error: function (xhr) {
            console.log("new name is not saved.//changeUsernameOnDatabase");
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });

}
