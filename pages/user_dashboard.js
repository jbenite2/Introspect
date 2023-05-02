import React, { useRef, useEffect, useState } from 'react';
import Navbar from "./components/navbar/navbar";
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

        const categories = {
          "Deontology": 0,
          "Care Ethics": 0,
          "Utilitarianism": 0,
          "Virtue Ethics": 0,
        };
        
        const countByCategory = schoolValues.flat().reduce((acc, category) => {
          acc[category]++;
          return acc;
        }, categories);
        
        const final_data = Object.entries(countByCategory).map(([category, value]) => ({
          category,
          value,
        }));
        

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
        .range(['#271b54', '#41327e', '#7465b1', '#b6b0d6']);
      

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
      <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-blue-900">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <div className="pie-chart-container">
            <div className="bg-transparent p-4 flex flex-col justify-between leading-normal">
              <div className="mb-2 text-center">
                <div className="text-white font-bold text-xl mb-2">
                  Ideology Distribution
                </div>
                <p className="text-white text-base mb-4">
                  This is your ideological distribution based on your survey answers.
                </p>
              </div>
              <svg ref={svgRef1} className="flex justify-center"></svg>
              <div className="flex justify-center">
                {finalData.map((data) => (
                  <div className="text-white mx-4" key={data.category}>
                    <a href={`/learn/${data.category.toLowerCase()}`}>
                      {data.category}
                    </a>: {data.value}
                  </div>
                ))}
              </div>
              <p className="flex text-white justify-center mt-10" style={{fontWeight: "bold"}}>Resources</p>
              <a href="https://ethics.org.au/ethics-explainer-deontology/" target="_blank" className="flex text-white justify-center mt-2">Ethics Explainer: Deontology (article).</a>
              <a href="https://ethicsofcare.org/joan-tronto/#:~:text=An%20ethic%20of%20care%20is,and%20give%20care%20to%20others." target="_blank" className="flex text-white justify-center mt-2">What is Care Ethics?" by Joan Tronto (article)</a>
              <a href="https://rintintin.colorado.edu/~vancecd/phil3160/Nozick1.pdf" className="flex text-white justify-center mt-2">The Experience Machine" by Robert Nozick (article)</a>
              <a href="https://www.youtube.com/watch?v=x2kLOisfkPw" className="flex text-white justify-center mt-2">Virtue Ethics" by Wireless Philosophy (video).</a>
            </div>
          </div>
        </div>
      </div>
    );
    
    
    };
    
    export default Dashboard;