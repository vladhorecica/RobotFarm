//set main namespace
goog.provide('robotfarm');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('robotfarm.Garage');


// entrypoint
robotfarm.start = function(){
	Game.setDifficulty(EASY);
	var director = Game.getElement('director');
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);

	// First layer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var difScene = Game.getElement('scene');
	var difLayer = Game.getElement('layer');
	var difArea = Game.getElement('area', NULL, {0:gameObj.width, 1:gameObj.height});
	difLayer.appendChild(difArea);
	difScene.appendChild(difLayer);

	director.replaceScene(difScene);

	// DIFFICULTY MENU
	var difLabel = Game.getElement('label', 'PICK DIFFICULTY', {0:gameObj.width/2, 1:gameObj.height - gameObj.landLayer_h}, 20);
	var easyButton = Game.getElement('difButton', 'EASY', {0:gameObj.landLayer_w/2, 1:gameObj.landLayer_h/2});
	var mediumButton = Game.getElement('difButton', 'MEDIUM', {0:gameObj.landLayer_w/2, 1:gameObj.landLayer_h/2 + 70});
	var hardButton = Game.getElement('difButton', 'HARD', {0:gameObj.landLayer_w/2, 1:gameObj.landLayer_h/2 + 140});
	difLayer.appendChild(difLabel);
	difLayer.appendChild(easyButton);
	difLayer.appendChild(mediumButton);
	difLayer.appendChild(hardButton);
	// END FIRST LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// MAIN LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var gameScene = Game.getElement('scene');
	var landLayer = Game.getElement('layer');
	var controlsLayer = Game.getElement('layer');
	gameScene.appendChild(landLayer);
	gameScene.appendChild(controlsLayer);

	//controls area
	var controlArea = Game.getElement('area', {0:0, 1:gameObj.height-gameObj.controlsLayer_h}, {0:gameObj.controlsLayer_w, 1:gameObj.controlsLayer_h});
	controlArea.setFill('images/control.png');
	var shopButton = Game.getElement('button', 'Shop', RIGHT);
	var inventoryButton = Game.getElement('button', 'Inventory', MIDDLE);
	var moneyLabel = Game.getElement('label', 'Cash $'+playerObj.money, LEFT, 18);
	controlsLayer.appendChild(controlArea);
	controlsLayer.appendChild(shopButton);
	controlsLayer.appendChild(inventoryButton);
	controlsLayer.appendChild(moneyLabel);

	//updating player stats
	gameObj.updateMoney = function() {
		moneyLabel.setText('Cash $'+playerObj.money);
		attackLabel.setText('ATTACK: '+ playerObj.robotAttack1 + '-' + playerObj.robotAttack2);
		armorLabel.setText('ARMOR: '+ playerObj.robotArmor);
	};

	//create land elements
	Game.createLand(landLayer);
	// END MAIN LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// INVENTORY LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// inventory
	var invScene = Game.getElement('scene');
	var invLayer = Game.getElement('layer');
	var invBackground = Game.getElement('area', NULL, {0:gameObj.width, 1:gameObj.height});
	invLayer.appendChild(invBackground);
	invScene.appendChild(invLayer);

	var item = Game.getElement('invImage', 'robot_inventory');
	var invCloseButton = Game.getElement('button', 'Back', RIGHT);
	invLayer.appendChild(item);
	invLayer.appendChild(invCloseButton);

	// robot stats
	var attackLabel = Game.getElement('label', 'ATTACK: '+ playerObj.robotAttack1 + '-' + playerObj.robotAttack2, {0:60, 1:gameObj.height-gameObj.controlsLayer_h/2}, 14);
	var armorLabel = Game.getElement('label', 'ARMOR: '+ playerObj.robotArmor, {0:60, 1:gameObj.height-gameObj.controlsLayer_h/2 + 15}, 14);
	invLayer.appendChild(attackLabel);
	invLayer.appendChild(armorLabel);
	// END INVENTORY LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// SHOP LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var shopScene = Game.getElement('scene');
	var shopLayer = Game.getElement('layer');
	var shopBackground = Game.getElement('area', NULL, {0:gameObj.width, 1:gameObj.height});
	var closeButton = Game.getElement('button', 'Back', MIDDLE2);
	var nextButton = Game.getElement('button', '>', RIGHT2);
	nextButton.setSize(20,20);
	shopLayer.appendChild(shopBackground);
	shopScene.appendChild(shopLayer);
	shopLayer.appendChild(closeButton);

	//next shop page
	var nextShopScene = Game.getElement('scene');
	var nextShopLayer = Game.getElement('layer');
	var nextShopBackground = Game.getElement('area', NULL, {0:gameObj.width, 1:gameObj.height});
	var closeButton1 = Game.getElement('button', 'Back', MIDDLE2);
	var prevButton = Game.getElement('button', '<', LEFT2);
	prevButton.setSize(20, 20);
	nextShopLayer.appendChild(nextShopBackground);
	nextShopScene.appendChild(nextShopLayer);
	nextShopLayer.appendChild(closeButton1);
	nextShopLayer.appendChild(prevButton);
	// END SHOP LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// EVENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//launch shop event
	goog.events.listen(shopButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(shopScene);
	});

	//launch next shop page event
	goog.events.listen(nextButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(nextShopScene);
	});
	goog.events.listen(prevButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(shopScene);
	});

	//close shop event
	goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(gameScene);
	});
	goog.events.listen(closeButton1,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(gameScene);
	});

	//close inventory event
	goog.events.listen(invCloseButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(gameScene);
	});

	//launch inventory event
	goog.events.listen(inventoryButton,['mousedown', 'touchstart'], function(e) {
		director.replaceScene(invScene);
	});

	//easy event
	goog.events.listen(easyButton,['mousedown', 'touchstart'], function(e) {
		Game.setDifficulty(EASY);
		Game.setShopItems(shopLayer, gameScene, director, nextShopLayer, nextButton);
		director.replaceScene(gameScene);
	});

	//medium event
	goog.events.listen(mediumButton,['mousedown', 'touchstart'], function(e) {
		Game.setDifficulty(MEDIUM);
		Game.setShopItems(shopLayer, gameScene, director, nextShopLayer, nextButton);
		director.replaceScene(gameScene);
	});

	//hard event
	goog.events.listen(hardButton,['mousedown', 'touchstart'], function(e) {
		Game.setDifficulty(HARD);
		Game.setShopItems(shopLayer, gameScene, director, nextShopLayer, nextButton);
		director.replaceScene(gameScene);
	});
	// END EVENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
