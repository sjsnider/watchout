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
  scoreBoard.currentScore++;

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
      // debugger;
      var startPos =  { cx : parseFloat(domEnemy.attr('cx')), cy : parseFloat(domEnemy.attr('cy'))};
      var endPos = { cx : enemy.cx, cy : enemy.cy};

      return function (t) {

        checkCollision(enemy);
        var nextPosCx = startPos.cx  + (endPos.cx - startPos.cx) * t;
        var nextPosCy = startPos.cy  + (endPos.cy - startPos.cy) * t;
        debugger;
        return domEnemy.attr('cx', nextPosCx).attr('cy', nextPosCy);
      };
    };

    d3.selectAll('circle.enemy').data(badGuys).transition()
      .duration(500)
      .tween('custom', collisionDetectionAndMoveEnemies);


    var checkCollision = function (domEnemy) {
      var diffX = domEnemy.cx - goodGuy.cx;
      var diffY = domEnemy.cy - goodGuy.cy;
      // debugger;
      var distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
      console.log(distance);
      if( distance < 50) {
        scoreBoard.collisions++;
        d3.select('.collisions').data([scoreBoard.collisions])
          .text(function (d) {
          return d;
        });
      }
    };

  }

  ,1000);
};

var goodGuy =  new GoodGuy();


var badGuys = [];
for (var i=0; i<gameOptions.numEnemies; i++) {
  badGuys.push(new BadGuy(i));
}

var render = function(){

  goodGuy.render(svg);

  d3.select('svg').selectAll().data(badGuys, function(d){
    return d.id;})
    .enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d){return d.cx;})
    .attr('cy', function(d){return d.cy;})
    .attr('r', function(d){return d.r;});

  d3.select('.scoreboard')
    .selectAll('div')
    .selectAll('span').data([0,0,0]);
    runUpdates();
};
render();







