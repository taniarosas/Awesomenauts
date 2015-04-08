game.MiniMap = me.Entity.extend({
	//initializes the function
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			//loads the mini map image
			image: "minimap", 
			//width for the image
			width: 562,
			//height for the image
			height: 314,
			//sprite witdh for the image
			spritewidth: "562",
			//sprite height for the image
			spriteheight: "314",
			getShape: function() {
				return (new me.Rect(0, 0, 279, 155)).toPolygon();
			}
		}]);
		this.floating = true;
	}
});