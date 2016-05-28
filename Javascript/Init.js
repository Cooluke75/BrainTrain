/**
 Init.js
 description:    Initializes the game session.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

$(document).ready(function() {

    initAudio();
    loadGame();
    loadStartScreen();

    window.myTime = startTimer(60, "timer", function() {gameOver();});
    myTime.pause();

    //hiding everything in the beginning but the menu
    $("#myCarousel").hide();
    $("#leaderboardContainer").hide();
    $("#settingContainer").hide();
    $("#playContainer").hide();
    $("#gameover").hide();
    $("#achievement3").hide();
    
    
    


    if(getStoredName("userNameTS") == null){
        //everytime refresh initializes this
        storeName('achievement1','0');
        storeName('achievement2','0');
        storeName('achievement3','0');
        storeName('unlocked','0');
        console.log("No username yet");
    }
    else {
        var queryInit = '&q={"username":"' + username + '"}';
        //update data from the database when our program is loaded.
        $.ajax({
            //get only one document

            url: usersTableURL + queryInit,
            success: function (result) {

                if(!$.trim(result)){
                    console.log("no record under this name on database.");
                    storeName('achievement1','0');
                    storeName('achievement2','0');
                    storeName('achievement3','0');
                    storeName('unlocked','0');
                    sendUsernameToDatabase(getStoredName("userNameTS"));
                    console.log("Then create one document on the username database.//Init");
                } else {
                    var achievement1 = result[0].achievement1;
                    var achievement2 = result[0].achievement2;
                    var achievement3 = result[0].achievement3;
                    var unlocked = result[0].unlocked;

                    storeName('achievement1',achievement1);
                    storeName('achievement2',achievement2);
                    storeName('achievement3',achievement3);
                    storeName('unlocked',unlocked);
                    console.log("Get username data successfully ");

                }

                    
            },
            error: function (xhr) {

                console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
                console.log("Get username data unsuccessfully ");
            }
        });   //end of the update function
    }
    


    


});


function loadStartScreen() {

    $("#container").hide();
    $("#logoFadeIn").hide();

    var a = setInterval(function() {
        $('#logoFadeIn').fadeIn("slow");
    }, 250);

   var b = setInterval(function() {
        $('#logoFadeIn').fadeOut("slow");
    }, 2500);

   var c =  setInterval(function() {
       $('#container').show();
       $('#logoContainer').hide();
       clearInterval(a);
       clearInterval(b);
       clearInterval(c);
    }, 3000);

}

/*
 * load achievement function
 */
function loadAchievement(idShow) {
    $(idShow).show("fast");
}

/*
 * hide achievement function
 */
function hideAchievement() {
    $('#achievement3').hide("fast");
}
