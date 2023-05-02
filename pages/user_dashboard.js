import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const Dashboard = () => {
  const svgRef1 = useRef(null);


  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("user_email");
    console.log(email);
    async function fetchData() {
      try {
        const res = await fetch(`/api/userSurveyData?email=${email}`);
        const user_data = await res.json();

        const { schools } = user_data;
        console.log("User data:", user_data);
        console.log("School:", schools);
        const schoolValues = Object.values(schools)[0].flat();
        console.log("Schools:", schoolValues);

        const final_data = schoolValues.flat().reduce((acc, category) => {
          const existingCategory = acc.find(
            (item) => item.category === category
          );
          if (existingCategory) {
            existingCategory.value++;
          } else {
            acc.push({ category, value: 1 });
          }
          return acc;
        }, []);

        console.log(final_data);
        setFinalData(final_data);
      } catch (error) {
        console.error(error.message);
        console.log("No");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {

    const width = 400;
    const height = 400;
    const svg1 = d3.select(svgRef1.current).attr('width', width).attr('height', height);

    // Pie Chart
    const radius = Math.min(width, height) / 3;
    const pie = d3.pie().value(d => d.value);
    const data_ready1 = pie(finalData);

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
        .domain(finalData.map(d => d.category))
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
        .text(d => d3.format(".0%")(d.data.value/ d3.sum(finalData, d => d.value)));
      

    legend.append('rect')
        .attr('x', -15)
        .attr('y', -5)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', (d, i) => colorScale(i))
    
    legend.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .style('font-size', 14)
        .style('fill', 'white')
        .text(d => d.data.category);

    
    }, [finalData]);

    return (
      <>
        <div className="flex justify-center bg-gradient-to-tr from-purple-600 to-blue-900">
          <div className="pie-chart-container ">
            <div className="bg-transparent p-4 flex flex-col justify-between leading-normal">
              <div className="mb-2 text-center">
                <div className="text-white font-bold text-xl mb-2">
                  Ideology Distribution
                </div>
                <p className="text-white text-base">
                  This is your distribution based on your survey answers.
                </p>
              </div>
              <svg ref={svgRef1} width={500} height={500}></svg>
            </div>
          </div>
        </div>
        <div className="materials-container">
          <div className="bg-white border rounded-lg p-4 flex flex-col justify-between leading-normal">
            <div className="mb-2">
              <div className="text-gray-900 font-bold text-xl mb-2">Materials</div>
              <p className="text-gray-700 text-base">
                Here are some materials to help you learn more.
              </p>
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              <div className="mr-4 mb-4">
                <a href="#" className="text-purple-500 font-semibold">
                  Article 1
                </a>
              </div>
              <div className="mr-4 mb-4">
                <a href="#" className="text-purple-500 font-semibold">
                  Article 2
                </a>
              </div>
              <div className="mr-4 mb-4">
                <a href="#" className="text-purple-500 font-semibold">
                  Article 3
                </a>
              </div>
              <div className="mr-4 mb-4">
                <a href="#" className="text-purple-500 font-semibold">
                  Article 4
                </a>
              </div>
              <div className="mr-4 mb-4">
                <a href="#" className="text-purple-500 font-semibold">
                  Article 5
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );  
    };
    
    export default Dashboard;