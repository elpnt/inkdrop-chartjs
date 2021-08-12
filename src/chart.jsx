"use babel";

import React, { useState, useEffect, useRef } from "react";
import PropTypes, { string } from "prop-types";
import Chart from "chart.js";
import RJSON from "relaxed-json";
import useResizeAware from "react-resize-aware";

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
  const [chart, setChart] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const [resizeListener, divSize] = useResizeAware();

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

  // rerender when the preview pane size changed
  useEffect(() => {
    const responsive = inkdrop.config.get("chartjs.responsive");
    if (responsive) {
      destroyChart();
      renderChart();
    }
  }, [divSize.width]);

  return (
    <div className="chartjs" ref={chartRef}>
      {resizeListener}
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
      <canvas style={{ display: "none" }} />
    </div>
  );
}

ChartComponent.propTypes = {
  children: PropTypes.string,
};

export default ChartComponent;
