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
			game.data.gold +=1;
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
			//creates a creep
 			//adds the creep to the world
			me.game.world.addChild(creepe2, 5);
		}
	}
});
game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		//makes sure it is always updating
		this.alwaysUpdate = true;
	},
	update: function(){
		//checks if our player is dead
		//we are asking if he is dead 
		//if so we will execute some stuff
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
		//makes the code run 
		return true;
	}
});
game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		//makes sure it is always updating
		this.alwaysUpdate = true;
		//sets gameover to false
		this.gameOver = false;
	},
	update: function(){
		//if you win the game is not over
		if(game.data.win === true && !this.gameOver){
			//sets the gameOver to true
			this.gameOver(true);
		}
		//you gain no points 
		else if(game.data.win === false && !this.gameOver){
			//makes the game be over
			this.gameOver(false);
		}
		//makes the code run
		return true;
	},
	//made a gameOver function
	gameOver: function(win){
		//if you win,
		if(win){
			//adds ten points to the experience variable
			game.data.exp += 10;
		}
		//if else you gain 1 point
		else{
			//adds 1 point to the experience variable
			game.data.exp += 1;
		}
		//makes the game be over
		this.gameOver = true;
		//saves the experience 
		me.save.exp = game.data.exp;
	}
});