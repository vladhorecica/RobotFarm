var EASY = 0;
var MEDIUM = 10;
var HARD = 20;

var BUTTON_COLOR = '#EA6100';
var CONTROL_COLOR = '#0D0D0D';
var TEXT_COLOR = 'white';

var NAME_INDEX = 0;
var COST_INDEX = 1;
var REVENUE_INDEX = 2;
var TIME_RIPE_INDEX = 3;
var TIME_DEATH_INDEX = 4;
var ATTACK1_INDEX = 5;
var ATTACK2_INDEX = 6;
var ARMOR_INDEX = 7;
//states
robotfarm.Garage.prototype.EMPTY = 0;
robotfarm.Garage.prototype.PLOWED = 1;
robotfarm.Garage.prototype.GROWING = 2;
robotfarm.Garage.prototype.READY = 3;

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

var RIGHT = {0: gameObj.controlsLayer_w-50, 1:gameObj.height-gameObj.controlsLayer_h/2};
var RIGHT2 = {0: gameObj.width - 40, 1:gameObj.height-25};
var MIDDLE = {0:gameObj.controlsLayer_w-140, 1:gameObj.height-gameObj.controlsLayer_h/2};
var MIDDLE2 = {0: gameObj.width/2, 1:gameObj.height-25};
var LEFT= {0:50, 1:gameObj.height-gameObj.controlsLayer_h/2};
var LEFT2 = {0:40, 1:gameObj.height-25};
var NULL = {0:0, 1:0};