"use babel";

import ChartComponent from "./chart";
import { markdownRenderer } from "inkdrop";
import CodeMirror from "codemirror";

const CHART_MODE_INFO = {
  name: "chart",
  mime: "application/json",
  mode: "javascript",
};

module.exports = {
  config: {
    responsive: {
      title: "Responsive re-rendering (default: ON)",
      description: "Re-render a chart when the preview pane is resized",
      type: "boolean",
      default: true,
    },
  },

  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents["chart"] = ChartComponent;
    }
    if (CodeMirror) {
      CodeMirror.modeInfo.push(CHART_MODE_INFO);
    }
  },

  deactivate() {
    if (markdownRenderer) {
      const { remarkPlugins, remarkCodeComponents } = markdownRenderer;
      const i = remarkPlugins.indexOf(ChartComponent);
      if (i >= 0) remarkPlugins.splice(i, 1);
      if (remarkCodeComponents.chart === ChartComponent) {
        delete remarkCodeComponents.chart;
      }
    }
    if (CodeMirror) {
      const { modeInfo } = CodeMirror;
      const i = modeInfo.indexOf(CHART_MODE_INFO);
      if (i >= 0) modeInfo.splice(i, 1);
    }
  },
};
