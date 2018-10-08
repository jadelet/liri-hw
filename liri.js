require("dotenv").config();
var keys = require(“keys.js”);
var command = process.argv[2];
var value = process.argv[3];

switch (command) {
  case "concert-this";
  concertThis();
  break;

  case ("spotify-this-song");
  spotifyThisSong();
  break;

  case ("movie-this");
  movieThis();
  break;

  case ("do-what-it-says");
  doWhatItSays();
  break;



}
// TODO: create function for each case

function concertThis () {
 


  console.log 
}

function spotifyThisSong() {}

function movieThis() {}

function doWhatItSays() {}
