game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		//telling what to look at as far as maps
		me.levelDirector.loadLevel("level01");
		//we are going to use 0 & 420 to pass our parameters
		this.resetPlayer(0, 420);
		//it is not going to be visible
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		//it is not going to be visible
		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(experienceManager, 0);
		
		//moves the player to the right once the right arrow is pushed
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//moves the player to the left once the left arrow is pushed
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//makes the player jump once the space button is pushed
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		//makes the player attack the base once you press A in the keyboard
		me.input.bindKey(me.input.KEY.A, "attack");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//plays background music
		me.audio.playTrack("marley");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
	//saving our player in a global variable
	//remove our player and reset him on the field
	//takes the parameters x and y which it tells us where to put the player on the screen
	resetPlayer: function(x, y){
		//set a value to the variable player
		game.data.player = me.pool.pull("player", x, y, {});
		//its sets the hieght of where they player appears  on the screen
		me.game.world.addChild(game.data.player, 5);
	}
});
