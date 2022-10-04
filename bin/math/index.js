"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delta = delta;

function delta(tile1, tile2) {
  var a = Math.pow(tile1.x + tile2.x, 2);
  var b = Math.pow(tile1.y + tile2.y, 2);
  var c = Math.pow(a + b, 1 / 2);
  return c;
}