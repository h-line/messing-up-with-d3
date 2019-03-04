import {
  scaleBand,
  scaleLinear,
  max,
  axisBottom,
  axisLeft,
  select,
} from 'd3';

import 'd3-selection-multi';

// Sample data
const data = [
  { label: 'A', quantity: 24 },
  { label: 'B', quantity: 15 },
  { label: 'C', quantity: 3 },
  { label: 'D', quantity: 2 },
  { label: 'E', quantity: 30 },
  { label: 'F', quantity: 21 },
  { label: 'G', quantity: 13 },
];

// Margins for the chart
const margins = {
  top: 10,
  right: 10,
  bottom: 90,
  left: 30,
};

// Size of the chart
const barChartWidth = 960 - margins.left - margins.right;
const barChartHeight = 500 - margins.top - margins.bottom;

// Create the scale for x axis according to the amount of data points.
// Calculates the bandwidth for one bar.
const xScale = scaleBand()
  .rangeRound([0, barChartWidth])
  .padding(0.03)
  .domain(data.map(d => d.label));

// Creates the scale for bar height according to the data values.
const yScale = scaleLinear()
  .range([barChartHeight, 0])
  .domain([0, max(data, d => d.quantity)]);

// Create axes according to the scales
const xAxis = axisBottom(xScale);
const yAxis = axisLeft(yScale);

// Create a container element for the chart
const barChart = select('.bar-chart')
  .attrs({
    width: barChartWidth + margins.left + margins.right,
    height: barChartHeight + margins.top + margins.bottom,
  })
  .append('g')
  .attrs({
    class: 'container',
    transform: `translate(${margins.left},${margins.top})`,
  });

// Visualize the x axis
barChart.append('g')
  .attrs({
    class: 'x axis',
    transform: `translate(0,${barChartHeight})`,
  })
  .call(xAxis)
  .selectAll('text');

// Visualize the y axis
barChart.append('g')
  .attrs({
    class: 'y axis',
  })
  .call(yAxis);

// Visualize the data with bars
barChart.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attrs({
    class: 'bar',
    x: d => xScale(d.label),
    width: xScale.bandwidth(),
    y: d => yScale(d.quantity),
    height: d => barChartHeight - yScale(d.quantity),
  });
