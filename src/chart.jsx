"use babel";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes, { string } from "prop-types";
import Chart from "chart.js";
import RJSON from "relaxed-json";
import { useResizeDetector } from "react-resize-detector";

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
ChartError.propTypes = {
  error: PropTypes.shape({
    name: string,
    message: string,
  }),
};

function ChartComponent(props) {
  const responsive = inkdrop.config.get("chartjs.responsive");

  const [chart, setChart] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  const onResize = useCallback(() => {
    if (responsive) {
      destroyChart();
      renderChart();
    }
  }, []);
  const { ref } = useResizeDetector({
    onResize,
    targetRef: chartRef,
  });

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  const renderChart = () => {
    try {
      const canvas = chartRef.current.lastChild;
      const ctx = JSON.parse(RJSON.transform(props.children[0]));
      const newChart = new Chart(canvas, ctx);
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

  return (
    <div className="chartjs" ref={chartRef}>
      {error ? (
        <ChartError error={error} />
      ) : (
        <img
          src={imageUrl}
          style={{
            backgroundColor: "transparent",
            width:
              document.getElementsByClassName("mde-preview")[0].clientWidth,
            height: "auto",
          }}
        />
      )}
      <canvas ref={ref} style={{ display: "none" }} />
    </div>
  );
}

ChartComponent.propTypes = {
  children: PropTypes.string,
};

export default ChartComponent;
