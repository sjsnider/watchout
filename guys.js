var Guy = function(){
  this.x = axes.x(50);
  this.y = axes.y(50);
  this.fill = '#ff6600';
};


var GoodGuy = function() {
  Guy.call(this);
  this.path = 'm230,144l31,1l-12,-19l-19,18z';
};

GoodGuy.prototype = Object.create(Guy.prototype);
GoodGuy.prototype.constructor =  GoodGuy;



var BadGuy = function(i){
  Guy.call(this);
  this.id = i;
  this.fill = '#000000';
  this.cx = getRandom(axes.x);
  this.cy = getRandom(axes.y);
  this.r = 10;
};

BadGuy.prototype = Object.create(Guy.prototype);
BadGuy.prototype.constructor = BadGuy;


