'use strict';

var config = require('./config');
var Galaxy = require('./galaxy');
var Interstellar = require('./interstellar');

var loaded = false;
var galaxy = new Galaxy();
var interstellar = new Interstellar();
var canvas = null;
var ctx = null;

document.addEventListener('DOMContentLoaded', bootstrap, false);
window.addEventListener('load', bootstrap, false);

function bootstrap() {
  if (loaded) { return; }
  loaded = true;

  canvas = document.getElementById('interstellar');
  ctx = canvas.getContext('2d');

  galaxy.setContext(ctx);
  interstellar.setContext(ctx);

  updateCanvas();
  render();

  window.addEventListener('resize', updateCanvas, false);
}

function render() {
  window.requestAnimationFrame.call(window, render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  interstellar.draw(galaxy);
  galaxy.draw();
}

function updateCanvas() {
  config.updateScreenValues();

  canvas.width = config.getScreenWidth();
  canvas.height = config.getScreenHeight();
}
