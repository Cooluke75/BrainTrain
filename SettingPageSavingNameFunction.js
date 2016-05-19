/**
 * Created by Kent on 2016-05-19.
 */
// Cookie to store score points
function storeName(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

function deleteName(key){
    if(localStorage) {
        window.localStorage.removeItem(key);
    }
}

function getStoredName(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}

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

})

  