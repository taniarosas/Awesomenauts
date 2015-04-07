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
			me.game.world.removeChild(game.data.miniPlayer);
			me.state.current().resetPlayer(10, 0);
		}
		//makes the code run 
		return true;
	}
});