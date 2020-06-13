import * as React from 'react';
import Chart from 'chart.js';
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
      error: null,
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
      const chart = new Chart(this.chartRef.current.lastChild, json);
      this.setState({
        prevCode: code,
        chart: chart,
        error: null,
      });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div ref={this.chartRef}>
        {error ? <ChartError error={error} /> : null}
        <canvas className={error ? 'hiddenCanvas' : null} />
      </div>
    );
  }
}

module.exports = {
  activate() {
    markdownRenderer.remarkCodeComponents['chart'] = ChartComponent;
  },
  deactivate() {},
};
