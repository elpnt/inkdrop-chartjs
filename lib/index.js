"use strict";

var React = _interopRequireWildcard(require("react"));

var _chart = _interopRequireDefault(require("chart.js"));

var _inkdrop = require("inkdrop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ChartError(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ui error message"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, "Failed to render chart"), /*#__PURE__*/React.createElement("p", null, props.error.name, ": ", props.error.message));
}

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = /*#__PURE__*/React.createRef();
    this.state = {
      prevCode: null,
      chart: null,
      error: null
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.children[0] != prevProps.children[0]) {
      this.destroyChart();
      this.renderChart();
    }
  }

  destroyChart() {
    if (this.state.chart) {
      this.state.chart.destroy();
    }
  }

  renderChart() {
    try {
      const code = this.props.children[0];
      const json = JSON.parse(code);
      const chart = new _chart.default(this.chartRef.current.lastChild, json);
      this.setState({
        prevCode: code,
        chart: chart,
        error: null
      });
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }

  render() {
    const {
      error
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      ref: this.chartRef
    }, error ? /*#__PURE__*/React.createElement(ChartError, {
      error: error
    }) : null, /*#__PURE__*/React.createElement("canvas", {
      className: error ? 'hiddenCanvas' : null
    }));
  }

}

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkCodeComponents['chart'] = ChartComponent;
  },

  deactivate() {}

};