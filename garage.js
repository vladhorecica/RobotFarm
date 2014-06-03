goog.provide('robotfarm.Garage');
goog.require('lime.Sprite');

/**
 * Garage elements
 *
 * @param gameObj
 * @param playerObj
 */
robotfarm.Garage = function(gameObj, playerObj) {

	goog.base(this);
	this.setAnchorPoint(0, 0);
	this.setSize(gameObj.tile_size,gameObj.tile_size);
	this.setFill(BASE_IMAGE);

	this.state = this.EMPTY;

	var land = this;
	goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
		e.event.stopPropagation();
		/* Prepare land for construction */
		if(land.state == land.EMPTY && playerObj.money >= gameObj.costPlowing) {
			/* Change the state and the image of the current land object*/
			land.setFill(PLOWED_IMAGE);
			land.state = land.PLOWED;

			/* Update player's money */
			playerObj.money -= gameObj.costPlowing;
			gameObj.updateMoney();
		}
		/* Start the construction of the wanted object */
		else if(land.state == land.PLOWED && playerObj.money >= gameObj.crops[playerObj.currentCrop].getCost()) {
			land.setFill(GROWING_IMAGE);
			land.state = land.GROWING;

			/* Update object type and time till it's ready and expired */
			land.crop = playerObj.currentCrop;
			land.ripeTime = gameObj.crops[playerObj.currentCrop].getTimeRipe() * 1000;
			land.deathTime = gameObj.crops[playerObj.currentCrop].getTimeDeath() * 1000;

			playerObj.money -= gameObj.crops[playerObj.currentCrop].getCost();
			gameObj.updateMoney();
		}
		/* Object is ready to be collected */
		else if(land.state == land.READY ) {
			land.setFill(BASE_IMAGE);
			land.state = land.EMPTY;

			playerObj.money += gameObj.crops[land.crop].getRevenue();
			playerObj.robotArmor += gameObj.crops[land.crop].getArmor();
			playerObj.robotAttack1 += gameObj.crops[land.crop].getAttack1();
			playerObj.robotAttack2 += gameObj.crops[land.crop].getAttack2();
			gameObj.updateMoney();
		}
	});

	/* Check the state of the plant */
	lime.scheduleManager.scheduleWithDelay(function() {
		/* Object is constructing */
		if(this.state == this.GROWING) {
			if(this.ripeTime <= 0) {
				this.state = this.READY;
				this.setFill('images/'+gameObj.crops[this.crop].getImage());
			}
			else {
				this.ripeTime -= gameObj.down_time;
			}
		}
		/* Object is ready */
		else if(this.state == this.READY) {
			if(this.deathTime <= 0) {
				this.state = this.EMPTY;
				this.setFill(BASE_IMAGE);
			}
			else {
				this.deathTime -= gameObj.down_time;
			}
		}
	}, this, gameObj.down_time);
}

goog.inherits(robotfarm.Garage, lime.Sprite);
