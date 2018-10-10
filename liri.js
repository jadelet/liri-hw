require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var command = process.argv[2];
var value = process.argv[3];
// below is function I'd like to use to factor out code if I can get everything working, where URL is the url formula for the individual command, to be set forth as a variable.
// function getURL() {
// var searchValue = process.argv.slice(3).join()
// request(commandURL, function (error, response, body) {
//     console.log('error:', error);
//      console.log(response)
//      console.log('statusCode:', response && response.statusCode); 
//      console.log('body:', body);
// }
// }

switch (command) {
  case "concert-this":
    concertThis();
    break;

  case ("spotify-this-song"):
    spotifyThisSong();
    break;

  case ("movie-this"):
    movieThis();
    break;

  case ("do-what-it-says"):
    doWhatItSays();
    break;

}
// TODO: concertThis

function concertThis() {
  var band = process.argv.slice(3).join();
  request("http://www.bandsintown.com/event/13722599?app_id=codingbootcamp&artist=" + band, function (error, response, body) {
    console.log('error:', error);
     console.log(response)
     console.log('statusCode:', response && response.statusCode); 
     console.log('body:', body);

})
};
//TODO: spotifyThisSong
function spotifyThisSong() {
  var song = process.argv.slice(3).join(" ")
  request("http://www.bandsintown.com/event/13722599?app_id=codingbootcamp&artist=" + band, function (error, response, body) {
    console.log('error:', error);
     console.log(response)
     console.log('statusCode:', response && response.statusCode); 
     console.log('body:', body);
})
};
//TODO: movieThis
function movieThis() {
 let movie = process.argv.slice(3).join(" ");
//      FIXME: 
console.log (`movie=*${movie}*`)
  if (!movie) { 
    console.log (`Having trouble picking a Movie? If you haven't watched Mr. Nobody, then you should.

    It's on Netflix!`);

    movie ="Mr. Nobody";
  }

 request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function (error, response, body) {
  console.log('error:', error);
   console.log(response)
   console.log('statusCode:', response && response.statusCode); 
   console.log('body:', body);
    if (!error && response.statusCode === 200) {

    
      console.log(`
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Title: ${JSON.parse(body).Title} 

    Release Year: ${JSON.parse(body).Year}

    IMDB Rating: ${JSON.parse(body).imdbRating}

    Rotten Tomates Rating: ${JSON.parse(body).Ratings[1].Value} 

    Production Country: ${JSON.parse(body).Country}

    Language: ${JSON.parse(body).Language}

    Plot: ${JSON.parse(body).Plot}

    Actors: ${JSON.parse(body).Actors}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
   
  
      };
    });
  }

// TODO:  doWhatItSays

function doWhatItSays() {}