var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 256,
    height = 256;
var svg = d3.select("#body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var x = d3.scaleBand()
    .domain(d3.range(board.length))
    .range([0, width]);

var y = d3.scaleBand()
    .domain(d3.range(board.length))
    .range([0, height]);

var color = d3.scaleSequential(d3.interpolateBlues)
    .domain([0, 26]);

var row = svg.selectAll(".row")
    .data(board)
  .enter().append("g")
    .attr("transform", (d, i) => `translate(0,${y(i)})`);
row.selectAll(".cell")
    .data(d => d)
  .enter().append("rect")
    .attr("x", (d, i) => x(i))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => color(d))