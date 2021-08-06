
let display = function(d) {

    var palette = [ 
        "#6272a4",
        "#8be9fd",
        "#ffb86c",
        "#ff5555",
        "#ff79c6",
        "#bd93f9",
    ]


    let data =  d;

    let width = 400,
        height = 400,
        pack = data => d3.pack()
                .size([width - 2, height - 2])
                .padding(3)
                (d3.hierarchy({children: data})
                .sum(d => d.value));

    let defaultcolor = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10);
    
    let u = [...new Set(data.map(d => d.group))];
    
    let interpolated = d3.quantize(d3.interpolateHcl(palette[0], palette[4]), u.length);
    console.log(u)
    let colors2 = d3.scaleOrdinal()
                    .domain(data.map(d => d.r))
                    .range(palette);

    let colors3 = d3.scaleOrdinal()
                    .domain(u)
                    .range(interpolated);
    
    //let color = defaultcolor;
    let color = colors3;

    const root = pack(data);
    
    let svg = d3.select(".tx-graphs-force")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");
    
    const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    
    leaf.append("circle")
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.r));
    
}



{{ $csv := resources.Get "app/js/graphs/force.csv" }}

d3.csv('{{$csv.Permalink}}')
    .then(data => display(data))
