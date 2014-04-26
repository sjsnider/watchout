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

var box =  d3.select('body').append('div')
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height)
    .attr('class', 'board');


var svg  = d3.select('div.board').append('svg')
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
    for (var x=0; x<badGuys.length; x++){
      badGuys[x].cx = getRandom(axes.x);
      badGuys[x].cy = getRandom(axes.y);
    }

    d3.selectAll('circle').data(badGuys).transition()
      .duration(500)
      .attr('cx', function(d) {return d.cx;})
      .attr('cy', function(d) {return d.cy;});
  },500);
};

var goodGuy =  new GoodGuy();
var badGuys = [];
for (var i=0; i<gameOptions.numEnemies; i++) {
  badGuys.push(new BadGuy(i));
}

var render = function(){
  d3.select('.scoreboard')
    .selectAll('div')
    .selectAll('span').data([0,0,0]);

  d3.select('svg').append('path')
    .attr('d', goodGuy.path)
    .attr('fill', goodGuy.fill);

  d3.select('svg').selectAll().data(badGuys, function(d){
    return d.id;})
    .enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d){return d.cx;})
    .attr('cy', function(d){return d.cy;})
    .attr('r', function(d){return d.r;});

    runUpdates();
};
render();







