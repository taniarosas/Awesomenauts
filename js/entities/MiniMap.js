game.MiniMap = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "minimap", 
			width: 562,
			height: 314,
			spritewidth: "562",
			spriteheight: "314",
			getShape: function() {
				return (new me.Rect(0, 0, 279, 155)).toPolygon();
			}
		}]);
		this.floating = true;
	}
});