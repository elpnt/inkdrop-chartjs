"use strict";
'use babel';

var _react = _interopRequireDefault(require("react"));

var _chart = _interopRequireDefault(require("chart.js"));

var _inkdrop = require("inkdrop");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChartError(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ui error message"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, "Failed to render chart"), /*#__PURE__*/_react.default.createElement("p", null, props.error.name, ": ", props.error.message));
}

class ChartComponent extends _react.default.Component {
  constructor(props) {
    super(props);
    this.chartRef = /*#__PURE__*/_react.default.createRef();
    const id = (0, _uuid.v4)();
    this.state = {
      prevCode: null,
      chart: null,
      canvasId: id,
      imageURL: null,
      error: null
    };
  }

  componentDidMount() {
    this.chartRef.current.lastChild.id = this.state.canvasId;
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.children[0] != prevProps.children[0]) {
      // this.destroyChart();
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
      const config = JSON.parse(code);
      const canvas = this.chartRef.current.lastChild;
      const chart = new _chart.default(canvas, config);
      chart.update({
        duration: 0
      });
      this.setState({
        prevCode: code,
        chart: chart,
        imageURL: chart.toBase64Image(),
        error: null
      });
    } catch (e) {
      this.setState({
        prevCode: null,
        chart: null,
        error: e
      });
    }
  }

  render() {
    const {
      imageURL,
      error
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.chartRef
    }, error ? /*#__PURE__*/_react.default.createElement(ChartError, {
      error: error
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: imageURL,
      style: {
        backgroundColor: 'transparent'
      }
    }), /*#__PURE__*/_react.default.createElement("canvas", {
      style: {
        display: 'none'
      }
    }));
  }

}

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkCodeComponents['chart'] = ChartComponent;
  },

  deactivate() {}

};