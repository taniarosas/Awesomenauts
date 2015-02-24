game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//x and y placement we want the screen to start with our top left corner and screen
		//call our image
		//-10 is our z layer, it puts the title screen way in the back
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		//binding the key
		//a key to make us go to our play screen
		me.input.bindKey(me.input.KEY.ENTER, "start");
		//add some text
		me.game.world.addChild(new (me.Renderable.extend({
			//initialize function 
			init: function(){
				//make a call to our super class
				//passing a renderable and basic info
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				//initialization of text
				this.font = new me.Font("Arial", 46, "white");

			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				this.font.draw(renderer.getContext(), "Awesomenauts!", 450, 130);
				//the button to start
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));
		//an event handler
		//we need event handler to listen for someone pressing the enter button
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			if(action === "start"){
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//unbinding a key before we start
		//not make us start our game over if button is pushed again
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		//telling our game to not listen to a button
		//unsubscribing from the handler
		me.event.unsubscribe(this.handler);
	}
});
