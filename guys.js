var Guy = function(){
  this.cx = axes.x(50);
  this.cy = axes.y(50);
  this.fill = '#ff6600';
  this.r = 10;
};

Guy.prototype.setX = function (cx) {
  if ( cx > axes.x(95) ) {
    this.cx = axes.x(95);
  } else if ( cx < axes.x(5)) {
    this.cx = axes.x(5);
  } else {
    this.cx = cx;
  }
};

Guy.prototype.setY = function (cy) {
  if ( cy > axes.y(95) ) {
    this.cy = axes.y(95);
  } else if ( cy < axes.y(5)) {
    this.cy = axes.y(5);
  } else {
    this.cy = cy;
  }
};


var GoodGuy = function() {
  Guy.call(this);
  this.element;
};

GoodGuy.prototype = Object.create(Guy.prototype);
GoodGuy.prototype.constructor =  GoodGuy;
GoodGuy.prototype.render = function(){
  this.element = d3.select('svg').append('circle')
                    .attr('r', this.r)
                    .attr('cx', this.cx)
                    .attr('cy', this.cy)
                    .attr('fill', this.fill);


  var self = this;
  var dragMove = function() {
    self.setX(self.cx  + d3.event.dx);
    self.setY(self.cy + d3.event.dy);

    self.element.attr('cx', self.cx);
    self.element.attr('cy', self.cy);
  };

  drag = d3.behavior.drag().on('drag', dragMove);
  this.element.call(drag);

};


var BadGuy = function(i){
  Guy.call(this);
  this.id = i;
  this.fill = 'url(#image)';
  this.cx = getRandom(axes.x);
  this.cy = getRandom(axes.y);
};

BadGuy.prototype = Object.create(Guy.prototype);
BadGuy.prototype.constructor = BadGuy;


