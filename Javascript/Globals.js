/**
 Globals.js
 description:    Declares all of the global variables.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 */

var rows = 9;
var cols = 16;
var grid;
var track; // A 2D array representing the train track. True means the tile is part of the track.
var level = 1;
var totalScore = 0;
var levelComplete = false;
var difficultyTier = 0;
var numberOfTrains = 1;
var startingPoints = [];
var correctAnswers = [];
var usersAnswers = [];
var skipCounter = 0;      //counter for the skipTrainAnimation function
var username = localStorage.userNameTS;
var combo = 0;
var achievementNum = 0;
var counter = 4;
//size of the train
var trainSizeF = 2.5;
//position of the train
var trainUP = 1.5;
var trainLeft = 2;