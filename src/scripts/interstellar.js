'use strict';

var calc = require('./utils/calc');
var sprintf = require('sprintf-js').sprintf;

var MAX_DISTANCE = 120;
var NORM_DISTANCE = 80;
var WIDTH = 0.25;
var COLOR = 'rgba(255,255,255,%s)';

function Interstellar () {
  this._ctx = null;
}

Interstellar.prototype.setContext = function(ctx) {
  this._ctx = ctx;
};

Interstellar.prototype.draw = function(stars) {
  var connections = this.getConnections(stars);
  var connection = null;
  var gradient = null;
  var startColor = null;
  var endColor = null;

  for (var i = 0; i < connections.length; i++) {
    connection = connections[i];

    this._ctx.beginPath();
    this._ctx.moveTo(connection.start.x, connection.start.y);
    this._ctx.lineTo(connection.end.x, connection.end.y);

    gradient = this._ctx.createLinearGradient(connection.start.x, connection.start.y,
      connection.end.x, connection.end.y);

    var opacityModifier = 1;

    if (connection.distance > NORM_DISTANCE) {
      opacityModifier = (MAX_DISTANCE - connection.distance) / (MAX_DISTANCE - NORM_DISTANCE);
    }

    startColor = sprintf(COLOR, (connection.start.opacity * opacityModifier).toFixed(2));
    endColor = sprintf(COLOR, (connection.end.opacity * opacityModifier).toFixed(2));

    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    this._ctx.strokeStyle = gradient;
    this._ctx.lineWidth = WIDTH;

    this._ctx.stroke();
  }
};

Interstellar.prototype.getConnections = function(stars) {
  var connections = [];

  var starA = null;
  var starB = null;

  var start = null;
  var end = null;

  var distance = null;

  if (stars.length <= 1) { return connections; }

  for (var i = 0; i < stars.length; i++) {
    for (var k = i + 1; k < stars.length; k++) {
      starA = stars[i];
      starB = stars[k];

      start = {
        x: starA.getPosition().x,
        y: starA.getPosition().y,
        opacity: starA.getOpacity()
      };

      end = {
        x: starB.getPosition().x,
        y: starB.getPosition().y,
        opacity: starB.getOpacity()
      };

      distance = calc.distance(start, end);

      if (distance <= MAX_DISTANCE) {
        connections.push({
          start: start,
          end: end,
          distance: distance
        });
      }
    }
  }

  return connections;
};

module.exports = Interstellar;
