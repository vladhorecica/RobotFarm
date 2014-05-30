function GameItem(name, cost, revenue, time_to_ripe, time_to_death, image) {
	var name = name;
	var cost = cost;
	var revenue = revenue;
	var time_to_ripe = time_to_ripe;
	var time_to_death = time_to_death;
	var image = image;

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
		time_to_ripe = value;
	}
	this.setTimeDeath = function(value) {
		time_to_death = value;
	}
	this.setImage = function(value) {
		image = value;
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
	this.getTimeRipe = function() {
		return time_to_ripe;
	}
	this.getTimeDeath = function() {
		return time_to_death;
	}
	this.getImage = function() {
		return image;
	}
}