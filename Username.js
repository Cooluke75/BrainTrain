/**
 Username.js
 description:    Functions that store, delete and update the username.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

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
    if($("#userName").val().trim() == ""){
        alert("Enter a valid name.");
    } else {
        storeName("userNameTS", $("#userName").val());
        $('.input').attr('value','');
        var namekk = getStoredName("userNameTS");
        $('#showName').text(namekk);
        $("#savingUserName").hide();
        $("#afterSaving").show();
    }
}

/**
 * Changes the username.
 */
function changeTheName() {
    alert("The local leaderboard will be erased.");
    deleteName("userNameTS");
    $("#afterSaving").hide();
    $("#savingUserName").show();
}

$(document).ready(function(){
    if(localStorage.userNameTS){
        $("#savingUserName").hide();
        $('#showName').text(getStoredName("userNameTS"));
    } else {
        $("#afterSaving").hide();
    }
    $("#save").click(saveUserName);
    $("#change").click(changeTheName);
});
  