/**
 Init.js
 description:    Initializes the game session.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

$(document).ready(function() {

    initAudio();
    loadGame();
    loadStartScreen();

    window.myTime = startTimer(5, "timer", function() {gameOver();});
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

    /**
    var queryInit = '&q={"username": '+ username + '}';
    //update data from the database when our program is loaded.
    $.ajax({
        //get only one document
        
        url: usersTableURL + queryInit,
        success: function (result) {

            var achievement1 = result.achievement1;
            var achievement2 = result.achievement2;
            var achievement3 = result.achievement3;
            var unlocked = result.unlocked;

            storeName('achievement1',achievement1);
            storeName('achievement2',achievement2);
            storeName('achievement3',achievement3);
            storeName('unlocked',unlocked);



        },
        error: function (xhr) {

            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });   //end of the update function
*/

});


function loadStartScreen() {

    $("#container").hide();
    $("#logoFadeIn").hide();

    var a = setInterval(function() {
        $('#logoFadeIn').fadeIn("slow");
    }, 250);

   var b = setInterval(function() {
        $('#logoContainer').fadeOut("slow");
    }, 2500);

   var c =  setInterval(function() {
        $('#container').show();
       clearInterval(a);
       clearInterval(b);
       clearInterval(c);
    }, 3000);

    
    

}
