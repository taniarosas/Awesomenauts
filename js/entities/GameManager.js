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
		this.gameover = false;
	},
	update: function(){
		//if you win the game is not over
		if(game.data.win === true && !this.gameover){
			//sets the gameOver to true
			this.gameOver(true);
		}
		//you gain no points 
		else if(game.data.win === false && !this.gameover){
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
		this.gameover = true;
		//saves the experience 
		me.save.exp = game.data.exp;
		console.log("experience" + me.save.exp);
		me.save.exp2 = 4;
	}
});
game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		//keep track of the last time we made a creep happen
		this.lastBuy = new Date().getTime();
		this.paused = false;
		//makes sure it is always updating
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
	},
	update: function(){
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}
			else{
				this.stopBuying();
			}
		}
		return true;
	}, 
	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},
	setBuyText: function(){
		//add some text
		game.data.buytext = new (me.Renderable.extend({
			//initialize function 
			init: function(){
				//make a call to our super class
				//passing a renderable and basic info
				//changed x, y , width and height
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				//initialization of text
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				//changed the position of start new game
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT", this.pos.x, this.pos.y);
			}
		}));
		me.game.world.addChild(game.data.buytext, 35);
	},
	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	}
});