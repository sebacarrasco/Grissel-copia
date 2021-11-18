import * as d3 from 'd3';

const margin  = {
    top: 70,
    bottom: 70,
    right: 30,
    left: 30,
};

const width = 800;
const height = 400;

export const createBarChart = (svg, categories) => {
    svg.attr("width", width)
        .attr("height", height)
        .attr("id", "svg-barplot");

    const barsContainer = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("id", "bars-container");

    const xScale = d3.scaleBand()
        .domain(categories.slice().sort((a, b) => d3.ascending(a.category, b.category)).map(d => d.category))
        .rangeRound([0, width - margin.left - margin.right])
        .padding(0.5);

    const xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .attr("id", "eje-x")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .transition()
        .duration(750)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", t => `translate(${-2.5 * t.length}, ${1.5*t.length}) rotate(-45)`);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(categories, c => c.quantity) || 100])
        .range([height - margin.top - margin.bottom, 0]);

    const heihgtScale = d3.scaleLinear()
        .domain([0, d3.max(categories, c => c.quantity) || 100])
        .range([0, height - margin.top - margin.bottom]);

    const yAxis = d3.axisLeft(yScale).ticks(10,"s");

    svg.append("g")
        .attr("id", "eje-y")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .transition()
        .duration(750)
        .call(yAxis);

    svg.append("g")
        .attr("id", "eje-y")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    barsContainer.selectAll("rect.category-bar")
        .data(categories, d => d.category)
        .join(
            enter =>
            {
                enter.append("rect")
                    .attr("id", (d) => `bar-${d.category}`)
                    .attr("class", "category-bar")
                    .attr("fill", "#4DC639")
                    .attr("y", height - margin.top - margin.bottom)
                    .attr("x", (d) => xScale(d.category))
                    .attr("width", xScale.bandwidth())
                    .attr("height", 0)
                    .transition()
                    .duration(750)
                    .attr("y", d => yScale(d.quantity))
                    .attr("height", d => heihgtScale(d.quantity))
                    .selection();
            }
        );
}

export const updateBarChart = (svg, categories) => {

    const xScale = d3.scaleBand()
        .domain(categories.slice().sort((a, b) => d3.ascending(a.category, b.category)).map(d => d.category))
        .rangeRound([0, width - margin.left - margin.right])
        .padding(0.5);

    const xAxis = d3.axisBottom(xScale);

    svg.select("#eje-x")
        .transition()
        .duration(750)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", t => `translate(${-2.5 * t.length}, ${1.5*t.length}) rotate(-45)`);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(categories, c => c.quantity) || 100])
        .range([height - margin.top - margin.bottom, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(10,"s");

    const heihgtScale = d3.scaleLinear()
        .domain([0, d3.max(categories, c => c.quantity) || 100])
        .range([0, height - margin.top - margin.bottom]);

    svg.select("#eje-y")
        .transition()
        .duration(750)
        .call(yAxis)

    svg.select("#bars-container")
        .selectAll("rect.category-bar")
        .data(categories, d => d.category)
        .join(
            enter =>
                enter.append("rect")
                    .attr("id", (d, i) => `bar-${d.category}`)
                    .attr("class", "category-bar")
                    .attr("fill", "#4DC639")
                    .attr("y", height - margin.top - margin.bottom)
                    .attr("x", (d) => xScale(d.category))
                    .attr("width", xScale.bandwidth())
                    .attr("height", 0)
                    .transition()
                    .duration(750)
                    .attr("y", d => yScale(d.quantity))
                    .attr("height", d => heihgtScale(d.quantity))
                    .selection(),
            update => 
                update
                    .transition()
                    .duration(750)
                    .attr("width", xScale.bandwidth())
                    .attr("y", d => yScale(d.quantity))
                    .attr("height", d => heihgtScale(d.quantity))
                    .attr("x", (d) => xScale(d.category))
                    .selection(),
            exit =>
                exit.remove()
        );
}