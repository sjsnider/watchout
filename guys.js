var Guy = function(){
  this.cx = axes.x(50);
  this.cy = axes.y(50);
  this.fill = '#ff6600';
  this.r = 10;
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


  var _this = this;
  var dragMove = function() {
    //debugger;
    _this.cx += d3.event.dx;
    _this.cy += d3.event.dy;

    _this.element.attr('cx', _this.cx);
    _this.element.attr('cy', _this.cy);
  };

  drag = d3.behavior.drag().on('drag', dragMove);
  this.element.call(drag);

};


var BadGuy = function(i){
  Guy.call(this);
  this.id = i;
  this.fill = '#000000';
  this.cx = getRandom(axes.x);
  this.cy = getRandom(axes.y);
};

BadGuy.prototype = Object.create(Guy.prototype);
BadGuy.prototype.constructor = BadGuy;


