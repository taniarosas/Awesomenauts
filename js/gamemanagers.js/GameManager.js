game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		//makes sure it is always updating
		this.alwaysUpdate = true;
		//sets gameover to false
		this.gameover = false;
	},
	update: function(){
		//if you win the game is not over
		if(game.data.win === true && !this.gameover){
			//sets the gameOver to true
			this.gameOver(true);
			alert("YOU WIN");
		}
		//you gain no points 
		else if(game.data.win === false && !this.gameover){
			//makes the game be over
			this.gameOver(false);
			alert("YOU LOSE")
		}
		//makes the code run
		return true;
	},
	//made a gameOver function
	gameOver: function(win){
		//if you win,
		if(win){
			//adds ten points to the experience variable
			game.data.exp += 10;
		}
		//if else you gain 1 point
		else{
			//adds 1 point to the experience variable
			game.data.exp += 1;
		}
		//makes the game be over
		game.gameover = true;
		//saves the experience 
		me.save.exp = game.data.exp;
		//console.log("experience" + me.save.exp);
		//me.save.exp2 = 4;

			$.ajax({
				type: "POST",
				url: "php/controller/save-user.php",
				data: {
					exp:game.data.exp,
                    exp1:game.data.exp1,
                    exp2:game.data.exp2,
                    exp3:game.data.exp3,
                    exp4:game.data.exp4,
				},
				dataType: "text"
			})
			.success(function(response) {
				if(response==="true") {
					me.state.change(me.state.MENU);
				}else{
					alert(response);
				}
			})
			.fail(function(response) {
				alert("Fail");
			});
	}
});