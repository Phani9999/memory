
var clicks = 0;
var moves = 0;
var timer = document.querySelector('.timer');
var seconds = 0;
var minutes = 0;
var activeCards = [];
var moveCounter = document.querySelector('.moves');
var stars = document.querySelector('.stars');
var first = document.querySelector('.first-star');
var second = document.querySelector('.second-star');
var timeElapsed = 0;

/* Create all of your cards*/

const allCards = 	['fa-chess-queen', 'fa-chess-queen', 'fa-chess', 'fa-chess','fa-chess-king', 'fa-chess-king', 'fa-mercury', 'fa-mercury','fa-play', 'fa-play', 'fa-university', 'fa-university','fa-chess-pawn', 'fa-chess-pawn', 'fa-chess-rook', 'fa-chess-rook'];

// modal 
var modal = function() {
	var popup = document.querySelector('.hide');
	popup.classList.remove('hide');  

    //Final move, star rating, time 
    document.getElementById("final-moves").innerHTML = moves;
    document.getElementById("final-stars").innerHTML = stars.innerHTML;
    document.getElementById("final-time").innerHTML = timer;

	document.querySelector('.yes-please').addEventListener('click', function(){
	        popup.classList.add('hide'); 
	       	newGame();
	});  
	
	document.querySelector('.no-thanks').addEventListener('click', function(){
	        popup.classList.add('hide');
	});  
}


// function that resets game
function newGame() {

	//clear clicks & move counters
	clicks = 0;
	moves = 0;
	moveCounter.innerText = 0;

	// call functions to shuffle deck, set up card listener & clear time

	shuffleDeck();
	cardListener();
	resetTimer();

	// clear active cards
	activeCards = [];

	//make all stars visible
	first.style.visibility = 'visible';
  	second.style.visibility = 'visible';

	//event listener for restart icon
	document.querySelector('.restart').addEventListener('click', newGame);
}


// generate card HTML
function generateCard(card) {
	return `<li class="card grow"><i class="fa ${card}"></i></li>` ;
}

// Shuffle function 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffles deck
function shuffleDeck(){
	var deck = document.querySelector('.deck');
	var cardHTML = shuffle(allCards).map(function(card) {
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join('');
}



//Removes first and second stars on move count after 10 & 16 moves 
function starRating () {
	if (moves > 10 && moves < 16) {
    	first.style.visibility = 'hidden';
  	}
 	else if (moves > 16) {
   	 	second.style.visibility = 'hidden';
  	} 
}

// click counter, starts timer after first click

function clickCount() {
	
	if (clicks === 0) {
		startTimer();
		clicks++;
	} else {
	clicks++;
	}
}



//move counter   
function moveCount() {
  	moves++;
  	moveCounter.innerHTML = moves;
  	starRating();
}

function cardListener() {
//event listener to show card once 

const cards = document.querySelectorAll('.card');
var matchedCards = document.getElementsByClassName("match");

cards.forEach(function(card) {

	card.addEventListener('click', function(e) {
	    //if card is not flipped, and < 2 cards open, flip card on click
	    if (!card.classList.contains('open','show','match') && activeCards.length < 2) 
	    { 
	    	clickCount();
	      	activeCards.push(card);
	      	card.classList.add('open', 'show');
	      
		if (activeCards.length === 2) {
			moveCount();

	        //if cards match remain flipped

	        if (activeCards[0].innerHTML === activeCards[1].innerHTML) {
	        	activeCards[0].classList.add('match','open','show');
	        	activeCards[1].classList.add('match','open','show');
	        	activeCards = [];

	          	//if all cards are matched stop timer and trigger modal
	        	if (matchedCards.length === 16) {
	          		timer = timer.innerText;
	          		modal();
	          	}
	          
	        } else {
	          //If no match cards flip back over 
	        	setTimeout(function() {
	            	activeCards.forEach(function(card) {
	              		card.classList.remove('open', 'show');
	            	});
	            
	            	activeCards = [];
	            
	         	}, 1000);
	        } 
	      }
	    }
	});
});
}

//Starts seconds & minutes timer 
function startTimer() {

		timeElapsed = window.setInterval(function () {
		timer.innerHTML = minutes+" mins "+ seconds + " secs";
	    seconds++;
	    if(seconds==60){
	    	minutes++;
	    	seconds=0;
	    }
	}, 1000);
}


function resetTimer() {
  	clearInterval(timeElapsed);
  	minutes = 0;
  	seconds = 0;
  	timer = document.querySelector('.timer');
  	timer.innerHTML = minutes+" mins "+ seconds + " secs";
}



newGame();