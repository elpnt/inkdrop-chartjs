'use babel';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js';
import RJSON from 'relaxed-json';

function ChartError(props) {
  return (
    <div className="ui error message">
      <div className="header">Failed to render chart</div>
      <p>
        {props.error.name}: {props.error.message}
      </p>
    </div>
  );
}

const getWidth = () => {
  document.getElementsByClassName('mde-preview')[0].clientWidth;
};

function ChartComponent(props) {
  const [chart, setChart] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(getWidth());
  const chartRef = useRef(null);

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  const renderChart = () => {
    try {
      const config = JSON.parse(RJSON.transform(props.children[0]));
      const canvas = chartRef.current.lastChild;
      const newChart = new Chart(canvas, config);
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
  };

  // render/rerender when the code changed
  useEffect(() => {
    destroyChart();
    renderChart();
  }, [props.children[0]]);

  // rerender when the window size changed
  useEffect(() => {
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

  return (
    <div class="chartjs" ref={chartRef}>
      {error ? (
        <ChartError error={error} />
      ) : (
        <img
          src={imageUrl}
          style={{
            backgroundColor: 'transparent',
            width: document.getElementsByClassName('mde-preview')[0]
              .clientWidth,
            height: 'auto',
          }}
        />
      )}
      <canvas style={{ display: 'none' }} />
    </div>
  );
}

export default ChartComponent;
