game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//x and y placement we want the screen to start with our top left corner and screen
		//call our image
		//-10 is our z layer, it puts the title screen way in the back
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
		
		//add some text
		me.game.world.addChild(new (me.Renderable.extend({
			//initialize function 
			init: function(){
				//make a call to our super class
				//passing a renderable and basic info
				//changed x, y , width and height
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				//initialization of text
				this.font = new me.Font("Arial", 46, "white");
			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				//changed the position of start new game
				this.font.draw(renderer.getContext(), "SPEND", this.pos.x, this.pos.y);
			}
		})));
},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});
