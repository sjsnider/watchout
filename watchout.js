// start slingin' some d3 here.

var gameOptions = {
  width: 960,
  height: 500,
  numEnemies: 20
};

var scoreBoard = {
  currentScore : 0,
  highScore : 0,
  collisions : 0
};

var axes = {
  x : d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  y : d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
};

//get random number between 0 and 99 using scale linear
var getRandom = function(axes){
  return axes.call(this, (Math.floor(Math.random()*100)));
};

var svg  = d3.select('body').append('svg')
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height);



var runUpdates = function(){
  setInterval(function(){
  // update current score
  scoreBoard.currentScore = scoreBoard.currentScore + 1 ;

  // Update high score
  if(scoreBoard.currentScore > scoreBoard.highScore) {
    scoreBoard.highScore = scoreBoard.currentScore;

    d3.select('.high').data([scoreBoard.highScore])
      .text(function (d) {
        return d;
      });
  }

  d3.select('.current').data([scoreBoard.currentScore])
  .text(function(d){return d});
    for (var x = 0; x < badGuys.length; x++){
      badGuys[x].cx = getRandom(axes.x);
      badGuys[x].cy = getRandom(axes.y);
    }

    var collisionDetectionAndMoveEnemies = function (enemy) {
      var domEnemy = d3.select(this);
      var startPos =  { cx : parseFloat(domEnemy.attr('cx')), cy : parseFloat(domEnemy.attr('cy'))};
      var endPos = { cx : enemy.cx, cy : enemy.cy};

      return function (t) {

        checkCollision(domEnemy);
        var nextPosCx = checkCx(startPos.cx  + (endPos.cx - startPos.cx) * t);
        var nextPosCy = checkCy(startPos.cy  + (endPos.cy - startPos.cy) * t);
        domEnemy.attr('cx', nextPosCx).attr('cy', nextPosCy);
      };
    };


    d3.selectAll('circle.enemy').data(badGuys).transition()
      .duration(2000)
      .tween('custom', collisionDetectionAndMoveEnemies);


    var checkCollision = function (domEnemy) {
      var diffX = parseFloat(domEnemy.attr('cx')) - goodGuy.cx;
      var diffY = parseFloat(domEnemy.attr('cy')) - goodGuy.cy;
      var distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
      if( distance < goodGuy.r + parseFloat(domEnemy.attr('r'))) {
        scoreBoard.collisions++;
        d3.select('.collisions').data([scoreBoard.collisions])
          .text(function (d) {
          return d;
        });
        scoreBoard.currentScore = 0;
        d3.select('.current').data([scoreBoard.currentScore])
          .text(function(d){return d;});
      }
    };
  }

  ,2000);
};

var checkCx = function (cx) {
  if ( cx > axes.x(95) ) {
    cx = axes.x(95);
  } else if ( cx < axes.x(5)) {
    cx = axes.x(5);
  }
  return cx ;
};

var checkCy = function (cy) {
  if ( cy > axes.y(95) ) {
    cy = axes.y(95);
  } else if ( cy < axes.y(5)) {
    cy = axes.y(5);
  }
  return cy ;
};

var goodGuy =  new GoodGuy();


var badGuys = [];
for (var i=0; i<gameOptions.numEnemies; i++) {
  badGuys.push(new BadGuy(i));
}

var render = function(){

  goodGuy.render(svg);

  d3.select('svg').selectAll().data(badGuys, function(d){
    return d.id;
  })
    .enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d){return d.cx;})
    .attr('cy', function(d){return d.cy;})
    .attr('r', function(d){return d.r;})
    .attr('fill', function(d){return d.fill;});

  d3.select('.scoreboard')
    .selectAll('div')
    .selectAll('span').data([0,0,0]);
    runUpdates();
};
render();







