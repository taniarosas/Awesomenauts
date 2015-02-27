
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		//made the following global varibales
		EnemyBaseHealth: 10,
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		//orcBaseDamage: 10,
		//orcBaseSpeed: 3,
		//orcBaseDefence: 0,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameTimerManager: "",
		heroDeathManager: "",
		player: "",
		//number of experience points the character has currently acquired from wining or losing games
		exp: 0,
		//acquired during each game that they can use to buy power ups that will disappear
		gold: 0,
		//keep track of how they have spent their experience
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	//changed the height and width to fit the screen 
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		//register player entity
		me.pool.register("player", game.PlayerEntity, true);
		//registered the 2nd player 
		me.pool.register("Player2", game.Player2, true);
		//registers the playerbase
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		//registers the enemy base
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		//registers the brain monster
		//several of them
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		//registers the game manager
		//only one of them
		me.pool.register("GameTimerManager", game.GameTimerManager);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		//makes the title screen run first
		me.state.change(me.state.MENU);
	}
};
