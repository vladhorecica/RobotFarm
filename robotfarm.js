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
	setDifficulty(EASY);
	var director = new lime.Director(document.body,gameObj.width,gameObj.height);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);

	// First layer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var difScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var difLayer = new lime.Layer().setAnchorPoint(0, 0);

	//controls area
	var difArea = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
		.setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
	difLayer.appendChild(difArea);
	difScene.appendChild(difLayer);

	director.replaceScene(difScene);

	//difficulty label
	var difLabel = new lime.Label().setText('PICK DIFFICULTY').setFontColor('white')
		.setFontSize(20)
		.setPosition(gameObj.width/2, gameObj.height - gameObj.landLayer_h);
	difLayer.appendChild(difLabel);

	//easy button
	var easyButton = new lime.GlossyButton().setColor('#EA6100').setText('EASY')
		.setPosition(gameObj.landLayer_w/2, gameObj.landLayer_h/2 )
		.setSize(130, 40);
	difLayer.appendChild(easyButton);

	//medium button
	var mediumButton = new lime.GlossyButton().setColor('#EA6100').setText('MEDIUM')
		.setPosition(gameObj.landLayer_w/2, gameObj.landLayer_h/2 + 70)
		.setSize(130, 40);
	difLayer.appendChild(mediumButton);

	//hard button
	var hardButton = new lime.GlossyButton().setColor('#EA6100').setText('HARD')
		.setPosition(gameObj.landLayer_w/2, gameObj.landLayer_h/2 + 140)
		.setSize(130, 40);
	difLayer.appendChild(hardButton);

	// END FIRST LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// MAIN LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var landLayer = new lime.Layer().setAnchorPoint(0, 0);
	var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);

	gameScene.appendChild(landLayer);
	gameScene.appendChild(controlsLayer);

	//controls area
	var controlArea = new lime.Sprite().setAnchorPoint(0,0)
		.setPosition(0, gameObj.height-gameObj.controlsLayer_h)
		.setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
		.setFill('#0D0D0D')
	controlsLayer.appendChild(controlArea);

	//shop button
	var shopButton = new lime.GlossyButton().setColor('#EA6100').setText('Shop')
		.setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2)
		.setSize(80, 40);
	controlsLayer.appendChild(shopButton);

	//inventory button
	var inventoryButton = new lime.GlossyButton().setColor('#EA6100').setText('Inventory')
		.setPosition(gameObj.controlsLayer_w-140, gameObj.height-gameObj.controlsLayer_h/2)
		.setSize(80, 40);
	controlsLayer.appendChild(inventoryButton);

	//money
	var moneyLabel = new lime.Label().setText('Cash $'+playerObj.money).setFontColor('white')
		.setPosition(60, gameObj.height-gameObj.controlsLayer_h/2);
	controlsLayer.appendChild(moneyLabel);

	//updating player stats
	gameObj.updateMoney = function() {
		moneyLabel.setText('Cash $'+playerObj.money);
		attackLabel.setText('ATTACK: '+ playerObj.robotAttack1 + '-' + playerObj.robotAttack2);
		armorLabel.setText('ARMOR: '+ playerObj.robotArmor);
	};

	//create land elements
	for(var i=0; i<gameObj.num_tiles_x; i++) {
		for(var j=0; j<gameObj.num_tiles_y; j++) {
			var landElement = new robotfarm.Garage(gameObj, playerObj)
				.setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
			landLayer.appendChild(landElement);
		}
	}

//	director.replaceScene(gameScene);
	// END MAIN LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// INVENTORY LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// inventory
	var invScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var invLayer = new lime.Layer().setAnchorPoint(0, 0);

	var invBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
		.setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
	invLayer.appendChild(invBackground);
	invScene.appendChild(invLayer);

	var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(0, 0)
		.setSize(gameObj.landLayer_w, gameObj.landLayer_h)
		.setFill('images/robot_inventory.png');
	invLayer.appendChild(item);

	//close button
	var invCloseButton = new lime.GlossyButton().setColor('#133242').setText('Back')
		.setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2)
		.setSize(80, 40);
	invLayer.appendChild(invCloseButton);

	// robot stats
	var attackLabel = new lime.Label().setText('ATTACK: '+ playerObj.robotAttack1 + '-' + playerObj.robotAttack2)
		.setFontColor('white')
		.setPosition(60, gameObj.height-gameObj.controlsLayer_h/2);
	invLayer.appendChild(attackLabel);
	var armorLabel = new lime.Label().setText('ARMOR: '+ playerObj.robotArmor)
		.setFontColor('white')
		.setPosition(60, gameObj.height-gameObj.controlsLayer_h/2 + 15);
	invLayer.appendChild(armorLabel);
	// END INVENTORY LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// SHOP LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//shop
	var shopScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var shopLayer = new lime.Layer().setAnchorPoint(0, 0);

	var shopBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
		.setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
	shopLayer.appendChild(shopBackground);
	shopScene.appendChild(shopLayer);

	//next shop page
	var nextShopScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var nextShopLayer = new lime.Layer().setAnchorPoint(0, 0);

	var nextShopBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
		.setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
	nextShopLayer.appendChild(nextShopBackground);
	nextShopScene.appendChild(nextShopLayer);

	//close button
	var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
		.setPosition(gameObj.width/2, gameObj.height-25)
		.setSize(80, 40);
	shopLayer.appendChild(closeButton);
	nextShopLayer.appendChild(closeButton);

	//next button
	var nextButton = new lime.GlossyButton().setColor('#133242').setText('>')
		.setPosition(gameObj.width - 40, gameObj.height-25)
		.setSize(20, 20);
	shopLayer.appendChild(nextButton);

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

	//close shop event
	goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
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
		setDifficulty(EASY);
		setShopItems(shopLayer, gameScene, director);
		director.replaceScene(gameScene);
	});

	//medium event
	goog.events.listen(mediumButton,['mousedown', 'touchstart'], function(e) {
		setDifficulty(MEDIUM);
		setShopItems(shopLayer, gameScene, director);
		director.replaceScene(gameScene);
	});

	//hard event
	goog.events.listen(hardButton,['mousedown', 'touchstart'], function(e) {
		setDifficulty(HARD);
		setShopItems(shopLayer, gameScene, director);
		director.replaceScene(gameScene);
	});
	// END EVENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

function setShopItems(shopLayer, gameScene, director) {
	//shop items
	for(var i=0; i<gameObj.crops.length; i++) {
		var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.shop_margin_x, gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.tile_size)*i)
			.setFill('images/'+gameObj.crops[i].image).setSize(gameObj.tile_size, gameObj.tile_size);
		shopLayer.appendChild(item);

		var label = new lime.Label().setText(gameObj.crops[i].name+' ('+gameObj.crops[i].time_to_ripe+' days)').setFontColor('#E8FC08')
			.setPosition(gameObj.shop_margin_x+150, gameObj.shop_margin_y*1.5 + (gameObj.shop_margin_y + gameObj.tile_size)*i);
		shopLayer.appendChild(label);
		var label = new lime.Label().setText('cost: $'+gameObj.crops[i].cost).setFontColor('#E8FC08')
			.setPosition(gameObj.shop_margin_x+150, gameObj.shop_margin_y*2.5 + (gameObj.shop_margin_y + gameObj.tile_size)*i);
		shopLayer.appendChild(label);
		var label = new lime.Label().setText('revenue: $'+gameObj.crops[i].revenue).setFontColor('#E8FC08')
			.setPosition(gameObj.shop_margin_x+150, gameObj.shop_margin_y*3.4 + (gameObj.shop_margin_y + gameObj.tile_size)*i);
		shopLayer.appendChild(label);

		//pick crop
		(function(item, i) {
			goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
				playerObj.currentCrop = i;
				director.replaceScene(gameScene);
			});
		})(item, i);
	}
}
//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
//goog.exportSymbol('robotfarm.start', robotfarm.start);
