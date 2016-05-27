/**
 Achievement.js
 description:    Show achievements on leader board page.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 **/
    
function getAchievement() {
    var checkAC1 = getStoredName('achievement1');
    var checkAC2 = getStoredName('achievement2');
    var checkAC3 = getStoredName('achievement3');
    if(checkAC1 == 1){
        $('#leaderBoardAchievement1').show();
    } else {
        $('#leaderBoardAchievement1').hide();
    }

    if(checkAC2 == 1){
        $('#leaderBoardAchievement2').show();
    } else {
        $('#leaderBoardAchievement2').hide();
    }

    if(checkAC3 == 1){
        $('#leaderBoardAchievement3').show();
    } else {
        $('#leaderBoardAchievement3').hide();
    }
    checkTitle();
    
}

$(document).ready(function () {
    //hide achievements
    $('#leaderBoardAchievement1').hide();
    $('#leaderBoardAchievement2').hide();
    $('#leaderBoardAchievement3').hide();
    
    $('#leaderboardButton').click(function () {
        getAchievement();
    });
});

function checkTitle() {
    var achiNum = getStoredName("unlocked");
    if (achiNum == 0){
        $('#titleName').text('Novice');
    }
    if (achiNum == 1){
        $('#titleName').text('Pro');
    }
    if (achiNum == 2){
        $('#titleName').text('Expert');
    }
    if (achiNum == 3){
        $('#titleName').text('Master');
    }

}