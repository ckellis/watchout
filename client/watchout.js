// start slingin' some d3 here.
(function(){
  var width = 600;
  var height = 400;

  var gameStats = {
    score: 0,
    bestScore: 0,
    collisions: 0
  };

  var gameBoard = d3.select('.board').append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background-color', 'red')
                .style('background-position', 'center');

  var updateScore = function() {
    d3.select('.current').text('Current score: ' + gameStats.score.toString());
  };

  var updateBestScore = function() {
    gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
    d3.select('.highscore').text('High score: ' + gameStats.bestScore.toString());
  };

  var updateCollisions = function() {
    d3.select('.collisions').text('Collisions: ' + gameStats.collisions.toString());
  };

  var drag = d3.behavior.drag()
             .on('drag', function() {
                player.attr('cx', d3.event.x)
                      .attr('cy', d3.event.y);
                playerProperties.x = player.attr('cx');
                playerProperties.y = player.attr('cy');
              });

  var playerProperties = {
    x: width/2,
    y: height/2,
    r: 10
  };

  var player = d3.select('svg').selectAll('.draggable')
                .data([playerProperties])
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
      y: Math.random() * ((height-10) - 10) + 10,
      r: 10
    }
  });

  var pattern = d3.select('svg').append("pattern")
                   .attr({ id:"hash4_4", width:"8", height:"8", patternUnits:"userSpaceOnUse"})
                   .append("rect")
                   .attr({ width:"4", height:"8"});

  d3.select('svg').selectAll('.enemy')
              .data(enemies, function(d){return d.id;})
              .enter().append('circle')
              .attr('class', 'enemy')
              .attr('cx', function(d){return d.x;})
              .attr('cy', function(d){return d.y;})
              .attr('r', 10)
              .style('fill', 'url(#hash4_4)');

  (function moveEnemies() {
      d3.select('svg').selectAll('.enemy')
                  .data(enemies, function(d){return d.id;})
                  .transition()
                  .duration(500)
                  .attr('cx', function(d) {
                    d.x = Math.random() * ((width-10) - 10) + 10
                    return d.x;
                  })
                  .attr('cy', function(d) {
                    d.y = Math.random() * ((height-10) - 10) + 10;
                    return d.y;
                  });
      setTimeout(moveEnemies, 1000);
  })();

  (function increaseScore() {
    gameStats.score++;
    updateScore();
    setTimeout(increaseScore, 50);
  })();

  var testCollision = function() {
    d3.selectAll('.enemy').each(function(d, i) {
      var enemy = d3.select(this);

      var radiusSum = parseFloat(enemy.attr('r')) + parseFloat(playerProperties.r);
      var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(playerProperties.x);
      var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(playerProperties.y);

      var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

      if (gameStats.score > 10 && separation < radiusSum) {
        gameStats.collisions++;
        updateCollisions();
        updateBestScore();
        gameStats.score = 0;
        updateScore();
      }
    }); 
  };
  setInterval(testCollision, 1);

})();

