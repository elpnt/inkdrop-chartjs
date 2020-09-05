"use strict";
'use babel';

var _chart = _interopRequireDefault(require("./chart"));

var _inkdrop = require("inkdrop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkCodeComponents['chart'] = _chart.default;
  }

};