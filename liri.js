require("dotenv").config();
var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown');
var moment = require('moment');
var request = require("request");
var keys = require("./keys.js");
var fs = require('fs')
var command = process.argv[2];
var pos3 = process.argv.slice(3).join();

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
function pickCommand (){
  console.log(command)
switch (command) {
  case "concert-this":
    concertThis();
    break;

  case ("spotify-this-song"):
    spotifyThisSong();
    break;

  case ("pos3-this"):
    movieThis();
    break;

  case ("do-what-it-says"):
    doWhatItSays();
    break;

}}

pickCommand()
// Done: concertThis

function concertThis() {
  var pos3 = process.argv.slice(3).join();
  // console.log(pos3);
  request(`https://rest.pos3sintown.com/artists/${pos3}/events?app_id=jenscodingbootcamp`, function (error, response, body) {
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', JSON.parse(body));
    const json = JSON.parse(body);
    console.log (`${pos3.toUpperCase()} CONCERTS IN YOUR AREA:`)
    for (var i = 0; i < json.length; i++) {
      if (!error && response.statusCode === 200)
      console.log(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Location: ${json[i].venue.name} 
      City: ${json[i].venue.city}, ${json[i].venue.region}
      Date: ${moment(json[i].datetime).format("MM/DD/YYYY")}
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

    }
  })
}



function spotifyThisSong() {
  var pos3 = process.argv.slice(3).join(" ");
  if (!pos3) {
    console.log(`You asked for it. . . If you can't pick, I will, and you won't like my choice of earworm. . .`);

    pos3 = "The Sign Ace of Base";
  }

  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({
    type: 'track',
    query: pos3
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
  let pos3 = process.argv.slice(3).join(" ");
  // console.log(`pos3=*${pos3}*`)
  if (!pos3) {
    console.log(`Having trouble picking a Movie? If you haven't watched Mr. Nobody, then you should.

    It's on Netflix!`);

    pos3 = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?t=" + pos3 + "&plot=short&apikey=trilogy", function (error, response, body) {
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

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {

     if (error) {
      return console.log(error);
    }
  
   // console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    command = dataArr[0];
    pos3 = dataArr[1];
  pickCommand ()
})
}