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
	this.setSize(gameObj.item_size,gameObj.item_size);
	this.setFill(BASE_IMAGE);

	this.state = this.EMPTY;

	var land = this;
	goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
		e.event.stopPropagation();
		/* Prepare land for construction */
		if(land.state == land.EMPTY && playerObj.money >= gameObj.costPreparation) {
			/* Change the state and the image of the current land object*/
			land.setFill(PREPARED_IMAGE);
			land.state = land.PREPARED;

			/* Update player's money */
			playerObj.money -= gameObj.costPreparation;
			gameObj.updateMoney();
		}
		/* Start the construction of the wanted object */
		else if(land.state == land.PREPARED && playerObj.money >= gameObj.pieces[playerObj.currentPiece].getCost()) {
			land.setFill(CONSTRUCTING_IMAGE);
			land.state = land.CONSTRUCTING;

			/* Update object type and time till it's ready and expired */
			land.piece = playerObj.currentPiece;
			land.ripeTime = gameObj.pieces[playerObj.currentPiece].getTimeReady() * 1000;
			land.deathTime = gameObj.pieces[playerObj.currentPiece].getTimeDeath() * 1000;

			playerObj.money -= gameObj.pieces[playerObj.currentPiece].getCost();
			gameObj.updateMoney();
		}
		/* Object is ready to be collected */
		else if(land.state == land.READY ) {
			land.setFill(BASE_IMAGE);
			land.state = land.EMPTY;

			playerObj.money += gameObj.pieces[land.piece].getRevenue();
			playerObj.robotArmor += gameObj.pieces[land.piece].getArmor();
			playerObj.robotAttack1 += gameObj.pieces[land.piece].getAttack1();
			playerObj.robotAttack2 += gameObj.pieces[land.piece].getAttack2();
			gameObj.updateMoney();
		}
	});

	/* Check the state of the item */
	lime.scheduleManager.scheduleWithDelay(function() {
		/* Object is constructing */
		if(this.state == this.CONSTRUCTING) {
			if(this.ripeTime <= 0) {
				this.state = this.READY;
				this.setFill('images/'+gameObj.pieces[this.piece].getImage());
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
