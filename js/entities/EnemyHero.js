game.EnemyHero = me.Entity.extend({
	//initializes the function
	init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				//makes the hero image appear
				image: "hero",
				//width of the hero
				width: 64,
				//height of the hero
				height: 64,
				//sprite width of the hero
				spritewidth: "64",
				//sprite height of the hero
				spriteheight: "64",

				getShape: function(){
					return (new me.Rect(0, 0, 64, 64)).toPolygon();
			 }
		}]);
			//sets the velocity 
			this.body.setVelocity(3, 19);
			this.type = "EnemyHero";
			this.renderable.addAnimation("walk", [144, 145, 146, 147, 148, 149, 150, 151, 152], 80);
			//sets the hero to walk
			this.renderable.setCurrentAnimation("walk");
	},
	update: function(delta){
		//it moves to the left
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.flipX(true);
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	}

});