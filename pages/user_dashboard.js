import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useSession } from "next-auth/react";

const data = [
  { category: "Category A", value: 20 },
  { category: "Category B", value: 30 },
  { category: "Category C", value: 10 },
  { category: "Category D", value: 40 }
];

const Dashboard = () => {
  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);
  const { data: session } = useSession();
  // email = session.user.email 
  // console.log(email)

  console.log(session)
  console.log(session)

  let email = 'NULL'

  if (session.user.email) {
    email = session.user.email
  }

  console.log(email)

  useEffect(() => {
    const width = 400;
    const height = 400;
    const svg1 = d3.select(svgRef1.current).attr('width', width).attr('height', height);
    const svg2 = d3.select(svgRef2.current).attr('width', width).attr('height', height);
    const svg3 = d3.select(svgRef3.current).attr('width', width).attr('height', height);

    // Pie Chart
    const radius = Math.min(width, height) / 3;
    const pie = d3.pie().value(d => d.value);
    const data_ready1 = pie(data);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const labelArc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);

    const legend = svg1.append('g')
        .attr('transform', `translate(${width - 100}, 20)`)
        .selectAll('g')
        .data(data_ready1)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0,${i * 25})`);
    
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(['#31255e', '#41327e', '#7465b1', '#978bc4']);
      

    const g1 = svg1.append('g')
    .attr('transform', `translate(${width / 3}, ${height / 2})`);

    g1.selectAll('slices')
        .data(data_ready1)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colorScale(i))

    g1.selectAll('text')
        .data(data_ready1)
        .enter()
        .append('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .style('fill', 'white')
        .text(d => d3.format(".0%")(d.data.value/ d3.sum(data, d => d.value)));
      

    legend.append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', (d, i) => colorScale(i))
    
    legend.append('text')
        .attr('x', 25)
        .attr('y', 10)
        .style('font-size', 14)
        .text(d => d.data.category);
    

    // Bar Chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, innerWidth])
      .padding(0.1)
      .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
      .range([innerHeight, 0])
      .domain([0, d3.max(data, d => d.value)]);

    const g2 = svg2.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g2.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('height', d => innerHeight - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', d => d3.schemeCategory10[1]);

    g2.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g2.append('g')
      .call(d3.axisLeft(y));

    // Line Chart
    const line = d3.line()
      .x(d => x(d.category) + x.bandwidth() / 2)
      .y(d => y(d.value));

    const g3 = svg3.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g3.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', d3.schemeCategory10[2])
      .attr('stroke-width', 1.5)
      .attr('d', line);

    g3.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.category) + x.bandwidth() / 2)
      .attr('cy', (d) => y(d.value))
      .attr('r', 5)
      .attr('fill', '#4BC0C0');
  
    // Add x-axis label
    svg3
      .append('text')
      .attr('x', width / 2)  // <--- comma instead of semicolon
      .attr('y', height + margin.top + 20)
      .style('text-anchor', 'middle')
      .text('Date');
  
    // Add y-axis label
    svg3
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - height / 2)
      .attr('y', margin.left - 40)
      .style('text-anchor', 'middle')
      .text('Value');
  
    }, []);

    return (
        <div className="flex justify-around">
          <svg ref={svgRef1} width={300} height={300}></svg>
          <svg ref={svgRef2} width={300} height={300}></svg>
          <svg ref={svgRef3} width={500} height={400}></svg>
        </div>
      );
    };
    
    export default Dashboard;