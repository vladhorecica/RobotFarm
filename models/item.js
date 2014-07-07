/**
 * Abstract class for a game item.
 *
 * @param data      Contains item data.
 * @param level     Difficuly of the game.
 * @constructor
 */
function GameItem(data, level) {
	var name = data[NAME_INDEX];
	var cost = data[COST_INDEX] + level;
	var revenue = data[REVENUE_INDEX] + level;
	var time_ready = data[TIME_READY_INDEX] + level;
	var time_destroy = data[TIME_DEATH_INDEX] - level;
	var image = data[NAME_INDEX] + '.png';
	var attack1 = data[ATTACK1_INDEX];
	var attack2 = data[ATTACK2_INDEX];
	var armor = data[ARMOR_INDEX];

	this.setName = function(value) {
		name = value;
	}
	this.setCost = function(value) {
		cost = value;
	}
	this.setRevenue = function(value) {
		revenue = value;
	}
	this.setTimeRipe = function(value) {
		time_ready = value;
	}
	this.setTimeDeath = function(value) {
		time_destroy = value;
	}
	this.setImage = function(value) {
		image = value;
	}
	this.setAttack1= function(value) {
		attack1 = value;
	}
	this.setAttack2 = function(value) {
		attack2 = value;
	}
	this.setArmor = function(value) {
		armor = value;
	}
	this.getName = function() {
		return name;
	}
	this.getCost = function() {
		return cost;
	}
	this.getRevenue = function() {
		return revenue;
	}
	this.getTimeReady = function() {
		return time_ready;
	}
	this.getTimeDeath = function() {
		return time_destroy;
	}
	this.getImage = function() {
		return image;
	}
	this.getAttack1 = function() {
		return attack1;
	}
	this.getAttack2 = function() {
		return attack2;
	}
	this.getArmor = function() {
		return armor;
	}
}