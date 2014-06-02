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
		gameObj.crops = [];
		for(var i=0; i < settings.length; i++) {
			gameObj.crops.push(new GameItem(settings[i], level));
		}
	},
	createLand: function(layer) {
		for(var i=0; i<gameObj.num_tiles_x; i++) {
			for(var j=0; j<gameObj.num_tiles_y; j++) {
				var landElement = Game.getElement('land', {0:i*gameObj.tile_size, 1:j*gameObj.tile_size});
				layer.appendChild(landElement);
			}
		}
	},
	setShopItems: function(shopLayer, gameScene, director, nextShopLayer, nextButton) {
		//shop items
		var count = 5;
		var more = true;

		if (gameObj.crops.length <= count) {
			count = gameObj.crops.length;
			more = false;
		}
		for(var i=0; i<count; i++) {
			var item = this.getElement('area', {0:gameObj.shop_margin_x, 1:gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.tile_size)*i}, {0:gameObj.tile_size, 1:gameObj.tile_size})
			item.setFill('images/'+gameObj.crops[i].getImage());
			var stats1 = this.getElement('label', gameObj.crops[i].getName()+' ('+gameObj.crops[i].getTimeRipe()+' days)', {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*1.5 + (gameObj.shop_margin_y + gameObj.tile_size)*i}, 14);
			var stats2 = this.getElement('label', 'cost: $'+gameObj.crops[i].getCost(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*2.5 + (gameObj.shop_margin_y + gameObj.tile_size)*i}, 14);
			var stats3 = this.getElement('label', 'revenue: $'+gameObj.crops[i].getRevenue(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*3.4 + (gameObj.shop_margin_y + gameObj.tile_size)*i}, 14);
			shopLayer.appendChild(item);
			shopLayer.appendChild(stats1);
			shopLayer.appendChild(stats2);
			shopLayer.appendChild(stats3);

			//pick crop
			(function(item, i) {
				goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
					playerObj.currentCrop = i;
					director.replaceScene(gameScene);
				});
			})(item, i);
		}

		if (more) {
			shopLayer.appendChild(nextButton);
			var k = 0;
			for(var i=count; i<gameObj.crops.length; i++) {
				var item = this.getElement('area', {0:gameObj.shop_margin_x, 1:gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.tile_size)*k}, {0:gameObj.tile_size, 1:gameObj.tile_size})
				item.setFill('images/'+gameObj.crops[i].getImage());
				var stats1 = this.getElement('label', gameObj.crops[i].getName()+' ('+gameObj.crops[i].getTimeRipe()+' days)', {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*1.5 + (gameObj.shop_margin_y + gameObj.tile_size)*k}, 14);
				var stats2 = this.getElement('label', 'cost: $'+gameObj.crops[i].getCost(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*2.5 + (gameObj.shop_margin_y + gameObj.tile_size)*k}, 14);
				var stats3 = this.getElement('label', 'revenue: $'+gameObj.crops[i].getRevenue(), {0:gameObj.shop_margin_x+150, 1:gameObj.shop_margin_y*3.4 + (gameObj.shop_margin_y + gameObj.tile_size)*k}, 14);
				nextShopLayer.appendChild(item);
				nextShopLayer.appendChild(stats1);
				nextShopLayer.appendChild(stats2);
				nextShopLayer.appendChild(stats3);
				k++;
				//pick crop
				(function(item, i) {
					goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
						playerObj.currentCrop = i;
						director.replaceScene(gameScene);
					});
				})(item, i);
			}
		}
	}
}