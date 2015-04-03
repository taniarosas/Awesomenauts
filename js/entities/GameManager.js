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
		}
		//you gain no points 
		else if(game.data.win === false && !this.gameover){
			//makes the game be over
			this.gameOver(false);
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
		this.gameover = true;
		//saves the experience 
		me.save.exp = game.data.exp;
		console.log("experience" + me.save.exp);
		me.save.exp2 = 4;
	}
});
