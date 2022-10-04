"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDataToMapStats = mapDataToMapStats;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _math = require("../math");

var _utility = require("../utility");

var _seriesToStats = require("./seriesToStats");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function mapDataToMapStats(map) {
  var tileMap = {};
  var tileDeltaMap = {};
  var tileArray = (0, _utility.gnsMapDataToSBBTileArray)(map);
  var mainTiles = tileArray.filter(function (t) {
    return t.z === 0;
  });
  var startTileMap = {
    0: [],
    1: []
  };
  var enemyDeltaMap = {
    0: 0,
    1: 0
  };
  var friendlyDeltaMap = {
    0: 0,
    1: 0
  };
  var enemyHeightDeltaMap = {
    0: 0,
    1: 0
  };

  var _iterator = _createForOfIteratorHelper(tileArray.filter(function (t) {
    return t.start !== null;
  })),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tile = _step.value;
      startTileMap[tile.start].push(tile);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(tileArray),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _tile = _step2.value;
      tileMap[_tile._id] = _tile;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _loop = function _loop() {
    var _arr$_i = (0, _slicedToArray2["default"])(_arr[_i], 2),
        team = _arr$_i[0],
        team2 = _arr$_i[1];

    var t1Starts = tileArray.filter(function (t) {
      return t.start === team;
    });
    var t2Starts = tileArray.filter(function (t) {
      return t.start === team2;
    });

    var _iterator3 = _createForOfIteratorHelper(t1Starts),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var t1Tile = _step3.value;

        var _iterator4 = _createForOfIteratorHelper(t1Starts),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var t1TileB = _step4.value;
            friendlyDeltaMap[team] += (0, _math.delta)(t1Tile, t1TileB) / 4;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        var _iterator5 = _createForOfIteratorHelper(t2Starts),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var t2Tile = _step5.value;
            enemyDeltaMap[team] += (0, _math.delta)(t1Tile, t2Tile) / 4;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        var _iterator6 = _createForOfIteratorHelper(t2Starts),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _t2Tile = _step6.value;
            var heightDelta = t1Tile.height - _t2Tile.height;
            enemyHeightDeltaMap[team] += heightDelta / 4;
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };

  for (var _i = 0, _arr = [[0, 1], [1, 0]]; _i < _arr.length; _i++) {
    _loop();
  }

  var _iterator7 = _createForOfIteratorHelper(mainTiles),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var tile1 = _step7.value;
      var x1 = tile1.x,
          y1 = tile1.y,
          tile1Id = tile1._id,
          h1 = tile1.height,
          d1 = tile1.depth;

      if (!tileDeltaMap[tile1Id]) {
        tileDeltaMap[tile1Id] = {};
      }

      var _iterator9 = _createForOfIteratorHelper(mainTiles),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var tile2 = _step9.value;
          var x2 = tile2.x,
              y2 = tile2.y,
              tile2Id = tile2._id,
              h2 = tile2.height,
              d2 = tile2.depth;

          var _delta2 = Math.abs(x2 - x1) + Math.abs(y2 - y1);

          var _heightChange = Math.abs(h2 - h1);

          var _depthChange = Math.abs(d2 - d1);

          tileDeltaMap[tile1Id][tile2Id] = {
            delta: _delta2,
            heightChange: _heightChange,
            depthChange: _depthChange
          };
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  var teamSurroundInfoMap = {};

  for (var _i2 = 0, _arr2 = [0, 1]; _i2 < _arr2.length; _i2++) {
    var team = _arr2[_i2];
    var tileSurroundingInfo = {
      depthChange: 0,
      heightChange: 0
    };

    var _iterator8 = _createForOfIteratorHelper(startTileMap[team]),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var startTile = _step8.value;
        var deltas = tileDeltaMap[startTile._id];

        for (var _i3 = 0, _Object$entries = Object.entries(deltas); _i3 < _Object$entries.length; _i3++) {
          var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i3], 2),
              _otherTileId = _Object$entries$_i[0],
              datum = _Object$entries$_i[1];

          var _delta = datum.delta,
              depthChange = datum.depthChange,
              heightChange = datum.heightChange;

          if (_delta <= 2 && _delta > 0) {
            tileSurroundingInfo.depthChange += Math.pow(+depthChange, 1 / _delta) / 4;
            tileSurroundingInfo.heightChange += Math.pow(+heightChange, 1 / _delta) / 4;
          }
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    teamSurroundInfoMap[team] = tileSurroundingInfo;
  }

  var team1Trappedness = teamSurroundInfoMap[0].heightChange;
  var team2Trappedness = teamSurroundInfoMap[1].heightChange;
  var t1TrappedStartAdvantange = team2Trappedness - team1Trappedness;
  var team1WateryStart = teamSurroundInfoMap[0].depthChange;
  var team2WateryStart = teamSurroundInfoMap[1].depthChange;
  var t1WateryStartAdvantage = team2WateryStart - team1WateryStart;
  var meanEnemyStartDistance = enemyDeltaMap[0];
  var t1HeightAdvantage = enemyHeightDeltaMap[0];
  var t1BunchednessAdvantage = friendlyDeltaMap[1] - friendlyDeltaMap[0];

  var _seriesToStatistics = (0, _seriesToStats.seriesToStatistics)(tileArray.map(function (t) {
    return t.height;
  })),
      heightStandardDeviation = _seriesToStatistics.sigma;

  var tileCount = tileArray.length;
  var passableTileCount = tileArray.filter(function (t) {
    return !t.no_walk;
  }).length;
  var lavaTileCount = tileArray.filter(function (t) {
    return t.surface_type === "Lava";
  }).length;
  var depthCount_gte1 = tileArray.filter(function (t) {
    return t.depth >= 1;
  }).length;
  var depthCount_gte2 = tileArray.filter(function (t) {
    return t.depth >= 2;
  }).length;
  var analysis = {
    tileCount: tileCount,
    passable: passableTileCount / tileCount,
    lava: lavaTileCount / tileCount,
    water: depthCount_gte1 / tileCount,
    deep: depthCount_gte2 / tileCount,
    parting: meanEnemyStartDistance,
    bumpiness: heightStandardDeviation,
    heightAdvantage: t1HeightAdvantage,
    trappedAdvantage: t1TrappedStartAdvantange,
    wateryAdvantage: t1WateryStartAdvantage,
    bunchedAdvantage: t1BunchednessAdvantage
  };
  return analysis;
}