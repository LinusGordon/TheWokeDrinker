function searchBeer() {
	beer = document.getElementById("beerQuery").value;
	console.log(beer)
}

function beerStatus(beer) {
	$.get("http://api.brewerydb.com/v2/?key=0f6f55ba51e66e9bb11a437e3bedacbd&name=" + beer + "&withBreweries=y", function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
	if (beer == "AB") {
		return "Macrobrewery"
	} else {
		return "Microbrewery"
	}
}

test = [{ value: 'AB'},{value:"Not Ab"}]

$('#beerQuery').autocomplete({
	source: test,
	onSelect: function(suggestion){
	  var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> '
      $('#outputcontent').html(thehtml);
	}
})

// Get the modal
var modal = document.getElementById('resultModal');

// Get the button that opens the modal
var btn = document.getElementById("searchButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    beer = document.getElementById("beerQuery").value;
	console.log(beer)
	status = beerStatus(beer)
	$('#modal-footer').html('<h1 id="modal-text">' + beer + ' is brewed in a ' + status + '</h1>')
	$('#modal-text').css( {
		"color": "black",
		"font-size": "24px"
	})
	if(status == "Microbrewery") {
		$('#modal-img').prepend('<img id="theImg" src="images/happybeer.png" />')
	} else {
		$('#modal-img').prepend('<img id="theImg" src="images/sadbeer.png" />')
	}

}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    $('#modal-footer').html('')
    $('#theImg').remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $('#modal-footer').html('')
        $('#theImg').remove()
    }

}