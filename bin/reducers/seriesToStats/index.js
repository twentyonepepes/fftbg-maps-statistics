"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seriesToStatistics = seriesToStatistics;

var _lodash = require("lodash");

function seriesToStatistics(series) {
  var sampleSize = series.length;

  if (sampleSize === 0) {
    return {
      sigma: Infinity,
      mean: 0,
      standardDeviation: 0,
      sampleSize: sampleSize
    };
  }

  var mean = (0, _lodash.mean)(series);
  var differences = series.map(function (m) {
    return m - mean;
  });
  var variances = differences.map(function (d) {
    return Math.pow(d, 2);
  });
  var variance = (0, _lodash.mean)(variances);
  var sigma = Math.sqrt(variance);
  return {
    sigma: sigma,
    mean: mean,
    sampleSize: sampleSize
  };
}