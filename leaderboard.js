var username = localStorage.userNameTS;

// get the URL of the scores table
var scoresTableURL = 'https://api.mlab.com/api/1/databases/braintrain/collections/scores'
    + '?apiKey=SWfr016sOh1qeUqTCZuHb7O9IMMDgBby';

$(document).ready(function () {
    $('#leaderboardButton').click(function () {
        getUsersTopScores(10);
        getGlobalLeaderboard(10);
    });
});

// Gets the user's top scores from the database and puts them in the my-scores table
function getUsersTopScores(numberOfRecords) {
    // clear the my-scores table
    $('#my-scores table tr:first-child').siblings().remove();

    // get the user's top scores
    var query = '&q={"username": "' + username + '"}&f={"_id": 0}&s={"score": -1}&l='+ numberOfRecords;


    // request data from the server
    $.ajax({
        url: scoresTableURL + query,
        success: function (result) {
            for(i = 0; i < result.length; i++) {
                var rank = '<td>' + (i + 1) + '</td>';
                var score = '<td>' + result[i].score + '</td>';
                var level = '<td>' + result[i].level + '</td>';
                var date = '<td>' + result[i].date + '</td>';

                $('#my-scores table').append('<tr>' + rank + score + level + date + '</tr>');
            }
        },
        error: function (xhr) {
            $('#my-scores table').append('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

// Gets the top global scores from the database and puts them in the leaderboard table
function getGlobalLeaderboard(numberOfRecords) {
    // clear the leaderboard table
    $('#leaderboard table tr:first-child').siblings().remove();


    // get the top 10 global fields, ordered by score
    var query = '&f={"_id":0}&s={"score": -1}&l=' + numberOfRecords;

    // request data from the server
    $.ajax({
        url: scoresTableURL + query,
        success: function (result) {
            for(i = 0; i < result.length; i++) {
                var rankField = '<td>' + (i + 1) + '</td>';
                var usernameField = '<td>' + result[i].username + '</td>';
                var scoreField = '<td>' + result[i].score + '</td>';
                var levelField = '<td>' + result[i].level + '</td>';

                var userClass = '';

                // if this score belongs to this user, make it bold
                if (result[i].username == username) {
                    userClass = 'user-score';
                }

                $('#leaderboard table').append('<tr class="' + userClass + '">' + rankField + usernameField + scoreField + levelField + '</tr>');
            }
        },
        error: function (xhr) {
            $('#leaderboard table').append('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });

    getUsersSingleBestScore(numberOfRecords);
}

// Get the user's single best score
function getUsersSingleBestScore(numberOfRecords) {
    // get the user's top score
    var query = '&q={"username": "' + username + '"}&f={"_id": 0}&s={"score": -1}&l=1';

    var usersTopScore;

    // request data from the server
    $.ajax({
        url: scoresTableURL + query,
        success: function (result) {
            if(result != '') {
                usersTopScore = result[0].score;

                // get the user's global ranking
                query = '&q={"score": { $gt: '+ usersTopScore + '}}&s={"score": -1}&c=true';

                $.ajax({
                    url: scoresTableURL + query,
                    success: function (result2) {
                        var userRank = result2 + 1;
                        $('#leaderboard table tr.user-score:first-of-type td:first-child').text(userRank);

                        if(userRank > numberOfRecords) {
                            var rankField = '<td>' + userRank + '</td>';
                            var usernameField = '<td>' + result[0].username + '</td>';
                            var scoreField = '<td>' + result[0].score + '</td>';
                            var levelField = '<td>' + result[0].level + '</td>';

                            $('#leaderboard table').append('<tr class="user-score">' + rankField + usernameField + scoreField + levelField + '</tr>');
                        }
                    },
                    error: function (xhr) {
                        console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
                    }
                });
            }
        },
        error: function (xhr) {
            console.log('Error: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}
