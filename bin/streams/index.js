"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStats$ = exports.mapData$ = void 0;

var _rxjs = require("rxjs");

var mapData$ = new _rxjs.AsyncSubject();
exports.mapData$ = mapData$;
var mapStats$ = new _rxjs.BehaviorSubject([]);
exports.mapStats$ = mapStats$;
var mapArray = [];

for (var i = 0; i < 130; i++) {
  var ix = i.toString();

  if (i < 10) {
    ix = "00".concat(ix);
  } else if (i < 100) {
    ix = "0".concat(ix);
  }

  try {
    var mapName = "MAP".concat(ix, ".json"); // const map = require(`../../lib/fft-map-json/data/${mapName}`);

    var map = require("../config/maps/".concat(mapName)); // const stats= gnsMapDataToMapStats(map);


    mapArray.push(map);
  } catch (e) {
    console.log("Error loading map", e.message);
  }
}

console.info("[fft-bot/mapper] Loaded maps ".concat(mapArray.length, " / 130"));
mapData$.next(mapArray);
mapData$.complete();