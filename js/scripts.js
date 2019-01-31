
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 222;
document.body.appendChild(canvas);

var options = ['rock.png','paper.png','scissor.png'];
var srcDirName = "/rock-paper-scissors/assets/";



function getImageSrc(choice)
{
	if (choice == "rock")
		return srcDirName + options[0];
	else if (choice == "paper")
		return srcDirName + options[1];
	else
		return srcDirName + options[2];
	
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

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player presses esc
var reset = function () {
	player.score = 0;
	comp.score = 0;
};

var state = "start";

var update = function (modifier) {
	var result = NaN;
	
	
	if (state == "wait") {
		
		if (90 in keysDown) { // Player holding z
			player.choice = "rock";
			state = "play";
		}
		if (88 in keysDown) { // Player holding x
			player.choice = "paper";
			state = "play";
		}
		if (67 in keysDown) { // Player holding c
			player.choice = "scissor";
			state = "play";
		}
		if (192 in keysDown) { // escape
			reset();
			state = "start";
		}
	
	}
	
	else if(state == "play") {
		
		comp.choice = chooser();
	
		result = whoWins(player.choice, comp.choice);
		
		if(result == 1)
			player.score++;
		else if(result == -1)
			comp.score++;
		
		state = "wait";
	
	}
	
	else if(state == "start") {
		if (13 in keysDown) { // Player holding zenter

			state = "wait";
		}
		
	}
	
	
	
	
	

	
};

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



function render() {
    
    
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var imgP = new Image();
        var imgC = new Image();
        
        imgP.onload = function() {
            ctx.drawImage(imgP,0,0);
            
            
        };
        
        imgC.onload = function() {
            ctx.drawImage(imgC,244,0);
        }
        
        imgP.src = getImageSrc(player.choice);
        imgC.src = getImageSrc(comp.choice);
    }
    
    
    
    
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