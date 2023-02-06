"use strict";
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireWildcard(require("prop-types"));

var _chart = _interopRequireDefault(require("chart.js"));

var _relaxedJson = _interopRequireDefault(require("relaxed-json"));

var _reactResizeDetector = require("react-resize-detector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ChartError(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ui error message"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, "Failed to render chart"), /*#__PURE__*/_react.default.createElement("p", null, props.error.name, ": ", props.error.message));
}

ChartError.propTypes = {
  error: _propTypes.default.shape({
    name: _propTypes.string,
    message: _propTypes.string
  })
};

function ChartComponent(props) {
  const responsive = inkdrop.config.get("chartjs.responsive");
  const [chart, setChart] = (0, _react.useState)(null);
  const [imageUrl, setImageUrl] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)(null);
  const chartRef = (0, _react.useRef)(null);
  const onResize = (0, _react.useCallback)(() => {
    if (responsive) {
      destroyChart();
      renderChart();
    }
  }, []);
  const {
    ref
  } = (0, _reactResizeDetector.useResizeDetector)({
    onResize,
    targetRef: chartRef
  });

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  const renderChart = () => {
    try {
      const canvas = chartRef.current.lastChild;
      const ctx = JSON.parse(_relaxedJson.default.transform(props.children[0]));
      const newChart = new _chart.default(canvas, ctx);
      newChart.update({
        duration: 0
      });
      setChart(newChart);
      setImageUrl(newChart.toBase64Image());
      setError(null);
    } catch (e) {
      setChart(null);
      setError(e);
    }
  }; // render/rerender when the code changed


  (0, _react.useEffect)(() => {
    destroyChart();
    renderChart();
  }, [props.children[0]]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "chartjs",
    ref: chartRef
  }, error ? /*#__PURE__*/_react.default.createElement(ChartError, {
    error: error
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    style: {
      backgroundColor: "transparent",
      width: document.getElementsByClassName("mde-preview")[0].clientWidth,
      height: "auto"
    }
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    ref: ref,
    style: {
      display: "none"
    }
  }));
}

ChartComponent.propTypes = {
  children: _propTypes.default.string
};
var _default = ChartComponent;
exports.default = _default;