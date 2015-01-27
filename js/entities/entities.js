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

		this.renderable.addAnimation("idle", [78]);

		this.renderable.addAnimation("walk", [117, 118 , 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");

	},
	//updates the function
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);

		}
		else {
			//for when the righ arrow isnt clicked
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !==0 ){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else{
		this.renderable.setCurrentAnimation("idle");
	}

		//updates the function to true
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;

	}
});