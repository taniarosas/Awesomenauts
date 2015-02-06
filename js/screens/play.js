game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		//telling what to look at as far as maps
		me.levelDirector.loadLevel("level01");
		//set a value to the variable player
		var player = me.pool.pull("player", 0, 420, {});
		//its sets the hieght of where they player appears  on the screen
		me.game.world.addChild(player, 5);

		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		me.game.world.addChild(gamemanager, 0);
		//moves the player to the right once the right arrow is pushed
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		//makes the player attack the base once you press A in the keyboard
		me.input.bindKey(me.input.KEY.A, "attack");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
