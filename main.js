$(document).ready(function () {
  var option = {
    container: ".line",
    marginTop: 20,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 70,
    height: 500
};

function PieChart(render_variable, ChartType) {
  
  var data = [
    { count: 33.3, percentage: 33.3, color: '#0082da' },
    { count: 66.3, percentage: 66.3, color: '#06243b' }
  ];

  var margin = { top: 20, right: 0, bottom: 00, left: 70 },
    width = 400 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom,
    radius = 90;

  var z = d3.scaleOrdinal()
    .range(["#0082da", "#06243b"]);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var pie = d3.pie()
    .sort(null)
    .value(function (d) {
      return d.count;
    });
  var svg = d3.select("#" + render_variable)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(140,120)");

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g");
  var keys = ["Male", "Female"];

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d, i) {
      return d.data.color;
    })
    .attr("stroke", "white")
    .attr("stroke-width", 1)

  g.append("text")
    .attr("transform", function (d) {
      var _d = arc.centroid(d);
      _d[0] *= 1.2;	//multiply by a constant factor
      _d[1] *= 1.2;	//multiply by a constant factor
      return "translate(" + _d + ")";
    })
    //.attr("dy", ".50em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function (d) {
      if (d.data.count < 8) {
        return '';
      }
      return d.data.percentage + '%';

    });

  svg.append("g")
  .append("text")
      .attr("class", "view")
      .attr("y", height/2 +10)
      .attr("transform", "translate(-135,-15)")
      .attr("text-anchor", "start")
      .text("View");

  svg.append("g")
    .append("text")
    .attr("class", "toplabel")
    .attr("x", 2)
    .attr("y", 1)
    .attr("transform", "translate(-80,-100)")
    .text("Pie Alternative Syntax");

  var legend = svg.append("g")
    .attr("class", "legendlabel")
    .attr("text-anchor", "right")
    .selectAll("g")
    .data(keys)
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


  if (ChartType == "GoogleCharts") {
    legend.append("rect")
      .attr("x", width / 2)
      .attr("y", -25)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", z)
      .attr("transform", "translate(-80,0)");




    legend.append("text")
      .attr("x", width / 2)
      .attr("y", -14)
      .attr("transform", "translate(-60,-4)")
      .attr("dy", "0.4em")
      .text(function (d) { return d; })
  }
  if (ChartType == "HighCharts") {
    legend.append("rect")
      .attr("x", width / 2)
      .attr("y", -45)
      .attr("transform", "translate(-30,0)")
      .attr("width", 21)
      .attr("height", 19)
      .style("fill", z);

    svg.append("rect")
      .attr("x", width / 2 - 40)
      .attr("y", -55)
      .attr("rx", 10)
      .attr("rx", "10")
      .attr("width", 90)
      .attr("height", 60)
      .attr("fill", "none")
      .attr("stroke-width", "0.2px")
      .attr("stroke", "black");


    legend.append("text")
      .attr("class", "legendlabel")
      .attr("x", width / 2.05 + margin.bottom)
      .attr("y", -35)
      .attr("dy", "0.32em")
      .text(function (d) { return d; })
  }
}
function VerticalBarChart(render_variable, ChartType) {

  //Set the dimensions of the canvas / graph
  var margin = { top: 30, right: 20, bottom: 30, left: 70 },
    width = 400 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;

  var svg = d3.select("#" + render_variable)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.bottom + "," + margin.top + ")");
  //.attr("transform","translate(30,20)");
  if (ChartType == "GoogleCharts") {
    var x0 = d3.scaleBand()
      .rangeRound([0, width - margin.left])
      .paddingInner(0.4);

    var x1 = d3.scaleBand()
      .padding(0.05);

  }

  if (ChartType == "HighCharts") {
    var x0 = d3.scaleBand()
      .rangeRound([0, width - margin.left])
      .paddingInner(0.6);

    var x1 = d3.scaleBand()
      .padding(0.15);

  }

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
    .range(["#0082da", "#06243b"]);

  d3.csv("data1.csv", function (d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function (error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    var xScale = x0.domain(data.map(function (d) { return d.Month; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    //y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    var yScale = y.domain([0, 40]);



    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0).tickSize(0));

    svg.append("g")
      .attr("class", "axis")
      //.attr("transform", "translate(0," + height + ")")
      .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) { return d + "lbs" }).tickSize(-width+margin.right+margin.bottom))

    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(" + x0(d.Month) + ",0)"; })
      .selectAll("rect")
      .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
      .enter().append("rect")
      .attr("x", function (d) { return x1(d.key); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", function (d) { return z(d.key); });


    svg.append("g")
      .attr("class", "view")
      .append("text")
      .attr("x", 1)
      .attr("y", height + 20)
      .attr("transform", "translate(-30,0)")
      .attr("dy", "0.32em")
      .attr("text-anchor", "start")
      .text("View");


    svg.append("g")
      .append("text")
      .attr("class", "toplabel")
      .attr("x", width / 4 - margin.left)
      .attr("transform", "translate(-7,0)")
      .attr("y", -10)
      .text("Column Simple");



    var legend = svg.append("g")
      .attr("class", "legendlabel")
      .attr("text-anchor", "right")
      .selectAll("g")
      .data(keys)
      .enter().append("g")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    if (ChartType == "GoogleCharts") {



      legend.append("rect")
        .attr("x", width / 2)
        .attr("y", -25)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", z)
        .attr("transform", "translate(120,80)");




      legend.append("text")
        .attr("x", width / 2)
        .attr("y", -14)
        .attr("transform", "translate(140,75)")
        .attr("dy", "0.4em")
        .text(function (d) { return d; })
    }
    if (ChartType == "HighCharts") {
      legend.append("rect")
        .attr("x", width / 2)
        .attr("y", -45)
        .attr("transform", "translate(120,75)")
        .attr("width", 21)
        .attr("height", 19)
        .style("fill", z);

      svg.append("rect")
        .attr("x", width / 2 + 110)
        .attr("y", 20)
        .attr("rx", 10)
        .attr("rx", "10")
        .attr("width", 90)
        .attr("height", 60)
        .attr("fill", "none")
        .attr("stroke-width", "0.2px")
        .attr("stroke", "black");


      legend.append("text")
        .attr("class", "legendlabel")
        .attr("x", width / 2 + 35)
        .attr("y", -35)
        .attr("transform", "translate(110,75)")
        .attr("dy", "0.32em")
        .text(function (d) { return d; })
    }


  });
}

function HorizontalBarChart(render_variable, ChartType) {
  // Set the dimensions of the canvas / graph
  var margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 400 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;

  var svg = d3.select("#" + render_variable)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.bottom + "," + margin.top + ")");
  if (ChartType == "GoogleCharts") {
    var y0 = d3.scaleBand()
      .rangeRound([height, 0])
      .paddingInner(0.1);

    var y1 = d3.scaleBand()
      .padding(0.05);

    var z = d3.scaleOrdinal()
      .range(["#0082da", "#06243b"]);
  }
  if (ChartType == "HighCharts") {
    var y0 = d3.scaleBand()
      .rangeRound([height, 0])
      .paddingInner(0.4);

    var y1 = d3.scaleBand()
      .padding(0.15);

    var z = d3.scaleOrdinal()
      .range(["#06243b", "#0082da"]);

  }


  var x = d3.scaleLinear()
    .rangeRound([0, width]);

  var u = d3.scaleOrdinal()
    .range(["#0082da", "#06243b"]);
  var v = d3.scaleOrdinal()
    .range(["#06243b", "#0082da"]);

  d3.csv("data.csv", function (d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function (error, data) {
    if (error) throw error;
    var keys = data.columns.slice(1);
    if (ChartType == "HighCharts") {
      var keys = data.columns.slice(1).reverse();
    }

    y0.domain(data.map(function (d) { return d.Month; }));
    y1.domain(keys).rangeRound([0, y0.bandwidth()]);
    //x.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    x.domain([0, 40]);


    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(function (d) { return d + "lbs" }).tickSize(-width).ticks(3));

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y0).tickSize(0))

      .append("text")
      .attr("class", "view")
      .attr("y", height + 30)
      .attr("x", 1)
      .attr("transform", "translate(-30,0)")
      .attr("text-anchor", "start")
      .text("View");

    svg.append("g")
      .append("text")
      .attr("x", width / 2 - 165)
      .attr("y", -10)
      .attr("fill", "black")
      .attr("font-size", "15px")
      .text("Bar Simple");
    if (ChartType == "GoogleCharts") {
      var legend = svg.append("g")
        .attr("class", "legendlabel")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "right")
        .selectAll("g")
        .data(keys.slice())
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width / 2+margin.left*2.4)
        .attr("y",height-margin.left*2.1)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", z)

      legend.append("text")
        .attr("x", width / 2+margin.top+110)
        .attr("y", margin.left+17)
        //.attr("dy", "0.4em")
        .text(function (d) { return d; })
    }
    if (ChartType == "HighCharts") {
      var legend = svg.append("g")
        .attr("class", "legendlabel")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "right")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });
      legend.append("rect")
        .attr("x", width / 2+110)
        .attr("y", margin.top)
        .attr("width", 21)
        .attr("height", 19)
        .style("fill", u);

      svg.append("rect")
        .attr("x", width / 2 + 100)
        .attr("y", 20)
        .attr("rx", 10)
        .attr("rx", "10")
        .attr("width", 90)
        .attr("height", 60)
        .attr("fill", "none")
        .attr("stroke-width", "0.2px")
        .attr("stroke", "black");


      legend.append("text")
        .attr("class", "legendlabel")
        .attr("x", width / 2 + 135)
        .attr("y", margin.left-10)
       .attr("dy", "0.32em")
        .text(function (d) { return d; })
    }


    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(0," + y0(d.Month) + ")"; })
      .selectAll("rect")
      .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
      .enter().append("rect")
      .attr("y", function (d) { return y1(d.key); })
      .attr("data-index", function (d, i) {
        return d.value;
      })
      .attr("height", y1.bandwidth())
      .attr("width", function (d) { return x(d.value); })
      .attr("fill", function (d) { return z(d.key); });
  });
}



PieChart("area1", 'GoogleCharts');
PieChart("area2", 'HighCharts');
VerticalBarChart("area3", "GoogleCharts");
VerticalBarChart("area4", "HighCharts");
HorizontalBarChart("area5", 'GoogleCharts');
HorizontalBarChart("area6", "HighCharts");


});