'use strict';
'use babel';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _chart = _interopRequireDefault(require('chart.js'));

var _relaxedJson = _interopRequireDefault(require('relaxed-json'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function ChartError(props) {
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'ui error message',
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'header',
      },
      'Failed to render chart'
    ),
    /*#__PURE__*/ _react.default.createElement(
      'p',
      null,
      props.error.name,
      ': ',
      props.error.message
    )
  );
}

const getWidth = () => {
  document.getElementsByClassName('mde-preview')[0].clientWidth;
};

function ChartComponent(props) {
  const [chart, setChart] = (0, _react.useState)(null);
  const [imageUrl, setImageUrl] = (0, _react.useState)('');
  const [error, setError] = (0, _react.useState)(null);
  const [width, setWidth] = (0, _react.useState)(getWidth());
  const chartRef = (0, _react.useRef)(null);

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  const renderChart = () => {
    try {
      const config = JSON.parse(
        _relaxedJson.default.transform(props.children[0])
      );
      const canvas = chartRef.current.lastChild;
      const newChart = new _chart.default(canvas, config);
      newChart.update({
        duration: 0,
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
  }, [props.children[0]]); // rerender when the window size changed

  (0, _react.useEffect)(() => {
    const callback = (event) => {
      setWidth(getWidth());
      destroyChart();
      renderChart();
    };

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  });
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      class: 'chartjs',
      ref: chartRef,
    },
    error
      ? /*#__PURE__*/ _react.default.createElement(ChartError, {
          error: error,
        })
      : /*#__PURE__*/ _react.default.createElement('img', {
          src: imageUrl,
          style: {
            backgroundColor: 'transparent',
            width: document.getElementsByClassName('mde-preview')[0]
              .clientWidth,
            height: 'auto',
          },
        }),
    /*#__PURE__*/ _react.default.createElement('canvas', {
      style: {
        display: 'none',
      },
    })
  );
}

var _default = ChartComponent;
exports.default = _default;
