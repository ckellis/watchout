// start slingin' some d3 here.
(function(){
  var width = 600;
  var height = 400;

  var gameBoard = d3.select('.board').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-color', 'red')
                .style('background-position', 'center');

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

  var numEnemies = 15;

  var enemies = _.range(0, numEnemies).map(function(item) {
    return {
      id: item,
      x: Math.random() * ((width-10) - 10) + 10,
      y: Math.random() * ((height-10) - 10) + 10
    }
  });

    d3.select('svg').selectAll('.enemy')
                .data(enemies, function(d){return d.id;})
                .enter().append('circle')
                .attr('class', 'enemy')
                .attr('cx', function(d){return d.x;})
                .attr('cy', function(d){return d.y;})
                .attr('r', 10)
                .style('fill', 'black');

(function moveEnemies(){
    d3.select('svg').selectAll('.enemy')
                .data(enemies, function(d){return d.id;})
                .transition()
                .duration(500)
                .attr('cx', function(d) { return Math.random() * ((width-10) - 10) + 10; })
                .attr('cy', function(d) { return Math.random() * ((height-10) - 10) + 10; });
    setTimeout(moveEnemies, 1000);
})();


  var testCollision = function(){

  };

})();

