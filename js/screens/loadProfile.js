game.LoadProfile = me.ScreenObject.extend({
	/**	
	* action to perform on state change
	*/
	onResetEvent: function() {
		//adds and loads the title image	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
		//makes the input button visible 
		document.getElementById("input").style.visibility = "visible";
		//makes the load button visible 
		document.getElementById("load").style.visibility = "visible";
		//unbinds key B
		me.input.unbindKey(me.input.KEY.B);
		//unbinds key Q
		me.input.unbindKey(me.input.KEY.Q);
		//unbinds key E
		me.input.unbindKey(me.input.KEY.E);
		//unbinds key W
		me.input.unbindKey(me.input.KEY.W);
		//unbinds key A
		me.input.unbindKey(me.input.KEY.A);
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//changed the x, y, width and height
				this._super(me.Renderable, "init", [10, 10, 300, 50])
				//makes th efont arial and font size 46 and the color white.
				this.font = new me.Font("Arial", 26, "white");
			},
			draw: function(renderer){
				//writes "Awesomenauts" at those specific coordinates
				//changed the position of "Start A New Game"
				this.font.draw(renderer.getContext(), "Enter Your Username And Password", this.pos.x, this.pos.y);
				}
		})));
	
},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//hids input button
		document.getElementById("input").style.visibility = "hidden";
		//hids load button
		document.getElementById("load").style.visibility = "hidden";
		}
});
