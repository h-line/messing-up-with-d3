import {
  arc,
  interpolateRgb,
  min,
  pie,
} from 'd3';

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import PropTypes from 'prop-types';

// Stateless component function
const PieChart = ({
  height,
  width,
  data,
  innerRatio,
}) => {
  // Calculate inner and outer radius of the pie.
  // If innerRadiusRatio > 0, the chart will be a donut chart.
  const outerRadius = min([height, width]) / 2;
  let innerRadius = 0;
  if (innerRatio >= 0 && innerRatio <= 1) {
    innerRadius = outerRadius * innerRatio;
  }

  // Function for getting the arc for a slice in the pie
  const getArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  // Create an interpolator function to generate different color for each slice
  const interpolateColor = interpolateRgb('#4682b4', '#b97d4b');

  // Divide data into pie slices
  const pieData = pie()(data);

  // Set the arcs and the colors for each slice
  const slices = pieData.map((slice, index) => ({
    arc: getArc(slice),
    color: interpolateColor(index / (pieData.length - 1)),
  }));

  // Return the actual chart component
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        { slices.map(slice => (
          <path
            key={slice.color}
            d={slice.arc}
            fill={slice.color}
          />
        ))}
      </g>
    </svg>
  );
};

// Property types for React to check whether the properties are of correct type
PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  innerRatio: PropTypes.number,
};

// Default property types fot the component
PieChart.defaultProps = {
  innerRatio: 0,
};

// Sample data
const testData = [1, 2, 3, 4];

// Settings for the component
const testWidth = 500;
const testHeight = 500;
const testRatio = 0.5;

// Create a component instance with the settings
const pieChart = (
  <PieChart
    data={testData}
    width={testWidth}
    height={testHeight}
    innerRatio={testRatio}
  />
);

// Render the component
ReactDOM.render(pieChart, document.querySelector('.pie-chart'));
