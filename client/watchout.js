// start slingin' some d3 here.
(function(){
  var gameBoard = d3.select('.board').append('svg')
                .attr('width', 600)
                .attr('height', 400)
                .style('background-color', 'red')
                .style('background-position', 'center');

  var enemies = 15;

  var axes = {
    x: d3.scale.linear().domain([0,100]).range([0,600]),
    y: d3.scale.linear().domain([0,100]).range([0,400])
  };

  for(var i = 0; i < enemies; i++){
    d3.select('svg').append('circle')
                .attr('class', 'enemy')
                .attr('width', 20)
                .attr('height', 20)
                .attr('cx', Math.random() * (590 - 10) + 10)
                .attr('cy', Math.random() * (390 - 10) + 10)
                .attr('r', 10)
                .style('fill', 'black');
  }

  (function moveEnemies(){
    d3.select('svg').selectAll('.enemy')
                .transition()
                .duration(500)
                .each('end', function() {
                  d3.select(this)
                  .transition()
                  .duration(500)
                  .attr('cx', Math.random() * (590 - 10) + 10)
                  .attr('cy', Math.random() * (390 - 10) + 10);
                });
    setTimeout(moveEnemies, 1000);
  })();



})();

