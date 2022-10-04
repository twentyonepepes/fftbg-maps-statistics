"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beta = void 0;
exports.generateMapStatistics = generateMapStatistics;
exports.maps = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rxjs = require("rxjs");

var _reducers = require("../reducers");

var _streams = require("../streams");

var _excluded = ["name", "number"];

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function generateMapStatistics() {
  return _generateMapStatistics.apply(this, arguments);
}

function _generateMapStatistics() {
  _generateMapStatistics = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var statsArray, beta, _loop, _i, _arr, statsMap, _iterator, _step, _ref2, name, number, rest;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _rxjs.firstValueFrom)(_streams.mapData$);

          case 2:
            statsArray = _context.sent;
            // console.log(statsArray);
            beta = {};

            _loop = function _loop() {
              var key = _arr[_i];
              var series = statsArray.map(function (s) {
                return s[key];
              });
              beta[key] = (0, _reducers.seriesToStatistics)(series);
            };

            for (_i = 0, _arr = ["tileCount", "passableTilePercentage", "lavaTilePercentage", "depthCount_gte1Percentage", "depthCount_gte2Percentage", "heightStandardDeviation", "averageMeanStartingDelta", "averageClosestStartingDelta", "meanTeam1HeightAdvantage"]; _i < _arr.length; _i++) {
              _loop();
            }

            ;
            console.table(beta);
            return _context.abrupt("return");

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateMapStatistics.apply(this, arguments);
}

var _generateMapStatistic = generateMapStatistics(),
    _generateMapStatistic2 = (0, _slicedToArray2["default"])(_generateMapStatistic, 2),
    beta = _generateMapStatistic2[0],
    maps = _generateMapStatistic2[1];

exports.maps = maps;
exports.beta = beta;