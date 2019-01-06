"use strict"
class PlayerController
{	
	
	constructor(gameobject)
	{
		this.gameobject = gameobject;
		
		// keyboard input status
		this.keyboard = new Array(128).fill(0);
		
		// mouse position data x, y, downx, downy, isdown
		this.mouse = new Array(5).fill(0.0);
		
		this.shooting = 0;
		this.cooldown = 0;
	}
	
	Activate() {
		this.attachOnMouseDown(window);
		this.attachOnMouseMove(window);
		this.attachOnMouseUp(window);
		this.attachOnKeyDown(window);
		this.attachOnKeyUp(window);
	}
	
	Deactivate() {
		this.removeOnMouseDown(window);
		this.removeOnMouseMove(window);
		this.removeOnMouseUp(window);
		this.removeOnKeyDown(window);
		this.removeOnKeyUp(window);
	}
}

PlayerController.prototype.onKeyUpHandler = function(e, target)
{
	try {
		console.log(e.keyCode);
		target.keyboard[e.keyCode] = 0;
		target.shooting = (target.keyboard[32]);
		target.gameobject.accelerating = (target.keyboard[87] || target.keyboard[38]);
		target.gameobject.rotating = (target.keyboard[68] || target.keyboard[39]) - (target.keyboard[65] || target.keyboard[37]);
	} catch (error) {
		console.log(error);
	}
}

PlayerController.prototype.attachOnKeyUp = function(obj)
{
	var self = this;
	self.keyUp = function(e) {self.onKeyUpHandler(e, self)};
	obj.addEventListener("keyup", self.keyUp);
	obj = null;
}

PlayerController.prototype.removeOnKeyUp = function(obj)
{
	var self = this;
	obj.removeEventListener("keyup", self.keyUp);
	obj = null;
}

PlayerController.prototype.onKeyDownHandler = function(e, target)
{
	try {
		target.keyboard[e.keyCode] = 1;
		target.shooting = (target.keyboard[32]);
		target.gameobject.accelerating = (target.keyboard[87] || target.keyboard[38]);
		target.gameobject.rotating = (target.keyboard[68] || target.keyboard[39]) - (target.keyboard[65] || target.keyboard[37]);
	} catch (error) {
		console.log(error);
	}
}

PlayerController.prototype.attachOnKeyDown = function(obj)
{
	var self = this;
	self.keyDown = function(e) {self.onKeyDownHandler(e, self)};
	obj.addEventListener("keydown", self.keyDown);
	obj = null;
}

PlayerController.prototype.removeOnKeyDown = function(obj)
{
	var self = this;
	obj.removeEventListener("keydown", self.keyDown);
	obj = null;
}

PlayerController.prototype.onMouseUpHandler = function(e, target)
{
	target.mouse[4] = 0.0;
}

PlayerController.prototype.attachOnMouseUp = function(obj)
{
	var self = this;
	self.mouseUp = function(e) {self.onMouseUpHandler(e, self)};
	obj.addEventListener("mouseup", self.mouseUp);
	obj.null;
}

PlayerController.prototype.removeOnMouseUp = function(obj)
{
	var self = this;
	obj.removeEventListener("mouseup", self.mouseUp);
	obj = null;
}

PlayerController.prototype.onMouseMoveHandler = function(e, target)
{
	target.mouse[0] = e.clientX;
	target.mouse[1] = e.clientY;
}

PlayerController.prototype.attachOnMouseMove = function(obj)
{
	var self = this;
	self.mouseMove = function(e) {self.onMouseMoveHandler(e, self)};
	obj.addEventListener("mousemove", self.mouseMove);
	obj = null;
}

PlayerController.prototype.removeOnMouseMove = function(obj)
{
	var self = this;
	obj.removeEventListener("mousemove", self.mouseMove);
	obj = null;
}

PlayerController.prototype.onMouseDownHandler = function(e, target)
{
	target.mouse[2] = target.mouse[0];
	target.mouse[3] = target.mouse[1];
	target.mouse[4] = 1.0;
}

PlayerController.prototype.attachOnMouseDown = function(obj)
{
	var self = this;
	self.mouseDown = function(e) {self.onMouseDownHandler(e, self)};
	obj.addEventListener("mousedown", self.mouseDown);
	obj = null;
}

PlayerController.prototype.removeOnMouseDown = function(obj)
{
	var self = this;
	obj.removeEventListener("mousedown", self.mouseDown);
	obj = null;
}