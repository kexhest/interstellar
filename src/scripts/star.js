'use strict';

var config = require('./config');
var sprintf = require('sprintf-js').sprintf;

var VELOCITY_MODIFIER = 0.04;
var RADIUS = 1.6;
var COLOR = 'rgba(255,255,255,%s)';
var LIFETIME = 4000;
var COOL_DOWN = 1000;

function Star(index, x, y, directionX, directionY, ctx) {
  this._index = index;
  this._opacity = 0.01;
  this._fadeOut = false;
  this._coolDown = Date.now() + COOL_DOWN;
  this._timer = Date.now() + LIFETIME;
  this._position = {
    x: x,
    y: y
  };
  this._direction = {
    x: directionX * VELOCITY_MODIFIER,
    y: directionY * VELOCITY_MODIFIER
  };

  this._ctx = ctx;
}

Star.prototype.getPosition = function() {
  return this._position;
};

Star.prototype.getOpacity = function() {
  return this._opacity;
};

Star.prototype.draw = function() {
  this._ctx.fillStyle = sprintf(COLOR, this._opacity.toFixed(2));
  this._ctx.beginPath();
  this._ctx.arc(this._position.x, this._position.y, RADIUS, 0, 2 * Math.PI);
  this._ctx.fill();

  this.update();
};

Star.prototype.changeDirection = function(direction) {
  if (this._coolDown > Date.now()) { return; }

  this._direction = direction;

  this._coolDown = Date.now() + COOL_DOWN;
};

Star.prototype.update = function() {
  if (this._opacity < 1 && this._fadeOut === false) {
    this._opacity += 0.02;
  }

  // console.log(this._direction);

  this._position.x += this._direction.x;
  this._position.y += this._direction.y;
};

Star.prototype.fadeOut = function() {
  this._fadeOut = true;
  this._opacity -= 0.05;
};

Star.prototype.shouldFadeOut = function() {
  return this._timer < Date.now();
};

Star.prototype.isVisible = function() {
  return this._position.x < -RADIUS ||
    this._position.x > config.getScreenWidth() + RADIUS ||
    this._position.y < -RADIUS ||
    this._position.y > config.getScreenHeight() + RADIUS ||
    this._opacity <= 0;
};

module.exports = Star;
