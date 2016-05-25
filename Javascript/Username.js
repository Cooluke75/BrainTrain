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

/**
 * Saves the new username that the user typed in.
 */
function saveUserName() {
    var newUsername = $("#userName").val().trim();

    if(newUsername == ""){
        alert("Enter a valid name.");
    } else {
        // check if there is an occurrence of the username
        var query = '&q={"username": "'+ newUsername + '"}&c=true';

        $.ajax({
            url: usersTableURL + query,
            success: function (result) {
                console.log("Result: " + result + " users with this username.");
                if (result > 0) {
                    alert("This username has already been taken.");
                } else {
                    storeName("userNameTS", newUsername);
                    username = getStoredName("userNameTS");

                    $('.input').attr('value','');
                    var namekk = getStoredName("userNameTS");
                    $('#showName').text(namekk);
                    $("#savingUserName").hide();
                    $("#afterSaving").show();
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
    $("#afterSaving").hide();
    $("#savingUserName").show();
}

$(document).ready(function(){
    if(getStoredName("userNameTS")){
        $("#savingUserName").hide();
        $('#showName').text(getStoredName("userNameTS"));
    } else {
        $("#afterSaving").hide();
    }
    $("#save").click(saveUserName);
    $("#change").click(changeTheName);
});


/**
 * Sends the user's username to the database.
 */
function sendUsernameToDatabase(username) {
    var titleToBeSent = 'Noob';

    //send the data
    $.ajax({
        url: usersTableURL,
        data: JSON.stringify( { "username" : username, "title": titleToBeSent } ),
        type: "POST",
        contentType: "application/json",
        success: function(){
            // Notify user that their username has been saved <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        },
        error: function (xhr) {
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

/**
 * Checks if the username given is unique (i.e. it doesn't exist in the database).
 */
// function isUniqueUsername(username) {
//     var isUnique = false;
//
//     // check if there is an occurrence of the username
//     var query = '&q={"username": "'+ username + '"}&c=true';
//
//     $.ajax({
//         url: usersTableURL + query,
//         async: false,
//         success: function (result) {
//             console.log("Result: " + result + " users with this username.");
//             if (result > 0) {
//                 isUnique = false;
//             } else {
//                 isUnique = true;
//             }
//
//             return isUnique;
//         },
//         error: function (xhr) {
//             console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
//         }
//     });
// }