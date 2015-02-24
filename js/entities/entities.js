// TODO
game.PlayerEntity = me.Entity.extend({
	//initializes the function 
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x,y, {
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
		//to call player entity
		this.type = "PlayerEntity";
		//the life of our player
		//made the health base equal the global variable
		this.health = game.data.playerHealth;
		//it sets the speed of the player when it moves to the right
		//y location changes
		//it moved down to the player
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//keeps track of which direction your character is going
		this.facing = "right";
		//checks the time for the game
		this.now = new Date().getTime();
		this.lastHit = this.now;
		//states the player is alive 
		this.dead = false;
		this.attack = game.data.playerAttack;
		//stop the player from hitting over and over again
		this.lastAttack = new Date().getTime();
		//
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//adds animation to standing starting position
		this.renderable.addAnimation("idle", [78]);
		//adds animation to walking 
		this.renderable.addAnimation("walk", [117, 118 , 119, 120, 121, 122, 123, 124, 125], 80);
		//animation for character attack
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		//adds animation to non-moving position 
		this.renderable.setCurrentAnimation("idle");

	},
	//updates the function
	//whole set for just the x-axis
	update: function(delta){
		//keeps it up to date
		this.now = new Date().getTime();
		//if statement for health
		//makes the creep kill the character
		if (this.health <= 0){
			//if player is 0 the player dies
			this.dead = true;
		}
		//moves the player right
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//keeps track of which direction your character is going
			this.facing = "right";
			//makes the charcter face to right 
			this.flipX(true);

		}
		//moves the player left
		else if(me.input.isKeyPressed("left")){
				//keeps track of which direction your character is going
				this.facing = "left";
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				this.flipX(false);
		}
			else {
			//for when the right arrow isnt clicked
			this.body.vel.x = 0;
		}
		//set for the y-axis
		//so the player can go right or left and still jump
		//no double jumping
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//makes sound when the player jumps
			me.audio.play("jump");
		}


		if(me.input.isKeyPressed("attack")){
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
		//checks for collisions 
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		//updates the function to true
		this.body.update(delta);
		//updates the animation
		this._super(me.Entity, "update", [delta]);
		return true;

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

	game.PlayerBaseEntity = me.Entity.extend({
		//initializes the function
		init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				//makes the image of the tower appear
				image: "tower",
				//the width of the space created
				width: 100,
				//the height of the space created
				height: 100,
				//width for the tower
				spritewidth: "100",
				//height for the tower
				spriteheight: "100",
				//function of the shape of the screen 
				getShape: function(){
					//the position of the enemy base
					return(new me.Rect(0, 0, 100, 70)).toPolygon();
				}

			}]);
			//variables
			//tower has not been destroyed
			this.broken = false;
			this.health = game.data.playerBaseHealth;
			//even if were not on the screen with the tower , it still updates
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			this.type = "PlayerBase";
			//this animation makes the playerbase stay still
			this.renderable.addAnimation("idle", [0]);
			//this one breaks the idle animation
			this.renderable.addAnimation("broken", [1]);
			//this one sets it back to idle 
			this.renderable.setCurrentAnimation("idle");
		},
		//if the health is 0, the character dies
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
				//when the player dies the tower is set on fire
				this.renderable.setCurrentAnimation("broken");
			}
			this.body.update(delta);
			this._super(me.Entity, "update", [delta]);
			return true;
		},
		//losehealth function
		//call damage
		loseHealth: function(damage){
			//makes base lose a lil bit of health everytime it gets attacked
			this.health = this.health - damage;
		},

		onCollision: function(){

		}
	});


	game.EnemyBaseEntity = me.Entity.extend({
		//initializes the function
		init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				//makes the image of the tower appear
				image: "tower",
				//the width of the space created
				width: 100,
				//the height of the space created
				height: 100,
				//width for the tower
				spritewidth: "100",
				//height for the tower
				spriteheight: "100",
				//function of the shape of the screen 
				getShape: function(){
					//the position of the enemy base 
					return(new me.Rect(0, 0, 100, 70)).toPolygon();
				}

			}]);
			//variables
			//tower has not been destroyed
			this.broken = false;
			//made the health base equal the global variable
			this.health = game.data.enemyBaseHealth;
			//even if were not on the screen with the tower , it still updates
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			this.type = "EnemyBaseEntity";
			//this animation makes the playerbase stay still
			this.renderable.addAnimation("idle", [0]);
			//this one breaks the idle animation
			this.renderable.addAnimation("broken", [1]);
			//this one sets it back to idle 
			this.renderable.setCurrentAnimation("idle");
		},
		//if the health is 0, the character dies
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
				//when the player dies the tower is set on fire
				this.renderable.setCurrentAnimation("broken");
			}
			this.body.update(delta);
			this._super(me.Entity, "update", [delta]);
			return true;
		},
		onCollision: function(){

		},

		loseHealth: function(){
			//the player has to attack the tower 10 times before it breaks
			this.health--;
		}
	});

game.EnemyCreep = me.Entity.extend({
	//initializes the function
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//makes the image of the brain monster appear
			image: "creep1",
			//the width of the space created
			width: 32,
			//the height of the space created
			height: 64,
			//width for the brain monster 
			spritewidth: "32",
			//height for the brain monster
			spriteheight: "64",
			//function of the shape of the screen 
			getShape: function(){
				//the posiiton of the brain monster
				//0 , 0 is the origin
				return(new me.Rect(0, 0, 32, 64)).toPolygon();	
			}
		}]);
		//made the health base equal the global variable
		this.health = game.data.enemyCreepHealth;
		//to always update
		this.alwaysUpdate = true;
		//this.attacking lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps track of when our creep last attacked anything
		this.lastAttacking = new Date().getTime();
		//keep track of the last time our creep hit anything
		this.lastHit = new Date().getTime();
		//time we are going to use when we are attacking our playerbase
		this.now = new Date().getTime();

		//a velocity to move him with
		this.body.setVelocity(3, 20);
		this.type = "EnemyCreep";
		//animation for walking
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},
	//losehealth function
	//calls damage parameter
	loseHealth: function(damage){
		//makes base lose a lil bit of health everytime it gets attacked
		this.health = this.health - damage;
	},

	//delta variable that represents time as a parameter for update function
	update: function(delta){
		//console.log(this.health);
		//if the health is 0
		if(this.health <= 0){
			//it removes the creep 
			me.game.world.removeChild(this);
		}

		// it is going t refresh every single time
		this.now = new Date().getTime();
		//moves the creep to the left
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		//handler for collisions
		//to check for collisions with our player
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		//main update calls
		//sets the creep to do whatever we want it to do
		//and is actually updating
		this.body.update(delta);
		//call to super class
		this._super(me.Entity, "update", [delta]);
		return true;
	},
	//a parameter with response
	collideHandler: function(response){
		if(response.b.type==='PlayerBase'){
			this.attacking=true;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x +1;
			//checks that it has been at least 1 second since this creep hit a base
			if((this.now-this.lastHit >=1000)){
				//updates the lastHit timer
				this.lastHit = this.now;
				//makes the player base call its loseHealth function and passes it a
				//damage of 1
				//added the global variable for enemyCreepAttack
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}	
		else if (response.b.type==='PlayerEntity'){
			//get the position of the creep and take away the position of the player
			//check the difference of the two of them
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking=true;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			if(xdif>0){
				//keeps moving the creep to the right to maintain its position
				this.pos.x = this.pos.x +1;
				//this.lastAttacking=this.now;
				this.body.vel.x = 0;
			}
			//checks that it has been at least 1 second since this creep hit something
			if((this.now-this.lastHit >=1000) && xdif>0){
				//updates the lastHit timer
				this.lastHit = this.now;
				//makes the player call its loseHealth function and passes it a
				//damage of 1
				//added the global variable for enemyCreepAttack
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}
	}
});

game.GameManager = Object.extend({
	//initializes the function
	init: function(x, y, settings){
		//the time that we want to use
		this.now = new Date().getTime();
		//keep track of the last time we made a creep happen
		this.lastCreep = new Date().getTime();
		this.paused = false;
		//makes sure it is always updating
		this.alwaysUpdate = true;
	},
	//updates the function
	update: function(){
		//keep track of our timer
		this.now = new Date().getTime();
		//checks if our player is dead
		//we are asking if he is dead 
		//if so we will execute some stuff
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			//adds one gold for a creep kill
			game.data.gold +=1;
			//keeps track of our gold
			console.log("Current gold: " + game.data.gold);
		}
		//keeps track on whether we should be making creeps
		//checks to see if we have a multiple of 10
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//creates a creep
 			//adds the creep to the world
			me.game.world.addChild(creepe, 5);
		}

		return true;
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
