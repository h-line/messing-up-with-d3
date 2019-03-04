import {
  area,
  axisBottom,
  axisLeft,
  curveCatmullRom,
  extent,
  max,
  scaleLinear,
  select,
} from 'd3';

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import PropTypes from 'prop-types';

// Stateless component function
const AreaChart = ({
  data,
  width,
  height,
  curve,
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

  // Create the scale for x axis.
  const xScale = scaleLinear()
    .domain(extent(data, d => d.x)) // domain: [min,max] of a
    .range([margins.left, chartWidth]);

  // Create the scale for y axis.
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.y)]) // domain [0,max] of b (start from 0)
    .range([chartHeight, margins.bottom]);

  // Create axes according to the scales
  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  // Generate an area
  const drawArea = area()
    .x(d => xScale(d.x))
    .y0(yScale(0))
    .y1(d => yScale(d.y));

  // Add an optional curve
  if (curve) {
    drawArea.curve(curveCatmullRom.alpha(0.5));
  }

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
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgb(255,0,0)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'rgb(255,255,0)', stopOpacity:1}} />
          </linearGradient>
        </defs>
        <path d={drawArea(data)} fill="url(#gradient)" />
      </g>
    </svg>
  );
};

// Property types for React to check whether the properties are of correct type
AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  curve: PropTypes.bool,
};

// Default values for component properties
AreaChart.defaultProps = {
  curve: false,
};

// Sample data
const testData = [
  { x: 1, y: 3 },
  { x: 2, y: 6 },
  { x: 3, y: 2 },
  { x: 4, y: 12 },
  { x: 5, y: 8 },
  { x: 6, y: 5 },
  { x: 7, y: 2 },
  { x: 8, y: 13 },
  { x: 9, y: 11 },
  { x: 10, y: 14 },
  { x: 11, y: 7 },
  { x: 12, y: 5 },
  { x: 13, y: 2 },
  { x: 14, y: 12 },
  { x: 15, y: 8 },
];

// Settings for the component
const testWidth = 950;
const testHeight = 500;
const testCurve = true;

// Create a component instance with the settings
const areaChart = (
  <AreaChart
    data={testData}
    width={testWidth}
    height={testHeight}
    curve={testCurve}
  />
);

// Render the component
ReactDOM.render(areaChart, document.querySelector('.area-chart'));
