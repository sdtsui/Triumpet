
var windowWidth = $(window).width();
var windowHeight = $(window).height();
console.log(windowWidth, windowHeight);



var bw = 40*16;
var bh = 40*16;
var p = 10;
var canvas = document.getElementById("boardCanvas");
var context = canvas.getContext("2d");
function drawBoard(){
for (var x = 0; x <= bw; x += 40) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}


for (var x = 0; x <= bh; x += 40) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
}

context.strokeStyle = "black";
context.stroke();
}

drawBoard();



<div id="appView">AppView</div>
</div>
<canvas id="canvas" width="420px" height="420px" style="background: #fff;     magrin:20px;">
</canvas>


  template: _.template('<div id="board">Board</div><div id="tokens"></div><div id="score">Score</div><div id="player">Player</div>'),
