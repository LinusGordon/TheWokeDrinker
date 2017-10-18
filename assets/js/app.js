var path = require('path');
var http = require('http');
var express = require('express');
var logger = require('morgan');
var app = express();


// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/beer/:beer', function(req, res){
	http.get("http://api.brewerydb.com/v2/search?q= " + req.params.beer + "&type=beer&key=cb61a7bc1e0c08fc125b7559fa6cad70", function(response){
        console.log("status: " + res.statusCode);
        var bodyChunks = [];
		  response.on('data', function(chunk) {
		    // You can process streamed parts here...
		    bodyChunks.push(chunk);
		  }).on('end', function() {
		    var body = Buffer.concat(bodyChunks);
		    try {
		    	for(beer in body["data"]) {
		    		for(brewery in beer["breweries"]) {
		    			console.log(brewery)
		    			if(brewery["isMassOwned"] == "Y") {
		    				res.send("Mass Owned")
		    			}
		    		}
		    	}
		    	res.send("Not Mass Owned")
		    } catch(err) {
		    	res.send("Couldn't find beer")
		    }
		  })
    });
});


// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');