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
		//adds animation to standing starting position
		this.renderable.addAnimation("idle", [78]);
		//adds animation to walking 
		this.renderable.addAnimation("walk", [117, 118 , 119, 120, 121, 122, 123, 124, 125], 80);
		//adds animation to non-moving position 
		this.renderable.setCurrentAnimation("idle");

	},
	//updates the function
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//makes the charcter face to right 
			this.flipX(true);

		}
		else {
			//for when the righ arrow isnt clicked
			this.body.vel.x = 0;
		}

		//if the button is pushed then it will walk but it not it will execute the else code
		if(this.body.vel.x !==0 ){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else{
		//if not, make it stand still
		this.renderable.setCurrentAnimation("idle");
	}

		//updates the function to true
		this.body.update(delta);
		//updates the animation
		this._super(me.Entity, "update", [delta]);
		return true;

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
					return(new me.Rect(0, 0, 100, 100)).toPolygon();
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
		},
		//if the health is 0, the character dies
		update:function(){
			if(this.health<=0){
				this.broken = true;
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
					return(new me.Rect(0, 0, 100, 100)).toPolygon();
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
		},
		//if the health is 0, the character dies
		update:function(){
			if(this.health<=0){
				this.broken = true;
			}
			this.body.update(delta);
			this._super(me.Entity, "update", [delta]);
			return true;
		},
		onCollision: function(){

		}
	});

