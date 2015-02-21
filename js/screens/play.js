game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		//telling what to look at as far as maps
		me.levelDirector.loadLevel("level01");
		this.resetPlayer(0, 420);
		//it is not going to be visible
		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		me.game.world.addChild(gamemanager, 0);
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

	resetPlayer: function(x, y){

		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 5);
	}
});
