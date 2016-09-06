var showName = ['Heroes', 'Breaking Bad','Game of Thrones','Walking Dead','Parks and Recreation', 'The Office', 'Rick and Morty', 'Entourage', 'How I Met your Mother'];
var animatedGif;
var currentGif;
var pausedGif;  
var stillGif;

//Creates buttons
function createButtons(){
	$('#showButtons').empty();
	for(var i = 0; i < showName.length; i++){
		var showBtn = $('<button>').text(showName[i]).addClass('showButton').attr({'data-name': showName[i]});
		$('#showButtons').append(showBtn);
	}
	
	//Display gifs on click
	$('.showButton').on('click', function(){
		$('.display').empty();
		
		var thisShow = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=12&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//For shows with no rating
				if(thisRating == ''){
					thisRating = 'Not Rated';
				}
				var rating = $('<h4>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('play');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});	 
	});    	
}  

// //Animate & pause gifs
$(document).on('mouseover','.play', function(){
	   	$(this).attr('src', $(this).data('animated'));                 
}); 
$(document).on('mouseleave','.play', function(){
	   	$(this).attr('src', $(this).data('paused'));                   
}); 

//Creates button from user input
$('#addShow').on('click', function(){
	var newShowInput = $('#newShow').val().trim();
	showName.push(newShowInput);
	createButtons();
	return false;
});


