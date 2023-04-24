import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const data = [
  { category: "Category A", value: 20 },
  { category: "Category B", value: 30 },
  { category: "Category C", value: 10 },
  { category: "Category D", value: 40 }
];

const PieChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 500;
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const radius = Math.min(width, height) / 2;
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Add group element and translate it to the center of the SVG
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);
  }, []);

  return (
    <div>
      <h1>Pie Chart</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
