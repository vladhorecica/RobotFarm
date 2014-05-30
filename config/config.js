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
	gameObj.crops = [
		{
			name: 'Chest',
			cost: 10 + level,
			revenue: 20 + level,
			time_to_ripe: 5 + level, //secods
			time_to_death: 30 - level,
			image: 'tomato.png',
			attack1: 0,
			attack2: 0,
			armor: 100
		},
		{
			name: 'Right Arm',
			cost: 20 + level,
			revenue: 30 + level,
			time_to_ripe: 10 + level,
			time_to_death: 60 - level,
			image: 'artichoke.png',
			attack1: 15,
			attack2: 16,
			armor: 12
		},
		{
			name: 'Left Arm',
			cost: 20 + level,
			revenue: 30 + level,
			time_to_ripe: 10 + level,
			time_to_death: 60 - level,
			image: 'lettuce.png',
			attack1: 17,
			attack2: 19,
			armor: 12
		},
		{
			name: 'Head',
			cost: 30 + level,
			revenue: 40 + level,
			time_to_ripe: 15 + level,
			time_to_death: 70 - level,
			image: 'eggplant.png',
			attack1: 0,
			attack2: 0,
			armor: 30
		},
		{
			name: 'Right Leg',
			cost: 40 + level,
			revenue: 50 + level,
			time_to_ripe: 20 + level,
			time_to_death: 80 - level,
			image: 'peppers.png',
			attack1: 18,
			attack2: 20,
			armor: 20
		},
		{
			name: 'Left Leg',
			cost: 40 + level,
			revenue: 50 + level,
			time_to_ripe: 20 + level,
			time_to_death: 80 - level,
			image: 'extra_leg.png',
			attack1: 16,
			attack2: 23,
			armor: 20
		}
	];
}
