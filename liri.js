require("dotenv").config();
var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown');
var request = require("request");
var keys = require("./keys.js");
var command = process.argv[2];

// below is universal function used for bug-fix. 

// function getURL() {
// var searchValue = process.argv.slice(3).join()
// request(commandURL, function (error, response, body) {
//     console.log('error:', error);
//      console.log(response)
//      console.log('statusCode:', response && response.statusCode); 
//      console.log('body:', body);
// }
// }
//this piece done.

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

  var Events = new BandsInTownEvents();
 
  
  Events.setParams({
    "app_id":"codingbootcamp", //can be anything
    "artists":[band]    
  });
   
  //get your events with success and error callbacks
  Events.getEvents(function( events ){
    for(var i = 0; i < events.length; i++){
      console.log( `${events[i].venue.city} 
      ${ events[i].venue.region}`  );
    }

    var moment = require('moment');
moment().format();
  },function( errors ){
    console.log(errors);
  });

 
  // if (!band)
  // var Events = new BandsInTownEvents()
  // bandsintown.
  // getArtistEventList(band, "upcoming all")
  //   .then(function (events) {
  //     for(var i = 0; i < events.length; i++){
  //       console.log( events[i].venue.city + ", " + events[i].venue.region );
  //     }
  //   },function( errors ){
  //     console.log(errors);
  //   });
};


//done: Spotify-this-song

function spotifyThisSong() {
  var song = process.argv.slice(3).join(" ");
  if (!song) {
    console.log(`You asked for it. . . If you can't pick, I will, and you won't like my choice of earworm. . .`);

    song = "The Sign Ace of Base";
  }

  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({
    type: 'track',
    query: song
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


    console.log(`
      YOUR SONG:
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Artist: ${data.tracks.items[0].artists[0].name} 

    Name: ${data.tracks.items[0].name}

    Preview link: ${data.tracks.items[0].preview_url}

    Album: ${data.tracks.items[0].album.name}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  });
};
//done: movieThis
function movieThis() {
  let movie = process.argv.slice(3).join(" ");
  // console.log(`movie=*${movie}*`)
  if (!movie) {
    console.log(`Having trouble picking a Movie? If you haven't watched Mr. Nobody, then you should.

    It's on Netflix!`);

    movie = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode === 200) {

      console.log(`
      YOUR MOVIE:
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