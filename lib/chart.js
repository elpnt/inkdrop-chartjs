"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _chart = _interopRequireDefault(require("chart.js"));

var _relaxedJson = _interopRequireDefault(require("relaxed-json"));

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
    this.state = {
      prevCode: null,
      // previous JSON config code
      chart: null,
      // Chart object
      canvasId: (0, _uuid.v4)(),
      // hash ID to give to the canvas
      imageURL: null,
      // PNG image URL converted from the canvas
      error: null
    };
  }

  componentDidMount() {
    this.chartRef.current.lastChild.id = this.state.canvasId;
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    // `props.children` is the json code you write in ```chart``` block.
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
      const code = _relaxedJson.default.transform(this.props.children[0]);

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
    const bodyWidth = document.getElementsByClassName('mde-preview')[0].clientWidth;
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.chartRef
    }, error ? /*#__PURE__*/_react.default.createElement(ChartError, {
      error: error
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: imageURL,
      style: {
        backgroundColor: 'transparent',
        width: bodyWidth,
        height: 'auto'
      }
    }), /*#__PURE__*/_react.default.createElement("canvas", {
      style: {
        display: 'none'
      }
    }));
  }

}

var _default = ChartComponent;
exports.default = _default;