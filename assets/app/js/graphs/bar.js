var palette = [ 
    "#6272a4",
    "#8be9fd",

    "#ffb86c",
    "#ff79c6",
    "#bd93f9",
    "#ff5555",
    "#f1fa8c"
];

var palette2 = ["#c6943c",
"#a97dc5",
"#6fb46f",
"#d168aa",
"#6090da"]

var data = [
    { "salesperson": "Bob", "sales": 33 },
    { "salesperson": "Robin", "sales": 12 },
    { "salesperson": "Anne", "sales": 41 },
    { "salesperson": "Mark", "sales": 16 },
    { "salesperson": "Joe2", "sales": 59 },
    { "salesperson": "Eve2", "sales": 38 },
    { "salesperson": "Karen2", "sales": 21 },
    { "salesperson": "Mark2", "sales": 16 },
    { "salesperson": "Joe", "sales": 59 },
    { "salesperson": "Eve", "sales": 38 },
    { "salesperson": "Karen", "sales": 21 }
];


// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1);

var x = d3.scaleLinear()
    .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".tx-graphs-bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// format the data
data.forEach(function (d) {
    d.sales = +d.sales;
});

let sorted = data.slice().sort((a, b) => d3.descending(a.sales, b.sales))
let min = d3.min(sorted, function (d) { return d.sales; });
let max = d3.max(sorted, function (d) { return d.sales; });

let colors = d3.scaleOrdinal()
    .domain(sorted.map(function (d) { return d.salesperson; }))
    .range(palette2);

let interpolated = d3.quantize(d3.interpolateHclLong(palette[0], palette[2]), sorted.length);
let colors2 = d3.scaleOrdinal()
                .domain(sorted.map(function (d) { return d.salesperson; }))
                .range(interpolated);
    

// Scale the range of the data in the domains
x.domain([0, d3.max(sorted, function (d) { return d.sales; })])
y.domain(sorted.map(function (d) { return d.salesperson; }));
//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
    .data(sorted)
    .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function (d) { return x(d.sales); })
            .attr("y", function (d) { return y(d.salesperson); })
            .attr("height", y.bandwidth())
            .attr("fill", function (d,i) {
                 return colors2(d.salesperson) 
                });

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));

