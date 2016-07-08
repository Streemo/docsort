"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortIndex = sortIndex;
exports.push = push;
exports.pull = pull;

var _typetastic = require("typetastic");

function force(d1, d2, dir) {
  if (typeof d2 === "string") {
    return dir * d2.localeCompare(d1);
  }
  var v = dir * (d2 - d1 || 0);
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}
function compare(d1, d2, sort) {
  if ((0, _typetastic.type)(sort) === "object") {
    for (var k in sort) {
      var d = compare(d1[k], d2[k], sort[k]);
      if (d !== 0) {
        return d;
      };
    }
    return 0;
  }
  return force(d1, d2, sort);
}
function sortIndex(arr, d2, sort) {
  var min = 0,
      max = arr.length - 1;
  var mid = void 0,
      dP = void 0;
  while (min <= max) {
    mid = (max + min) / 2 | 0;
    dP = compare(arr[mid], d2, sort);
    min = dP < 0 ? min : dP > 0 ? mid + dP : mid--;
    max = dP > 0 ? max : dP < 0 ? mid + dP : mid;
  }
  return min;
}
function push(arr, d2, sort) {
  arr.splice(sortIndex(arr, d2, sort), 0, d2);
}
function pull(arr, d2, sort) {
  arr.splice(sortIndex(arr, d2, sort), 1);
}