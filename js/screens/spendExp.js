game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//x and y placement we want the screen to start with our top left corner and screen
		//call our image
		//-10 is our z layer, it puts the title screen way in the back
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");
		var exp1cost = ((game.data.exp1 + 1) * 10);
		
		//add some text
		me.game.world.addChild(new (me.Renderable.extend({
			//initialize function 
			init: function(){
				//make a call to our super class
				//passing a renderable and basic info
				//changed x, y , width and height
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//initialization of text
				this.font = new me.Font("Arial", 26, "white");
			},
			//draw whats on the screen 
			//passing whatever our renderer is as its parameter
			draw: function(renderer){
				//coordinates of where we draw
				//changed the position of start new game
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION! CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH", this.pos.x, this.pos.y + 250);
			}
		})));
		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
			if (action === "F1") {
				if(game.data.exp >= exp1cost){
					game.data.exp1 += 1;
					game.data.exp -= exp1cost;
					me.state.change(me.state.PLAY);
				}
				else{
					console.log("not enough experience");
				}
			}
			else if (action === "F2") {

			}
			else if (action === "F3") {

			}
			else if (action === "F4") {

			}
			else if (action === "F5") {
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
	}
});
