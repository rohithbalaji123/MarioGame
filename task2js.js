var can = document.getElementById("myCanvas");
var con = can.getContext('2d');
{
	var speed = 10;
	var x = 50;
	var y = 550;
	var w = 50;
	var h = 100;
	var bx1 = 1800;
	var by1 = 610;
	var bw1 = 40;
	var bh1 = 40;
	var bx2 = 900;
	var by2 = 550;
	var bw2 = 50;
	var bh2 = 50;
	var bspeed = 3;
	var timer;
	var jump;
	var down = {};
	var score = 0;
	var highScore = 0;
	var marioImage,mario,marioMove;
	var block1Image,block1;
	var block2Image,block2;
	var frameIndex = 1;
	var tickCount = 0;
	var crashed = false;
	var bricks = new Image();

	function reset() {
		speed = 10;
		x = 50;
		y = 550;
		w = 50;
		h = 100;
		bx1 = 1800;
		by1 = 610;
		bw1 = 40;
		bh1 = 40;
		bx2 = 900;
		by2 = 550;
		bw2 = 50;
		bh2 = 50;
		bspeed = 3;
		down = {};
		score = 0;
		frameIndex = 1;
		tickCount = 0;
		clearTimeout(jump);
		clearTimeout(marioMove);
		init();
	}

	function init() {
		can.style.border="3px solid black";
		con.fillStyle = "#ffffff";
		con.fillRect(0,0,can.width,can.height);
		mario = {
			width: 450,
			height: 219,
			image: marioImage,
			numberOfFrames: 3,
			ticksPerFrame: 5
		}
		marioMove = setInterval(gameLoop,20);
		marioImage = new Image();
		marioImage.src = "Minemario.png";
		block1Image = new Image();
		block1Image.src = "block1.png";
		block2Image = new Image();
		block2Image.src = "block2.png";
		drawBlock();
		document.addEventListener("keydown",checkSpaceDown,false);
		document.addEventListener("keyup",checkup,false)
		bricks.src = "bricks.jpg";
	}

	function gameLoop() {
		marioUpdate();
		blockMove();
	}

	function marioRender() {
		con.clearRect(0,0,can.width,can.height);
		con.fillStyle = "#ffffff";
		con.fillRect(0,0,can.width,can.height);
		var back = new Image();
		back.src = "sky.jpg";
		con.drawImage(back,0,0,can.width,650);
		con.drawImage(marioImage,frameIndex*mario.width/3,0,mario.width/3,mario.height,x,y,w,h);
	}

	function marioUpdate() {
		tickCount++;
		if(tickCount > mario.ticksPerFrame) {
			tickCount = 0;
			if(frameIndex == 1) {
				frameIndex = 2;
			}
			else if(frameIndex == 2){
				frameIndex = 1;
			}
		}
	}

	function drawBlock() {
		con.drawImage(block1Image,bx1,by1,bw1,bh1);
		con.drawImage(block2Image,bx2,by2,bw2,bh2);
		var pattern = con.createPattern(bricks,"repeat");
		con.rect(0,650,can.width,can.height)
		con.fillStyle = pattern;
		con.fill();
	}

	function animate() {
		con.clearRect(0,0,can.width,can.height);
		crash();
		marioRender();
		drawBlock();
		score++;
		document.getElementById("score").innerHTML = Math.floor(score/15);
	}

	function checkSpaceDown(e) {
		e.preventDefault();
		if( e.keyCode == 38 && down['38'] == null && down['40'] == null) {
			down['38'] = true;
			jump = setInterval(ydec,50);
		}
		if(e.keyCode == 40 && down['40'] == null && down['38'] == null) {
			down['40'] = true;
			h = h/2;
			y = y+h;
		}
		if( e.keyCode == 97) {
			clearTimeout(marioMove);
		}
	}

	function checkup(e) {
		if( e.keyCode == 40 && down['38'] == null) {
			e.preventDefault();
			y = y-h;
			h = h*2;
			down['40'] = null;
		}
	}

	function ydec() {
		y = y-10;
		if(y < 450) {
			clearTimeout(jump);
			jump = setInterval(yinc,50);
		}
		frameIndex = 0;
		animate();
	}

	function yinc(){
		y+=10;
		frameIndex = 0;
		if(y > 550){
			y-=10;
			frameIndex = 1;
			clearTimeout(jump);
			down['38'] = null;
		}
		else if(y == 550){
			frameIndex = 1;
			clearTimeout(jump);
			down['38'] = null;
		}
		
		animate();
	}

	function blockMove() {
		if(score%200 == 0)
			bspeed++;
		bx1-=bspeed;
		bx2-=bspeed;
		animate();
		if(bx1 < 20) {
			bx1 = 1800;
		}
		if(bx2 < 20) {
			bx2 = 1800;
		}
	}

	function crash() {
		if((x+w-bx1>=5 && y>550-bh1) || (x+w-bx2>=0 && h>50 && bx2+bw2-x>=0)) {
			calcHighScore();
			clearTimeout(jump);
			clearTimeout(marioMove);
		}
	}

	function calcHighScore() {
		if(score > highScore)
			highScore = score;
		document.getElementById("highScore").innerHTML = Math.floor(highScore/15);
	}

	function pause() {
		clearTimeout(jump);
		clearTimeout(marioMove);
	}

	function resume() {
		if(y != 550) {
			jump = setInterval(yinc,50);
		}
		init();
	}
}