
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		option1: "",
		option2: "",
		//made the following global varibales
		enemyBaseHealth: 1,
		playerBaseHealth: 1,
		enemyCreepHealth: 5,
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
		spearTimer: 15,
		player: "",
		//number of experience points the character has currently acquired from wining or losing games
		exp: 0,
		//acquired during each game that they can use to buy power ups that will disappear
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		skill1: 0,
		skill2: 0,
		skill3: 0,
		//keep track of how they have spent their experience
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: "",
		pausePos: "",
		buyscreen: "",
		buytext: "",
		minimap: "",
		miniPlayer: ""
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

	
	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;

	//console.log(game.data.exp);
	//console.log(game.data.exp1);
	//console.log(game.data.exp2);
	//console.log(game.data.exp3);
	//console.log(game.data.exp4);

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
		//registers the enemy hero
		me.pool.register("EnemyHero", game.EnemyHero);
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
		//registers the hero death maganger
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		//registers the experience manager
		me.pool.register("ExperienceManager", game.ExperienceManager);
		//registers the spend gold
		me.pool.register("SpendGold", game.SpendGold);
		//registers the spear throw
		me.pool.register("spear", game.SpearThrow, true);
		//registers the mini map
		me.pool.register("minimap", game.MiniMap, true);
		//registers the mini player location
		me.pool.register("miniplayer", game.MiniPlayerLocation, true);

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());

		// Start the game.
		//makes the title screen run first
		me.state.change(me.state.MENU);
	}
};
