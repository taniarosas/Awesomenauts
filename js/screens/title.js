game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//x and y placement we want the screen to start with our top left corner and screen
		//call our image
		//-10 is our z layer, it puts the title screen way in the back
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		
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
				//register the pointer to start a new game
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				//changed the position of start new game
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},
			//listens for the mouse
			update: function(dt){
				return true;
			},
			//function to start the new game
			newGame: function(){
				//calls the pointerdown registered input
				me.input.releasePointerEvent('pointerdown', this);
				//removes the past experience points and saves the new one
				me.save.remove('exp');
				//removes the past experience points and saves the new one
				me.save.remove('exp1');
				//removes the past experience points and saves the new one
				me.save.remove('exp2');
				//removes the past experience points and saves the new one
				me.save.remove('exp3');
				//removes the past experience points and saves the new one
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);
			}
		})));


		//add some text
		me.game.world.addChild(new (me.Renderable.extend({
			//initialize function 
			init: function(){
				//make a call to our super class
				//passing a renderable and basic info
				//changed x, y , width and height
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				//initialization of text
				this.font = new me.Font("Arial", 46, "white");
				//register the pointer to start a new game
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				//changed the position of start new game
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},
			//listens for the mouse
			update: function(dt){
				return true;
			},
			//function to start the new game
			newGame: function(){
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;
				//calls the pointerdown registered input
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.SPENDEXP);
			}
		})));
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});
