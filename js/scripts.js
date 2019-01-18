

var options = ['rock.png','paper.png','scissor.png'];
var srcDirName = "file://C:/Users/Devesh/Programming Haven/JS/rock-paper-scissors/assets/";


setInterval(draw,1000)   

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 
        
function draw() {
    var canvasPlayer = document.getElementById('player');
    
    
    if (canvasPlayer.getContext) {
        var ctxP = canvasPlayer.getContext('2d');
        var imgP = new Image();
        var imgC = new Image();
        
        imgP.onload = function() {
            ctxP.drawImage(imgP,0,0);
            
            
        };
        
        imgC.onload = function() {
            ctxP.drawImage(imgC,244,0);
        }
        
        imgP.src = "file://C:/Users/Devesh/Programming Haven/JS/rock-paper-scissors/assets/rock.png";
        imgC.src = srcDirName + options[getRandomInt(0, 2)];
    }
    
    
    
    
}