'use strict';

var Star = require('./star');
var config = require('./config');
var randomizer = require('./utils/randomizer');
var calc = require('./utils/calc');

function Galaxy() {
  var self = this;

  this._ctx = null;

  this._counter = 0;

  window.addEventListener('mousemove', this.repell.bind(this), false);
}

Galaxy.prototype = [];

Galaxy.prototype.setContext = function(ctx) {
  this._ctx = ctx;
};

Galaxy.prototype.repell = function(event) {
  var distance = 0;
  var star = null;
  var pointer = {
    x: event.clientX,
    y: event.clientY
  };

  for (var i = 0; i < this.length; i++) {
    star = {
      x: this[i].getPosition().x,
      y: this[i].getPosition().y
    };

    distance = Math.floor(calc.distance(pointer, star));

    if (distance < 64) {
      this[i].changeDirection({
        x: (star.x - pointer.x) * 0.032,
        y: (star.y - pointer.y) * 0.032
      });
    }
  }
};

Galaxy.prototype.create = function() {
  var x = randomizer(0, config.getScreenWidth());
  var y = randomizer(0, config.getScreenHeight());
  var directionX = randomizer(-16, 16);
  var directionY = randomizer(-16, 16);

  var star = new Star(this.length, x, y, directionX, directionY, this._ctx);

  this.push(star);
};

Galaxy.prototype.draw = function() {
  if (this._counter++ > Math.floor(2560 / config.getScreenWidth())) {
    this.create();
    this._counter = 0;
  }

  for (var i = 0; i < this.length; i++) {
    this[i].draw();
  }

  this.dispose();
};

Galaxy.prototype.dispose = function() {
  for (var i = 0, j = this.length; i < j; i++) {
    if (this[i].shouldFadeOut()) {
      this[i].fadeOut();
    }

    if (this[i].isVisible()) {
      this[i] = null;
      this.splice(i, 1);
      i--;
      j--;
    }
  }
};

module.exports = Galaxy;
