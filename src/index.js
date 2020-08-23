'use babel';

import React from 'react';
import Chart from 'chart.js';
import { v4 as uuidv4 } from 'uuid';
import { markdownRenderer } from 'inkdrop';

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

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      prevCode: null,
      chart: null,
      canvasId: uuidv4(), // hash ID to give to the canvas
      imageURL: null,
      error: null,
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
      const code = this.props.children[0];
      const config = JSON.parse(code);
      const canvas = this.chartRef.current.lastChild;
      const chart = new Chart(canvas, config);
      chart.update({
        duration: 0,
      });

      this.setState({
        prevCode: code,
        chart: chart,
        imageURL: chart.toBase64Image(),
        error: null,
      });
    } catch (e) {
      this.setState({ prevCode: null, chart: null, error: e });
    }
  }

  render() {
    const { imageURL, error } = this.state;
    return (
      <div ref={this.chartRef}>
        {error ? (
          <ChartError error={error} />
        ) : (
          <img src={imageURL} style={{ backgroundColor: 'transparent' }} />
        )}
        <canvas style={{ display: 'none' }} />
      </div>
    );
  }
}

module.exports = {
  activate() {
    markdownRenderer.remarkCodeComponents['chart'] = ChartComponent;
  },
};
