// start slingin' some d3 here.
(function(){
  var width = 600;
  var height = 400;

  var gameBoard = d3.select('.board').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-color', 'red')
                .style('background-position', 'center');

  var enemies = 15;

  var drag = d3.behavior.drag()
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'black'); });

  var player = d3.select('svg').selectAll('.draggable')
                .data([{ x: width/2, y: height/2, r: 10 }])
                .enter()
                .append('circle')
                .attr('class', 'player')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'yellow');

  for(var i = 0; i < enemies; i++){
    d3.select('svg').append('circle')
                .attr('class', 'enemy')
                .attr('width', 20)
                .attr('height', 20)
                .attr('cx', Math.random() * ((width-10) - 10) + 10)
                .attr('cy', Math.random() * ((height-10) - 10) + 10)
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
                  .attr('cx', Math.random() * ((width-10) - 10) + 10)
                  .attr('cy', Math.random() * ((height-10) - 10) + 10);
                });
    setTimeout(moveEnemies, 1000);
  })();

  var testCollision = function(){

  };

})();

