import {
  scaleBand,
  scaleLinear,
  max,
  axisBottom,
  axisLeft,
  select,
} from 'd3';

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import PropTypes from 'prop-types';

// Stateless component function
const BarChart = ({
  height,
  width,
  data,
}) => {
  // Margins for the chart
  const margins = {
    top: 10,
    right: 10,
    bottom: 90,
    left: 30,
  };

  // Size of the chart
  const chartHeight = height - margins.top - margins.bottom;
  const chartWidth = width - margins.left - margins.right;

  // Create the scale for x axis according to the amount of data points.
  // Calculates the bandwidth for one bar.
  const xScale = scaleBand()
    .rangeRound([0, chartWidth])
    .padding(0.03)
    .domain(data.map(d => d.label));

  // Creates the scale for bar height according to the data values.
  const yScale = scaleLinear()
    .range([chartHeight, 0])
    .domain([0, max(data, d => d.quantity)]);

  // Create axes according to the scales
  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  // Return the actual graph component
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        <g
          className="x axis"
          transform={`translate(0, ${chartHeight})`}
          ref={node => select(node).call(xAxis)}
        />
        <g
          className="y axis"
          ref={node => select(node).call(yAxis)}
        />
        {data.map(d => (
          <rect
            key={d.label}
            className="bar"
            x={xScale(d.label)}
            y={yScale(d.quantity)}
            width={xScale.bandwidth()}
            height={chartHeight - yScale(d.quantity)}
          />
        ))}
      </g>
    </svg>
  );
};

// Property types for React to check whether the properties are of correct type
BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

// Sample data
const testData = [
  { label: 'A', quantity: 24 },
  { label: 'B', quantity: 15 },
  { label: 'C', quantity: 3 },
  { label: 'D', quantity: 2 },
  { label: 'E', quantity: 30 },
  { label: 'F', quantity: 21 },
  { label: 'G', quantity: 13 },
];

// Settings for the component
const testWidth = 950;
const testHeight = 500;

// Create a component instance with the settings
const barChart = (
  <BarChart
    data={testData}
    width={testWidth}
    height={testHeight}
  />
);

// Render the component
ReactDOM.render(barChart, document.querySelector('.bar-chart'));
