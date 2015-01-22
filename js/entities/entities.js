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
		this.body.setVelocity(5,0);
	},
	//updates the function
	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else {
			//for when the righ arrow isnt clicked
			this.body.vel.x = 0;
		}
		//updates the function to true
		this.body.update(delta);
		return true;

	}
});