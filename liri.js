var fs = require('fs');
var request = require('request');  // it is common practice to name the object the same as the module name. 
var keys = require('./keys'); // this is my module so i include ./ but if it is a core module you don't need to include the path. 
var Twitter = require('twitter');
//var parameterCount = {count: 20};
//Spotify argument	
var spotify = require('spotify');
var argOne = process.argv[2];
var argTwo = process.argv[3];

function switchFunction() {
	switch(argOne){
	case 'my-tweets': myTweets();
	break;

	case 'spotify-this-song': spotifySong();
	break;

	case 'movie-this' : movieThis();
	break;

	case 'do-what-it-says' : doWhatItSays();
	break;
	}
};


function myTweets(){
		var client = new Twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret:  keys.twitterKeys.consumer_secret,
  			access_token_key: keys.twitterKeys.access_token_key,
  			access_token_secret: keys.twitterKeys.access_token_secret
  		});
  
 //twitter function parameters: 
  	var parameters = {
  		twitterHandle: 'thecomparatist', 
  		count: 20
  	};
  	//get method to get statuses from twitter
  	client.get("statuses/user_timeline", parameters, function(error, tweets, response){
  		if (!error && response.statusCode == 200) {
  			for(var i = 0; i < tweets.length; i++){
  				console.log(tweets[i].text + "Created on:" + tweets[i].created_at + "\n");
  			}
  			console.log("================" + "\n");
  		} else {
  			console.log(error);
  		}

  	});
 };



function spotifySong() {
	var searchSong;
	if(argTwo === undefined){
		searchSong = "What is my Age Again?";
	} else {
		searchSong = argTwo;
	}
	spotify.search({type: 'track', query: searchSong, count: 1}, function(error, data){
		if(error) {
			console.log('Error:' + error);
			return;
		} else{
			console.log("Artist:" + data.tracks.items[0].artists[0].name);
			console.log("Song Name:" + data.tracks.items[0].name);
			console.log("Album:" + data.tracks.items[0].album.name);
			console.log("Spotify Preview Link:" + data.tracks.items[0].preview_url);
			fs.appendFile('random.txt', "Artist:" + data.tracks.items[0].artists[0].name + "\n" + "Song Name:" + data.tracks.items[0].name + "\n" + "Album Name" + data.tracks.items[0].album.name + "\n" + "Spotify Preview Link:" + data.tracks.items[0].preview_url+ "\n");

		}
	})
}; //spotify function ends here

//OMDB 

function movieThis() {

	var movieInfo; 
		if(argTwo === undefined){
			movieInfo = "Mr. Nobody";
		} else {
			movieInfo = argTwo;
		};
	
	var omdbApi = 'http://www.omdbapi.com/?t=' + movieInfo +'&y=&plot=long&tomatoes=true&r=json';
		request(omdbApi, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Title:" + JSON.parse(body) ["Title"]);
				console.log("Year:" + JSON.parse(body) ["Year"]);
				console.log("IMDB Rating:" + JSON.parse(body) ["imdbRating"]);
				console.log("Country:" + JSON.parse(body) ["Country"]);
				console.log("Language:" + JSON.parse(body) ["Language"]);
				console.log("Plot:" + JSON.parse(body) ["Plot"]);
				console.log("Actors:" + JSON.parse(body) ["Actors"]);
				console.log("Rotten Tomatoes Rating:" + JSON.parse(body) ["rottenTomatoesRating"]);
			} 
		});
	}; //movieThis function ends here


function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		} else {
			var dataArray = data.split(","); 
			argOne = dataArray[0];
			argTwo = dataArray[1];
			};
			
			switchFunction();

			}) //fs ends here 
		};

			switchFunction();


/////////////////// my first unsuccessful attempt is below ///////////////////////
	
  //           var user = {screen_name: userInput[1]};
  //           	client.get("statuses/user_timeline", user, function(error, tweets, response) {
  //               if (!err && response.statusCode == 200) {
  //               	console.log("Latest tweets from" + user);
  //               	for (var i = 0; i < tweets.length; i++) {
  //                       console.log("Tweet #" + (i + 1) + ": " + tweets[i].text +
  //                           "\n -Tweeted on: " + tweets[i].created_at + "\n");
  //                   }
  //                   console.log("=========================================================================================" +
  //                       "\n"
  //                   );
  //               } else {
  //                   console.log(err);
  //               }
  //           });
  //       }

  //       if(userInput[0] == "spotify-this-song") {
  //       	spotify.search({type: 'track', query: queryInput, count: 1}, function(error, data) {
		// 		if(!error) {
		// 			console.log('Error:' + error);
  //       		for (var i = 0; i < data.tracks.items.length; i++) {
  //                       console.log("Artist:" + data.tracks.items[0].artists[0].name);
		// 				console.log("Song Name:" + data.tracks.items[0].name);
		// 				console.log("Album Name:" + data.tracks.items[i].album.name);
		// 				console.log("Spotify Song Preview:" + data.tracks.items[0].external.url.spotify);
		// 				fs.appendFile('random.txt', "Artist:" + data.tracks.items[0].artists[0].name + "\n" + "Song Name:" + data.tracks.items[0].name + "\n" + "Spotify Preview:" + data.tracks.items[0].external.url.spotify + "\n");
  //       		} 
  //      		} else {
  //      			console.log(error);
  //      		}
  //      	}

 //     	if(userInput[0] == "movie-this") {
 //     		function movieThis() {

	// 			var movieInfo = input.movieInfo;
	
	// 			request('http://www.omdbapi.com/?t=" + movieInfo + "&tomatoes=true" + &y=&plot=short&r=json', function (error, response, body) {
	// 				if (!error && response.statusCode == 200) {
	// 					console.log(JSON.parse(body) ["Title:" + movieInfo.Title + "\n" + Year: + movieInfo.Year + "\n" + "IMBD Rating:" + movieInfo.imbdRating + "\n" + "Country:" + movieInfo.Country + "\n" + "Language:" + movieInfo.Language + "\n" + "Plot:" + movieInfo.Plot + "\n" +  "Actors:" + moviInfo.Actors + "\n"]);
	// 				} else {
	// 					console.log(error);
	// 			};
	// 		});
	// 	}

 //     }


 // 