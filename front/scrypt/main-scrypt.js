var pubs =
{
    "name": "DESEPTIBOT",
    "children": [
        {
            "name": "BITTREX",
					"children": [
                {"name": "BTC",
								 "children": [
                    {"name": "ETH"},
                    {"name": "LTC"},
                    {"name": "EOS"},
                    {"name": "IOTA"},
                    {"name": "ETC"},
                    {"name": "XRP"},
                    {"name": "DASH"},
                    {"name": "OMG"},
                    {"name": "XMR"},
                    {"name": "ZEC"},
                    {"name": "SAN"},
                    {"name": "BCU"},
                    {"name": "BCC"},
                    {"name": "RRT"}
								]},
                {"name": "ETH",
								 "children": [
                    {"name": "EOS"},
                    {"name": "IOTA"},
                    {"name": "OMG"},
                    {"name": "SAN"},
								]},
                {"name": "USD",
								 "children": [
                    {"name": "EOS"},
                    {"name": "IOTA"},
                    {"name": "OMG"},
                    {"name": "SAN"}, 
									 	{"name": "BTC"},
                    {"name": "ETH"},
                    {"name": "LTC"},
                    {"name": "ETC"},
									 	{"name": "XRP"},
                    {"name": "DASH"},
                    {"name": "XMR"}, 
									 	{"name": "ZEC"},
                    {"name": "BCU"},
                    {"name": "BCC"},
									 	{"name": "RRT"}
								]}
            ]
        },
 
			{"name": "POLONIEX",
					"children": [
                {"name": "BTC",
								 "children":[
                    {"name": "AMP"},
                    {"name": "ARDR"},
                    {"name": "BCN"},
                    {"name": "BCY"},
                    {"name": "BELA"},
                    {"name": "BLK"},
									 	{"name": "BTCD"},
                    {"name": "BTM"},
                    {"name": "BTS"},
                    {"name": "BURST"},
                    {"name": "CLAM"},
                    {"name": "DASH"},
									 	{"name": "DCR"},
                    {"name": "DGB"},
                    {"name": "DOGE"},
                    {"name": "EMC2"},
                    {"name": "ETC"},
                    {"name": "ETH"},
									 	{"name": "EXP"},
                    {"name": "FCT"},
                    {"name": "FLDC"},
                    {"name": "FLO"},
                    {"name": "GAME"},
                    {"name": "GNO"},
									  {"name": "GNT"},
                    {"name": "GRC"},
                    {"name": "HUC"},
                    {"name": "LBC"},
                    {"name": "LSK"},
                    {"name": "LTC"},
									 	{"name": "MAID"},
                    {"name": "NAUT"},
                    {"name": "NAV"},
                    {"name": "NEOS"},
                    {"name": "NMC"},
                    {"name": "NOTE"},
									 	{"name": "NXC"},
                    {"name": "NXT"},
                    {"name": "OMNI"},
                    {"name": "PASC"},
                    {"name": "POT"},
                    {"name": "PPC"},
									 	{"name": "RADS"},
                    {"name": "REP"},
                    {"name": "RIC"},
                    {"name": "SBD"},
                    {"name": "SC"},
                    {"name": "SJCX"},	 
									 	{"name": "STEEM"},
									 	{"name": "STR"},
                    {"name": "STRAT"},
                    {"name": "SYS"},
                    {"name": "VIA"},
                    {"name": "VRC"},
                    {"name": "VTC"},
									  {"name": "XBC"},
                    {"name": "XCP"},
                    {"name": "XEM"},
                    {"name": "XMR"},
                    {"name": "XPM"},
                    {"name": "XRP"},
									 	{"name": "XVC"},
                    {"name": "ZEC"}
                ]},
						{"name": "ETH",
								 "children":[
                    {"name": "ETC"},
                    {"name": "GNO"},
									  {"name": "GNT"},
                    {"name": "LSK"},
                    {"name": "REP"},
									 	{"name": "STEEM"},
                    {"name": "ZEC"}
                ]},
						{"name": "XMR",
								 "children":[
									 {"name": "BCN"},
									 {"name": "BLK"},
									 {"name": "BTCD"},
									 {"name": "DASH"},
									 {"name": "LTC"},
									 {"name": "MAID"},
									 {"name": "NXT"},
                   {"name": "ZEC"}
                ]},
							{"name": "USDT",
								 "children":[
									 {"name": "BTC"},
									 {"name": "DASH"},
									 {"name": "ETC"},
									 {"name": "ETH"},
									 {"name": "LTC"},
									 {"name": "NXT"},
									 {"name": "REP"},
									 {"name": "STR"},
									 {"name": "XMR"},
									 {"name": "XRP"},
                   {"name": "ZEC"}
                ]},
					]}
			
    ]
};

var diameter = 1000;

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = diameter,
    height = diameter;
    
var i = 0,
    duration = 350,
    root;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 80])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", width )
    .attr("height", height )
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

root = pubs;
root.x0 = height / 2;
root.y0 = 0;

//root.children.forEach(collapse); // start with all children collapsed
update(root);

d3.select(self.frameElement).style("height", "1000px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 130; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", 10)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1)
      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

  // TODO: appropriate transform
  var nodeExit = node.exit().transition()
      .duration(duration)
      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  
  update(d);
}

// Collapse nodes
function collapse(d) {
  if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
}