game.GameTimerManager = Object.extend({
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
		this.goldTimerCheck();
		this.creepTimerCheck();
		
		return true;
	},
	goldTimerCheck: function(){
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			//adds one gold for a creep kill
			game.data.gold += (game.data.exp1 + 1);
			//keeps track of our gold
			console.log("Current gold: " + game.data.gold);
		}
	},
	creepTimerCheck: function(){
		//keeps track on whether we should be making creeps
		//checks to see if we have a multiple of 10
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			//creates a creep
 			//adds the creep to the world
			me.game.world.addChild(creepe, 5);
			var creepe2 = me.pool.pull("Player2", 200, 0, {});
			me.game.world.addChild(creepe2, 5);
			var creepe3 = me.pool.pull("EnemyHero", 1000, 100, {});
			//creates a creep
 			//adds the creep to the world
			me.game.world.addChild(creepe3, 5);
		}
	}
});