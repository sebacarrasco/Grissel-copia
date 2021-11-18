import * as d3 from 'd3';

const margin  = {
    top: 70,
    bottom: 70,
    right: 30,
    left: 30,
};
const width = 800;
const height = 400;

export const createLineChart = (svg, colormap) => {

    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${ width } ${ height }`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width - margin.right - margin.left)
        .attr("height", height - margin.top - margin.bottom);


    svg.select(".plot-container")
        .attr("transform", `translate(${margin.left} ${margin.top})`)
        .attr("clip-path", "url(#clip)");

    const yScale = d3
        .scaleLinear()
        .domain([])
        .range([height - margin.top - margin.bottom, 0]);

    const yAxis = d3.axisLeft(yScale);

    svg.select(".y-axis-container")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

    const xScale = d3
        .scaleLinear()
        .domain([])
        .range([0, width - margin.right - margin.left]);

    const xAxis = d3.axisBottom(xScale);

    svg.select(".x-axis-container")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

    // source: https://observablehq.com/@harrylove/draw-a-circle-dot-marker-on-a-line-path-with-d3
    svg.selectAll("defs")
        .data(colormap)
        .join("defs")
        .append('marker')
        .attr('id', d => `dot-${ d }`)
        .attr('viewBox', [0, 0, 20, 20])
        .attr('refX', 10)
        .attr('refY', 10)
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .append('circle')
        .attr('cx', 10)
        .attr('cy', 10)
        .attr('r', 3)
        .style('fill', d => d);
}


export const updateLineChart = (svg, data) => {

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d3.max(d.history, d => d.quantity)) + 10])
        .range([height - margin.top - margin.bottom, 0]);

    const yAxis = d3.axisLeft(yScale);

    svg.select(".y-axis-container")
        .transition()
        .duration(750)
        .call(yAxis);

    const xScale = d3
        .scaleTime()
        .domain([0, d3.max(data, (d) => d3.max(d.history, e => e.date)) + 20])
        .range([0, width - margin.right - margin.left]);

    const xAxis = d3.axisBottom(xScale);

    const xAxisContainer = svg.select(".x-axis-container")
        .transition()
        .duration(750)
        .call(xAxis)
        .selection();

    const lineGenerator = d3
        .line()
        .curve(d3.curveLinear)
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.quantity));

    const lines = svg.select(".plot-container")
        .selectAll("path")
        .data(data, d => d.id)
        .join(
            enter =>
                enter.append("path")
                .attr("stroke", d => d.color)
                .attr("fill", "transparent")
                .attr("d", d => lineGenerator(d.history))
                .transition()
                .duration(750)
                .attr("stroke-width", 2)
                .attr('marker-start', d=> `url(#dot-${ d.color })`)
                .attr('marker-mid', d=> `url(#dot-${ d.color })`)
                .attr('marker-end', d=> `url(#dot-${ d.color })`)
                .selection(),
            update => 
                update.transition()
                .duration(750)
                .attr("d", d => lineGenerator(d.history))
                .selection(),
            exit => 
                exit.transition()
                .duration(750)
                .attr("stroke-width", 0)
                .remove()
        );

    const zoomManager = (event) => {
        const transformation = event.transform;
        const newXScale = transformation.rescaleX(xScale);
        lineGenerator.x(d => newXScale(d.date));
        lines.attr("d", d => lineGenerator(d.history));
        xAxisContainer.call(xAxis.scale(newXScale));
    }

    const zoom = d3.zoom()
        .extent([
            [0, 0],
            [width, height]
        ])
        .translateExtent([
            [0, 0],
            [width, height]
        ])
        .scaleExtent([1, 4])
        .on("zoom", zoomManager);

    svg.call(zoom);
}