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

