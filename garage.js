goog.provide('robotfarm.Garage');
goog.require('lime.Sprite');

/**
 * Garage elements
 *
 * @param {} gameObj
 */
robotfarm.Garage = function(gameObj, playerObj) {

	goog.base(this);
	this.setAnchorPoint(0, 0);
	this.setSize(gameObj.tile_size,gameObj.tile_size);
	this.setFill('images/base_tile.png');

	this.state = this.EMPTY;

	//user input
	var land = this;
	goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
		e.event.stopPropagation();
		if(land.state == land.EMPTY && playerObj.money >= gameObj.costPlowing) {
			//plow land
			land.setFill('images/plowed.png')
			land.state = land.PLOWED;

			//update player money
			playerObj.money -= gameObj.costPlowing;
			gameObj.updateMoney();
		}
		else if(land.state == land.PLOWED && playerObj.money >= gameObj.crops[playerObj.currentCrop].cost) {
			//plant
			land.setFill('images/growing.png');
			land.state = land.GROWING;

			//store crop and left time for it to be ready and to die
			land.crop = playerObj.currentCrop;
			land.ripeTime = gameObj.crops[playerObj.currentCrop].time_to_ripe * 1000;
			land.deathTime = gameObj.crops[playerObj.currentCrop].time_to_death * 1000;

			//update player money
			playerObj.money -= gameObj.crops[playerObj.currentCrop].cost;
			gameObj.updateMoney();
		}
		else if(land.state == land.READY ) {
			//harvest
			land.setFill('images/base_tile.png');
			land.state = land.EMPTY;

			//update player money
			playerObj.money += gameObj.crops[land.crop].revenue;
			gameObj.updateMoney();
		}
	});

	//growing plants
	dt = 1000;
	lime.scheduleManager.scheduleWithDelay(function() {
		if(this.state == this.GROWING) {
			if(this.ripeTime <= 0) {
				this.state = this.READY;
				this.setFill('images/'+gameObj.crops[this.crop].image);
			}
			else {
				this.ripeTime -= dt;
			}
		}
		else if(this.state == this.READY) {
			if(this.deathTime <= 0) {
				this.state = this.EMPTY;
				this.setFill('images/base_tile.png');
			}
			else {
				this.deathTime -= dt;
			}
		}
	}, this, dt);
}

goog.inherits(robotfarm.Garage, lime.Sprite);

//states
robotfarm.Garage.prototype.EMPTY = 0;
robotfarm.Garage.prototype.PLOWED = 1;
robotfarm.Garage.prototype.GROWING = 2;
robotfarm.Garage.prototype.READY = 3;