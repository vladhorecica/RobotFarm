/**
 * Game difficulty levels.
 */
var EASY = 0;
var MEDIUM = 10;
var HARD = 20;

/**
 * Game color constants.
 */
var BUTTON_COLOR = '#126AFE';
var CONTROL_COLOR = '#0D0D0D';
var TEXT_COLOR = 'white';

/**
 * Item attribute indexes.
 */
var NAME_INDEX = 0;
var COST_INDEX = 1;
var REVENUE_INDEX = 2;
var TIME_READY_INDEX = 3;
var TIME_DEATH_INDEX = 4;
var ATTACK1_INDEX = 5;
var ATTACK2_INDEX = 6;
var ARMOR_INDEX = 7;

/**
 * Garage object states.
 */
robotfarm.Garage.prototype.EMPTY = 0;
robotfarm.Garage.prototype.PREPARED = 1;
robotfarm.Garage.prototype.CONSTRUCTING = 2;
robotfarm.Garage.prototype.READY = 3;

/**
 * Player attributes.
 */
var playerObj = {
	money: 300,
	currentPiece: 0,
	robotAttack1: 10,
	robotAttack2: 100,
	robotArmor: 100
}

/**
 * Game attributes.
 */
var gameObj = {
	width: 320,
	height: 480,
	item_size: 64,
	number_land_x: 5,
	number_land_y: 6,
	landLayer_w: 64*5,
	landLayer_h: 64*6,
	controlsLayer_w: 64*5,
	controlsLayer_h: 64*1.5,
	costPreparation: 5,
	shop_margin_x: 50,
	shop_margin_y: 20,
	down_time: 1000
}

/**
 * Game object positioning constants.
 */
var RIGHT = {0: gameObj.controlsLayer_w-50, 1:gameObj.height-gameObj.controlsLayer_h/2};
var RIGHT2 = {0: gameObj.width - 40, 1:gameObj.height-25};
var MIDDLE = {0:gameObj.controlsLayer_w-140, 1:gameObj.height-gameObj.controlsLayer_h/2};
var MIDDLE2 = {0: gameObj.width/2, 1:gameObj.height-25};
var LEFT= {0:50, 1:gameObj.height-gameObj.controlsLayer_h/2};
var LEFT2 = {0:40, 1:gameObj.height-25};
var NULL = {0:0, 1:0};

/**
 * Game default images.
 */
var BASE_IMAGE = 'images/base_tile.png';
var PREPARED_IMAGE = 'images/plowed.png';
var CONSTRUCTING_IMAGE = 'images/growing.png';

