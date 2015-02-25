// TODO
game.PlayerEntity = me.Entity.extend({
	//initializes the function 
	init: function(x, y, settings){
		this.setSuper();
		this.setPlayerTimers();
		this.setAttributes();
		this.setFlags();
		//to call player entity
		this.type = "PlayerEntity";
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		this.addAnimation();
		//adds animation to non-moving position 
		this.renderable.setCurrentAnimation("idle");
	},
	setSuper: function(){
		this._super(me.Entity, 'init', [x, y, {
			//makes the image of the player appear
			image: "player",
			//the width of the space created
			width: 64,
			//the height of the space created
			height: 64,
			//height for the player
			spriteheight: "64",
			//width for the player
			spritewidth: "64",
			//function of the shape of the screen 
			getShape: function(){
				//creates a rectangle of 64 by 64 so the player can go inside
				//0 , 0 is the origin
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},
	setPlayerTimers: function(){
		//checks the time for the game
		this.now = new Date().getTime();
		this.lastHit = this.now;
		//stop the player from hitting over and over again
		this.lastAttack = new Date().getTime();
	},
	setAttributes: function(){
		//the life of our player
		//made the health base equal the global variable
		this.health = game.data.playerHealth;
		//it sets the speed of the player when it moves to the right
		//y location changes
		//it moved down to the player
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},
	setFlags: function(){
		//keeps track of which direction your character is going
		this.facing = "right";
		//states the player is alive 
		this.dead = false;
		this.attacking = false;
	},
	addAnimation: function(){
		//adds animation to standing starting position
		this.renderable.addAnimation("idle", [78]);
		//adds animation to walking 
		this.renderable.addAnimation("walk", [117, 118 , 119, 120, 121, 122, 123, 124, 125], 80);
		//animation for character attack
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},
	//updates the function
	//whole set for just the x-axis
	update: function(delta){
		//keeps it up to date
		this.now = new Date().getTime();
		this.dead = checkIfDead();
		this.checkKeyPressesAndMove();
		this.setAnimation();
		//checks for collisions 
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//updates the function to true
		this.body.update(delta);
		//updates the animation
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	checkIfDead: function(){
		//if statement for health
		//makes the creep kill the character
		if (this.health <= 0){
			//if player is 0 the player dies
			return = true;
		}
		return false;
	},
	checkKeyPressesAndMove: function(){
		//moves the player right
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}
		//moves the player left
		else if(me.input.isKeyPressed("left")){
			this.moveLeft();		
		}
			else {
			//for when the right arrow isnt clicked
			this.body.vel.x = 0;
		}
		//set for the y-axis
		//so the player can go right or left and still jump
		//no double jumping
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.jump();
		}
		this.attacking = me.input.isKeyPressed("attack");
	},
	moveRight: function(){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//keeps track of which direction your character is going
			this.facing = "right";
			//makes the charcter face to right 
			this.flipX(true);
	},
	moveLeft: function(){
		//keeps track of which direction your character is going
		this.facing = "left";
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.flipX(false);
	},
	jump: function(){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//makes sound when the player jumps
			me.audio.play("jump");
		},
	setAnimation: function(){
		if(this.attacking){
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log(!this.renderable.isCurrentAnimation("attack"));
				//sets the current animation to attck and once that is over goes back to idle animation 
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start this sequence we begin from the first animation not whenever we left off when we switched to another animation
				this.renderable.setAnimationFrame();
			}
		}
		//if the button is pushed then it will walk but it not it will execute the else code
		else if(this.body.vel.x !==0 && !this.renderable.isCurrentAnimation("attack")){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else if(!this.renderable.isCurrentAnimation("attack")){
		//if not, make it stand still
		this.renderable.setCurrentAnimation("idle");
	}
},
	//function that is passing the damage parameter
	loseHealth: function(damage){
		this.health = this.health - damage;
		//print out what the haelth is of the player
		console.log(this.health);
	},
	//new function that is passing the parameter response 
	//holds info about collision
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			//the y difference between the players y position and the base y position
			//keep track of the position of both objects 
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			//makes the player jump on top of the tower
			if(ydif<-40 && xdif<70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1
			}
			//stops the player on the left side of the tower 
			//prevent from over lapping
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				//stop the player from moving
				this.body.vel.x = 0;
				//move player backwards 
				//this.pos.x = this.pos.x -1;
			}
			//stops the player on the right side of the tower
			//prevent from over lapping
			else if(xdif<70 && this.facing==='left' && xdif>0){
				//stop the player from moving
				this.body.vel.x = 0;
				//moves player forward
				//this.pos.x = this.pos.x +1;
			}
			//added the gloabl variable playerAttackTimer
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//check when it is called
				console.log("tower Hit");
				this.lastHit = this.now;
				//call the losehealth function
				response.b.loseHealth(game.data.playerAttack);
			}
		}
		//if the player collides with the enemy creep, this code will execute
		else if(response.b.type ==='EnemyCreep'){
			//the y difference between the players y position and the creep y position
			//keep track of the position of both objects 
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if (xdif>0){
				//moves it to the right
				//this.pos.x = this.pos.x +1;
				//when the player and creep are facing each other, the player can attack
				if(this.facing==="left"){
					//sets the velocity to 0
					this.body.vel.x = 0;
				}
			}
			else{
				//moves it to the left
				//this.pos.x = this.pos.x -1;
				//when the player and creep are facing each other, the player can attack
				if(this.facing==="right"){
					//sets the velocity to 0
					this.body.vel.x = 0;
				}
			}
			//added the global vaiable playerAttackTimer
			if(this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
					&& (Math.abs(ydif) <=40) && 
					(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
					){
				this.lastHit = this.now;
				//if the creeps health is less than our attack, execute code in if statement
				if(response.b.health <= game.data.playerAttack){
					//adds one gold for a creep kill
					game.data.gold += 1;
					//keeps track of our gold
					console.log("Current gold: " + game.data.gold);
				}
				//calls the loseHealth function from the creep
				response.b.loseHealth(game.data.playerAttack);
			}
		}
	}

});

game.Player2 = me.Entity.extend({
// sets properties of enemy player 
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "Player2",
			width: 100,
			height: 85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return(new me.Rect(0, 0 ,100, 85)).toPolygon();
			}
		}]);

		// sets health of player starting at 10
		this.health = game.data.playerHealth; 
		// always keeps the enemy player updated
		this.alwaysUpdate = true;

		// this.attacking lets us know if thge enemy is currently attacking
		this.attacking = false;

		// keeps track of when our creep last attacked anything
		this.lastAttacking = new Date().getTime();

		// keeps track of the ;ast time our creep hit anything
		this.lastHit = new Date().getTime();

		// timer
		this.now = new Date().getTime();

		// sets were player is located 
		this.body.setVelocity(3, 20);

		// sets type of player
		this.type = "Player2";

		// sets the animation of enemy player 
		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta){
		// Timer set to check collisons refreshes every single time
		this.now = new Date().getTime();

		// makes creeps move 
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.flipX(true);
		
		// checks of creep is colliding with player
		// me.collison.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	collideHandler: function(response){
		if (response.b.type === 'EnemyBaseEntity') {
			this.attacking = true;
			// this.lastAttacking = this.now;
			this.body.vel.x = 0;
			// keeps creep moving to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			// checks that it has been at least 1 second since this creep hit a base
			if ((this.now-this.lastHit >= 1000)) {
				// updates the lasthit timer
				this.lastHit = this.now;
				// makes the player base call its loseHealth function and passes at a damge of 1
				response.b.loseHealth(1);
			}
		}
		else if (response.b.type === 'EnemyCreep') {
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking = true;

			// this.lastAttacking = this.now;

			if (xdif>0) {
			// Kepps moving the creep to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}
			// checks that it has been less then 1 second since it hit somehting
			if ((this.now-this.lastHit >= 1000) && xdif>0) {
				// updates the last hit time
				this.lastHit = this.now;
				// makes the player call its lose health function and passes it as a damage of one 
				response.b.loseHealth(1); 
			}
		}
	}
	

});
