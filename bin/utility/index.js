"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gnsMapDataToSBBTileArray = gnsMapDataToSBBTileArray;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _excluded = ["team"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function gnsMapDataToSBBTileArray(map) {
  var starting_locations = map.starting_locations,
      surface_types = map.surface_types,
      height = map.height,
      width = map.width,
      upper = map.upper,
      lower = map.lower,
      num = map.num;
  var allTiles = [];

  var _iterator = _createForOfIteratorHelper(upper),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;

      var _iterator4 = _createForOfIteratorHelper(row),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _step4.value,
              x = _step4$value.x,
              y = _step4$value.y,
              no_walk = _step4$value.no_walk,
              depth = _step4$value.depth,
              _height = _step4$value.height,
              surface_type = _step4$value.surface_type;
          var z = 1;
          allTiles.push({
            _id: "T-".concat(num, "-").concat(z, "-").concat(y, "-").concat(x),
            x: x,
            y: y,
            z: z,
            no_walk: no_walk,
            depth: depth,
            height: _height,
            start: null,
            surface_type: surface_type
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(lower),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _row = _step2.value;

      var _iterator5 = _createForOfIteratorHelper(_row),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _step5.value,
              _x = _step5$value.x,
              _y = _step5$value.y,
              _no_walk = _step5$value.no_walk,
              _depth = _step5$value.depth,
              _height2 = _step5$value.height,
              _surface_type = _step5$value.surface_type;
          var _z = 0;
          allTiles.push({
            _id: "T".concat(num, "-").concat(_x, "-").concat(_y, "-").concat(_z),
            x: _x,
            y: _y,
            z: 0,
            no_walk: _no_walk,
            depth: _depth,
            height: _height2,
            start: null,
            surface_type: _surface_type
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } // }/

  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(starting_locations.map(function (_ref) {
    var team = _ref.team,
        rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
    return _objectSpread({
      team: team === "Player 1" ? 0 : 1
    }, rest);
  })),
      _step3;

  try {
    var _loop = function _loop() {
      var _step3$value = _step3.value,
          x = _step3$value.x,
          y = _step3$value.y,
          team = _step3$value.team;
      allTiles.find(function (tile) {
        return tile.x === x && tile.y === y && tile.z === 0;
      }).start = team;
    };

    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return allTiles;
}