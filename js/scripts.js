
// Create the canvas
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 222;

// dimensions 236 x 222
var imageList = ['rock.png','paper.png','scissor.png'];
var flipImageList = ['rock_flip.png','paper_flip.png','scissor_flip.png'];
var srcDirName = "/rock-paper-scissors/assets/";

var gamesPlayed = 0;

// get rock paper scissor buttons
var rockbtn = document.querySelector("#btn-rock");
var paperbtn = document.querySelector("#btn-paper");
var scissorsbtn = document.querySelector("#btn-scissors");

var resetbtn = document.querySelector("#btn-reset");

rockbtn.onclick =  function() {
		player.choice = "rock";
		state = "play";

};

paperbtn.onclick =  function() {
		player.choice = "paper";
		state = "play";

};

scissorsbtn.onclick =  function() {
		player.choice = "scissor";
		state = "play";

};

// Reset the game when the player presses esc
var reset = function () {
	player.score = 0;
	comp.score = 0;
	gamesPlayed = 0;
	state = "wait";
};


resetbtn.onclick =  reset;


function getImageSrc(choice)
{
	if (choice == "rock")
		return srcDirName + imageList[0];
	else if (choice == "paper")
		return srcDirName + imageList[1];
	else
		return srcDirName + imageList[2];
	
}

function getFlipImageSrc(choice)
{
	if (choice == "rock")
		return srcDirName + flipImageList[0];
	else if (choice == "paper")
		return srcDirName + flipImageList[1];
	else
		return srcDirName + flipImageList[2];
	
}


// Game objects
var player = {
	choice: '',
	score: 0
	
};

var comp = {
	choice: '',
	score: 0
	
};





var state = "start";

var update = function (modifier) {
	var result = NaN;
	
	
	
	
	if(state == "play") {
		gamesPlayed++;
		comp.choice = chooser();
	
		result = whoWins(player.choice, comp.choice);
		
		if(result == 1)
			player.score++;
		else if(result == -1)
			comp.score++;
		
		state = "wait";
	
	}
	
	else if(state == "start") {
		
		
	}
	
	
	
	
	

	
};



/*Game logic*/
function chooser()
{
	var choice = getRandomInt(0,2);
	if (choice == 0)
		return "rock";
	else if (choice == 1)
		return "paper";
	else
		return "scissor";
}

function whoWins(one,two)
{
	if(one == two)
		return 0;
	
	if((one == "rock" && two == "scissor") || (one == "paper" && two == "rock") || (one == "scissor" && two == "paper") )
		return 1;
	
	if((two == "rock" && one == "scissor") || (two == "paper" && one == "rock") || (two == "scissor" && one == "paper") )
		return -1;
	
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

/* Game status renderer
*/

 function updateGameUI(score, game)
 {
	 var scoreSpan = document.querySelector("#score");
	 var gameSpan = document.querySelector("#games");
	 
	 scoreSpan.innerText = "Score: "+score;
	 gameSpan.innerText = "Game: "+game;
	 
	 
 }


function render() {
    
    
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
		
        var imgP = new Image();
        var imgC = new Image();
        
        imgP.onload = function() {
            ctx.drawImage(imgP,0,0);
            
            
        };
        
        imgC.onload = function() {
            ctx.drawImage(imgC,264,0);
        }
        
        imgP.src = getFlipImageSrc(player.choice);
        imgC.src = getImageSrc(comp.choice);
    }
    
    
    updateGameUI(player.score, gamesPlayed);
    
}



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();