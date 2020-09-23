"use strict";
"use babel";

var _chart = _interopRequireDefault(require("./chart"));

var _inkdrop = require("inkdrop");

var _codemirror = _interopRequireDefault(require("codemirror"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CHART_MODE_INFO = {
  name: "chart",
  mime: "application/json",
  mode: "javascript"
};
module.exports = {
  config: {
    responsive: {
      title: "Responsive re-rendering (default: ON)",
      description: "Re-render a chart when the preview pane is resized",
      type: "boolean",
      default: true
    }
  },

  activate() {
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkCodeComponents["chart"] = _chart.default;
    }

    if (_codemirror.default) {
      _codemirror.default.modeInfo.push(CHART_MODE_INFO);
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      const {
        remarkPlugins,
        remarkCodeComponents
      } = _inkdrop.markdownRenderer;
      const i = remarkPlugins.indexOf(_chart.default);
      if (i >= 0) remarkPlugins.splice(i, 1);

      if (remarkCodeComponents.chart === _chart.default) {
        delete remarkCodeComponents.chart;
      }
    }

    if (_codemirror.default) {
      const {
        modeInfo
      } = _codemirror.default;
      const i = modeInfo.indexOf(CHART_MODE_INFO);
      if (i >= 0) modeInfo.splice(i, 1);
    }
  }

};