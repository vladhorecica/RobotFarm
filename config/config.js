var EASY = 0;
var MEDIUM = 10;
var HARD = 20;

//player object
var playerObj = {
	money: 300,
	currentCrop: 0,
	robotAttack1: 10,
	robotAttack2: 100,
	robotArmor: 100
}

var gameObj = {
	width: 320,
	height: 480,
	tile_size: 64,
	num_tiles_x: 5,
	num_tiles_y: 6,
	landLayer_w: 64*5,
	landLayer_h: 64*6,
	controlsLayer_w: 64*5,
	controlsLayer_h: 64*1.5,
	costPlowing: 5,

	//shop
	shop_margin_x: 50,
	shop_margin_y: 20
}

function setDifficulty(level) {
	gameObj.crops = [];
	for(var i=0; i < settings.length; i++) {
		gameObj.crops.push(new GameItem(settings[i], level));
	}
}
