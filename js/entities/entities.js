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
		//it sets the speed of the player when it moves to the right
		//y location changes
		//it moved down to the platform
		this.body.setVelocity(5, 20);

		this.facing = "right";

		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
		//
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//adds animation to standing starting position
		this.renderable.addAnimation("idle", [78]);
		//adds animation to walking 
		this.renderable.addAnimation("walk", [117, 118 , 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		//adds animation to non-moving position 
		this.renderable.setCurrentAnimation("idle");

	},
	//updates the function
	update: function(delta){
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;

			this.facing = "right";
			//makes the charcter face to right 
			this.flipX(true);

		}
		else if(me.input.isKeyPressed("left")){
				this.facing = "left";
				this.body.vel.x -= this.body.accel.x * me.timer.tick;
				this.flipX(false);
		}
			else {
			//for when the righ arrow isnt clicked
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}


		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log(!this.renderable.isCurrentAnimation("attack"));
				this.renderable.setCurrentAnimation("attack", "idle");
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

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		//updates the function to true
		this.body.update(delta);
		//updates the animation
		this._super(me.Entity, "update", [delta]);
		return true;

	},

	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
			if(ydif<-40 && xdif<70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1
			}

			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}
			else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
				console.log("tower Hit");
				this.lastHit = this.now;
				response.b.loseHealth();
			}
		}
	}

});

	game.PlayerBaseEntity = me.Entity.extend({
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
				getShape: function(){
					return(new me.Rect(0, 0, 100, 70)).toPolygon();
				}

			}]);
			//variables
			//tower has not been destroyed
			this.broken = false;
			this.health = 10;
			//even if were not on the screen with the tower , it still updates
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			this.type = "PlayerBaseEntity";
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

		}
	});


	game.EnemyBaseEntity = me.Entity.extend({
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
				getShape: function(){
					return(new me.Rect(0, 0, 100, 70)).toPolygon();
				}

			}]);
			//variables
			//tower has not been destroyed
			this.broken = false;
			this.health = 10;
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
			this.health--;
		}
	});

