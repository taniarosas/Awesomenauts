game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 //added the background images to load on the map.
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 //added the meta tile images to load on the map.
	 {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	 //added the player image to load on the map
	 {name: "player", type:"image", src: "data/img/orcSpear.png"},
	 //added the tower image to load on the map
	 {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	 //added the brain monster image to load on the map
	 {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	 //added the second character to load on map
	 {name: "Player2", type:"image", src: "data/img/gloop.png"},
	 //added the title image to load on the map
	 {name: "title-screen", type:"image", src: "data/img/title.png"},
	 //added the creep image to load on the map
	 {name: "creep3", type:"image", src: "data/img/elf.png"},
	 //added the spear image to load on the map
	 {name: "spear", type:"image", src: "data/img/spear.png"},
	 //added the load image to load on the map
	 {name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
	 //added the hero image to load on the map
	 {name: "hero", type:"image", src: "data/img/skeletonDagger.png"},
	 //added the spend image to load on the map
	 {name: "gold-screen", type:"image", src: "data/img/spend.png"},
	 //added the load image to load on the map
	 {name: "load-screen", type:"image", src: "data/img/loadpic.png"},
	 //added the new screen image to load on the map
	 {name: "new-screen", type:"image", src: "data/img/newpic.png"},
	 //added the mini map image to load on the map
	 {name: "minimap", type:"image", src: "data/img/miniMap.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	 //added the map to coonect it to the localhost
 	 {name: "level01", type: "tmx", src: "data/map/test.tmx"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	 //loads the background song
	 {name: "marley", type: "audio", src: "data/bgm/"},
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	 //loads the sound effect
	 {name: "jump", type: "audio", src: "data/sfx/"}
];
