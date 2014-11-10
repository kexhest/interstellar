'use strict';

function distance(start, end) {
  return Math.sqrt(Math.pow(Math.abs(start.x - end.x), 2) +
    Math.pow(Math.abs(start.y - end.y), 2));
}

module.exports = {
  distance: distance
};
