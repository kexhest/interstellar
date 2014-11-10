'use strict';

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

function updateScreenValues() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
}

function getScreenWidth() {
  return screenWidth;
}

function getScreenHeight() {
  return screenHeight;
}

module.exports = {
  updateScreenValues: updateScreenValues,
  getScreenWidth: getScreenWidth,
  getScreenHeight: getScreenHeight
};
