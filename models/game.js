/**
 * Variable used for game configuration.
 *
 * @type {
 * 	{
 * 	getElement: Function,      Factory pattern in order to return game objects
 * 	setDifficulty: Function,   Sets the difficulty of the game
 * 	createLand: Function,      Creates garage objects in order to form the construction land
 * 	setShopItems: Function     Creates items list for shop layer
 * 	}
 * }
 */
var Game = {
	getElement: function() {
		switch(arguments[0]) {
			case 'button':
				return new lime.GlossyButton()
					.setColor(BUTTON_COLOR)
					.setText(arguments[1])
					.setPosition(arguments[2][0], arguments[2][1])
					.setSize(80, 40);
			case 'label':
				return new lime.Label()
					.setText(arguments[1])
					.setFontColor(TEXT_COLOR)
					.setPosition(arguments[2][0], arguments[2][1])
					.setFontSize(arguments[3]);
			case 'difButton':
				return new lime.GlossyButton()
					.setColor(BUTTON_COLOR)
					.setText(arguments[1])
					.setPosition(arguments[2][0], arguments[2][1])
					.setSize(130, 40);
			case 'invImage':
				return new lime.Sprite()
					.setAnchorPoint(0,0)
					.setPosition(0, 0)
					.setSize(gameObj.landLayer_w, gameObj.landLayer_h)
					.setFill('images/' + arguments[1] + '.png');
			case 'director':
				return new lime.Director(document.body,gameObj.width,gameObj.height);
			case 'layer':
				return new lime.Layer()
					.setAnchorPoint(0, 0);
			case 'scene':
				return new lime.Scene()
					.setRenderer(lime.Renderer.CANVAS);
			case 'area':
				return new lime.Sprite()
					.setAnchorPoint(0,0)
					.setPosition(arguments[1][0], arguments[1][1])
					.setSize(arguments[2][0], arguments[2][1])
					.setFill('images/backg.png');
			case 'land':
				return new robotfarm.Garage(gameObj, playerObj)
					.setPosition(arguments[1][0], arguments[1][1]);
		}
		return false;
	},
	setDifficulty: function(level) {
		gameObj.pieces = [];
		for(var i=0; i < settings.length; i++) {
			gameObj.pieces.push(new GameItem(settings[i], level));
		}
	},
	createLand: function(layer) {
		for(var i=0; i<gameObj.number_land_x; i++) {
			for(var j=0; j<gameObj.number_land_y; j++) {
				var landElement = Game.getElement('land', {0:i*gameObj.item_size, 1:j*gameObj.item_size});
				layer.appendChild(landElement);
			}
		}
	},
	setShopItems: function(shopLayer, gameScene, director, nextShopLayer, nextButton) {
		//shop items
		var count = 5;
		var more = true;

		if (gameObj.pieces.length <= count) {
			count = gameObj.pieces.length;
			more = false;
		}
		for(var i=0; i<count; i++) {
			var item = this.getElement('area', {0:gameObj.shop_margin_x, 1:gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.item_size)*i}, {0:gameObj.item_size, 1:gameObj.item_size})
			item.setFill('images/'+gameObj.pieces[i].getImage());
			var stats1 = this.getElement('label', gameObj.pieces[i].getName()+' ('+gameObj.pieces[i].getTimeReady()+' days)', {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*1.5 + (gameObj.shop_margin_y + gameObj.item_size)*i}, 14);
			var stats2 = this.getElement('label', 'COST: $'+gameObj.pieces[i].getCost(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*2.5 + (gameObj.shop_margin_y + gameObj.item_size)*i}, 14);
			var stats3 = this.getElement('label', 'REVENUE: $'+gameObj.pieces[i].getRevenue(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*3.4 + (gameObj.shop_margin_y + gameObj.item_size)*i}, 14);
			shopLayer.appendChild(item);
			shopLayer.appendChild(stats1);
			shopLayer.appendChild(stats2);
			shopLayer.appendChild(stats3);

			//pick piece
			(function(item, i) {
				goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
					playerObj.currentPiece = i;
					director.replaceScene(gameScene);
				});
			})(item, i);
		}

		if (more) {
			shopLayer.appendChild(nextButton);
			var k = 0;
			for(var i=count; i<gameObj.pieces.length; i++) {
				var item = this.getElement('area', {0:gameObj.shop_margin_x, 1:gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.item_size)*k}, {0:gameObj.item_size, 1:gameObj.item_size})
				item.setFill('images/'+gameObj.pieces[i].getImage());
				var stats1 = this.getElement('label', gameObj.pieces[i].getName()+' ('+gameObj.pieces[i].getTimeReady()+' days)', {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*1.5 + (gameObj.shop_margin_y + gameObj.item_size)*k}, 14);
				var stats2 = this.getElement('label', 'COST: $'+gameObj.pieces[i].getCost(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*2.5 + (gameObj.shop_margin_y + gameObj.item_size)*k}, 14);
				var stats3 = this.getElement('label', 'REVENUE: $'+gameObj.pieces[i].getRevenue(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*3.4 + (gameObj.shop_margin_y + gameObj.item_size)*k}, 14);
				nextShopLayer.appendChild(item);
				nextShopLayer.appendChild(stats1);
				nextShopLayer.appendChild(stats2);
				nextShopLayer.appendChild(stats3);
				k++;
				//pick piece
				(function(item, i) {
					goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
						playerObj.currentPiece = i;
						director.replaceScene(gameScene);
					});
				})(item, i);
			}
		}
	}
}