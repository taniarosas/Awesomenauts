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
				//if the base breaks first you lose
				game.data.win = false;
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
