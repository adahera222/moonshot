/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 10,
		frame0,
		frame1,
		frameBack0,
		frameBack1,
		frameJump,
		frameBackJump,
		frameDead,
		frame = 0,
		framesAmount = 0,
		dead = false,
		//playerXposition = 666,
		objectId = "",
		
		jumpTime = 500,
		jumpTicks = 500,
		jumpSpeed = 10,
		jumpAcceleration = 0.5,
		baseY = startY,
		
		back = false; 
	
    	frame0 = new Image();
   		frame1 = new Image();
    	frameBack0 = new Image();
    	frameBack1 = new Image();
    	frameJump = new Image();
    	frameBackJump = new Image();
    	frameDead = new Image(); 
	
		frame0.src = "images/astronaut1.png";
		frame1.src = "images/astronaut2.png";
		frameBack0.src = "images/astronautBack1.png";
		frameBack1.src = "images/astronautBack2.png";
		frameJump.src = "images/astronautJump.png";
		frameBackJump.src = "images/astronautBackJump.png";
		frameDead.src = "images/deadPlayer.png"  ;

	var width = 70,
		height = 100;

	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		if (newX != x) {
			updateFrames();
		};

		if (newX < x) {
			back = true;
		} else {
			back = false;
		};

		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			if (y <= 195){
				y += moveAmount-9;
			}
			else{
				y -= moveAmount;
			}
		} else if (keys.down) {
			if (y >= canvas.height){
				y -= moveAmount-9;
			}
			else{
			y += moveAmount;
			}
		};

		// Left key takes priority over right
		if (keys.left) {
			back = true;
			x -= moveAmount;
		} else if (keys.right) {
			back = false;
			x += moveAmount;
		};

		if (keys.space){
			if (jumpTicks >= jumpTime){
      			jumpTicks = 0
      			baseY = y;
    		}
		};

		if (jumpTicks < jumpTime){
      		if (y <= baseY){
        		y = (baseY - (jumpSpeed * jumpTicks) + (0.5 * jumpAcceleration * jumpTicks * jumpTicks))
        		jumpTicks++;
      		}
      		else{
        		y = baseY
        		jumpTicks = jumpTime;
      		}
    	}

		if (prevX != x || prevY != y){
			updateFrames();
		}
 		return (prevX != x || prevY != y) ? true : false;
	};

	var updateFrames = function() {
		if (frame == 1){
			framesAmount ++
			if ( framesAmount == 7){
				frame = 0
				framesAmount = 0
			}
		}
		else{
			framesAmount ++
			if ( framesAmount == 7){
				frame = 1
				framesAmount = 0
			}
		}
	}

	// Draw player
	var draw = function(ctx) {
		var imageX = playerXposition-frame0.width/2,
			imageY = y-frame0.height/2;
		
		if (jumpTicks < jumpTime){
			if (back == false){
				ctx.drawImage(frameJump, imageX, imageY)
			}
			else{
				ctx.drawImage(frameBackJump, imageX, imageY)
			}
		}
		else {
			if (frame == 1){
				if (back == false){
					ctx.drawImage(frame0, imageX, imageY)
				}
				else{
					ctx.drawImage(frameBack0, imageX, imageY)
				}
			}
			else{
				if (back == false){
					ctx.drawImage(frame1, imageX, imageY)
				}
				else{
					ctx.drawImage(frameBack1, imageX, imageY)
				}
			}
		}
	};

	// Draw player
	var drawAsRemote = function(ctx, localPlayer) {
		var imageX = playerXposition-(localPlayer.getX()-x)-frame0.width/2,
			imageY = y-frame0.height/2;

		if(this.objectId && this.objectId.charAt(0) != "P") {
			objectById(this.objectId).drawOn(ctx, imageX, imageY);
		}

		if(this.dead == true){
			ctx.drawImage(frameDead, imageX, imageY)
			return;
		}

		if (jumpTicks < jumpTime){
			if (back == false){
				ctx.drawImage(frameJump, imageX, imageY)
			}
			else{
				ctx.drawImage(frameBackJump, imageX, imageY)
			}
		}
		else {
			if (frame == 1){
				if (back == false){
					ctx.drawImage(frame0, imageX, imageY)
				}
				else{
					ctx.drawImage(frameBack0, imageX, imageY)
				}
			}
			else{
				if (back == false){
					ctx.drawImage(frame1, imageX, imageY)
				}
				else{
					ctx.drawImage(frameBack1, imageX, imageY)
				}
			}
		}
	};

	var drawDead = function(ctx){
		var imageX = playerXposition-frameDead.width/2,
			imageY = y-frameDead.height/2;
		
		ctx.drawImage(frameDead, imageX, imageY);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,
		draw: draw,
		back: back,
		drawDead: drawDead,
		drawAsRemote: drawAsRemote,
		height: height,
		width: width,
		objectId: objectId,
		playerXposition: playerXposition,
		dead: dead,
		id: id
	}
};