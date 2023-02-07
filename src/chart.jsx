import { useState, useEffect, useRef } from "react";

import Chart from "chart.js/auto";
import JSON5 from "json5";
import { withResizeDetector } from "react-resize-detector";

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

function ChartComponent(props) {
  const code = props.children[0];

  const [chart, setChart] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  const destroyChart = () => {
    if (chart) chart.destroy();
  };
  const renderChart = () => {
    try {
      const ctx = canvasRef.current;
      const config = {
        ...JSON5.parse(code),
        // Animation must be disabled to convert canvas into image
        options: { animation: false },
      };
      const newChart = new Chart(ctx, config);
      setChart(newChart);
      setImageUrl(newChart.toBase64Image());
      setError(null);
    } catch (e) {
      setChart(null);
      setImageUrl(null);
      setError(e);
    }
  };

  // Rerender when the code content or the window width changes
  useEffect(() => {
    destroyChart();
    renderChart();
  }, [code, props.width]);

  return (
    <div className="chartjs">
      {error ? (
        <ChartError error={error} />
      ) : (
        <img src={imageUrl} style={{ backgroundColor: "transparent" }} />
      )}
      <canvas key={code} ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default withResizeDetector(ChartComponent);
