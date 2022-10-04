"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("./server");

var _rxjs = require("rxjs");

var _reducers = require("./reducers");

var _streams = require("./streams");

var _names = _interopRequireDefault(require("./config/misc/names.json"));

var _seriesToStats = require("./reducers/seriesToStats");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var beta, maps, statsMap, nameMap, _iterator, _step, map, _iterator2, _step2, _map, number, _stats, _loop, key, normalizedStats, _i, _Object$entries, _Object$entries$_i, num, stats, normalized, _i2, _Object$entries2, _Object$entries2$_i, _key, value, _beta$_key, sigma, mean, normalizedValue;

  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log("Waiting")
          beta = {};
          _context.next = 3;
          return (0, _rxjs.firstValueFrom)(_streams.mapData$);

        case 3:
          maps = _context.sent;
          statsMap = {};
          nameMap = {};
          _iterator = _createForOfIteratorHelper(maps);

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              map = _step.value;

              try {
                (function () {
                  var number = map.num;
                  nameMap[number] = _names["default"].find(function (a) {
                    return a.number == number;
                  }).name;
                })();
              } catch (e) {
                console.log("E", map.num);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          _iterator2 = _createForOfIteratorHelper(maps);

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _map = _step2.value;
              number = _map.num;
              _stats = (0, _reducers.mapDataToMapStats)(_map);
              statsMap[number] = _stats;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          _loop = function _loop(key) {
            beta[key] = (0, _seriesToStats.seriesToStatistics)(Object.values(statsMap).map(function (a) {
              return a[key];
            }));
          };

          for (key in statsMap[0]) {
            _loop(key);
          }

          console.table(beta);
          normalizedStats = [];

          for (_i = 0, _Object$entries = Object.entries(statsMap); _i < _Object$entries.length; _i++) {
            _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), num = _Object$entries$_i[0], stats = _Object$entries$_i[1];
            normalized = {};

            for (_i2 = 0, _Object$entries2 = Object.entries(stats); _i2 < _Object$entries2.length; _i2++) {
              _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
              _beta$_key = beta[_key], sigma = _beta$_key.sigma, mean = _beta$_key.mean;
              normalizedValue = ~~((value - mean) / sigma); // const friendly = {
              // 	"-3":"F",
              // 	"-2":"E",
              // 	"-1":"D",
              // 	"0":"C",
              // 	"1":"B",
              // 	"2":"A",
              // 	"3":"S"
              // }

              normalized[_key] = normalizedValue;
            }

            normalizedStats.push(_objectSpread({
              name: nameMap[num],
              num: num
            }, normalized));
          }

          _streams.mapStats$.next(normalizedStats);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
console.info("[fft/mapper] Generating statistics");