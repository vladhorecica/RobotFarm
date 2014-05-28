var EASY = 10;
var MEDIUM = 20;
var HARD = 30;

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
			image: 'tomato.png'
		},
		{
			name: 'Right Arm',
			cost: 20 + level,
			revenue: 30 + level,
			time_to_ripe: 10 + level,
			time_to_death: 60 - level,
			image: 'artichoke.png'
		},
		{
			name: 'Left Arm',
			cost: 20 + level,
			revenue: 30 + level,
			time_to_ripe: 10 + level,
			time_to_death: 60 - level,
			image: 'lettuce.png'
		},
		{
			name: 'Head',
			cost: 30 + level,
			revenue: 40 + level,
			time_to_ripe: 15 + level,
			time_to_death: 70 - level,
			image: 'eggplant.png'
		},
		{
			name: 'Right Leg',
			cost: 40 + level,
			revenue: 50 + level,
			time_to_ripe: 20 + level,
			time_to_death: 80 - level,
			image: 'peppers.png'
		},
		{
			name: 'Left Leg',
			cost: 40 + level,
			revenue: 50 + level,
			time_to_ripe: 20 + level,
			time_to_death: 80 - level,
			image: 'extra.png'
		}
	];
}
