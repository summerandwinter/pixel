Page({
  data: {
  },

  isMoving:false,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  tanslateX: 0,
  tanslateY: 0,
  centerX: 0,
  centerY: 0,
  context: null,
  width: 320,
  height: 504,
  scale: 1,
  isZooming: false,
  touchstart: function (e) {   
    if(e.touches.length == 1){
      console.log("单指触摸");
      this.isMoving = true;
      this.x = e.touches[0].x;
      this.y = e.touches[0].y;
      console.log("touch:" + "(" + e.touches[0].x + "," + e.touches[0].y + ")");
    }else if (e.touches.length == 2) {
      console.log("双指触摸");
      this.isZooming = true;
      var xMove = e.touches[1].x - e.touches[0].x;
      var yMove = e.touches[1].y - e.touches[0].y;
      this.centerX = (e.touches[1].x + e.touches[0].x) / 2;
      this.centerY = (e.touches[1].y + e.touches[0].y) / 2;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove) ;
      this.distance = distance;
      this.w = Math.abs(xMove);
      this.h = Math.abs(yMove);
      this.draw();
    }
  },
  touchmove: function (e) {
    if (e.touches.length == 1) {
      if (this.isMoving && !this.isZooming){
        console.log("单指移动");
        var xmove = e.touches[0].x - this.x;
        var ymove = e.touches[0].y - this.y;
        this.tanslateX = this.tanslateX + xmove;
        this.tanslateY = this.tanslateY + ymove;

        this.x = e.touches[0].x;
        this.y = e.touches[0].y;
        this.draw();
      }
      
    }else if (e.touches.length == 2) {
      if (this.isZooming){
        console.log("双指移动");
        var xMove = e.touches[1].x - e.touches[0].x;
        var yMove = e.touches[1].y - e.touches[0].y;
        var distance = Math.sqrt(xMove * xMove + yMove * yMove);

        var zoom = distance / this.distance;
        var scale = this.scale * zoom;
        centerX
        var centerX = (e.touches[1].x + e.touches[0].x) / 2 ;
        var centerY = (e.touches[1].y + e.touches[0].y) / 2;
        this.tanslateX -= ((this.centerX * zoom - this.centerX) - (centerX - this.centerX));
        this.tanslateY -= ((this.centerY * zoom - this.centerY) - (centerY - this.centerY));
        this.distance = distance;
        this.scale = scale;
        this.centerX = centerX;
        this.centerY = centerY;
        this.draw();
      }
      

    }
   
  }, 
  touchend: function (e) {
    if(this.isZooming){
      this.isZooming = false;
    }else{
      this.isMoving = false;
    }
  },
  touchcancel: function (e) { },
  draw: function(){
    this.context.scale(this.scale, this.scale);
    this.context.translate(this.tanslateX , this.tanslateY );
    var step = 50;
    var x = this.tanslateX;
    var y = this.tanslateY ;
    for(var i = 0; i< 10; i++){
      this.context.moveTo(x, y);
      this.context.lineTo(x, y + 500);
      
      x+= step;

    }

    x = this.tanslateX;
    y = this.tanslateY;
    for (var i = 0; i < 10; i++) {
      this.context.moveTo(x, y);
      this.context.lineTo(x + 500, y );
     
      y += step;

    }
    this.context.stroke()
    // Clear screen to white.
    //this.context.setFillStyle("green");
    //this.context.fillRect(0, 0, this.width, this.height);
    // Draw the black square.
    //this.context.setFillStyle("black");
    //this.context.fillRect(110, 202, 100, 100);  
    //this.context.save()
    this.context.beginPath()
    this.context.arc(this.centerX + this.tanslateX, this.centerY + this.tanslateX, 2, 0, 2 * Math.PI)
    this.context.setFillStyle('lightgreen')
    this.context.fill()
    this.context.draw();
  },
  onLoad: function(){
    var res = wx.getSystemInfoSync();
    var self = this;
    var width = res.windowWidth;
    var height = res.windowHeight;
    this.setData({width:width,height:height});
    this.context = wx.createCanvasContext('canvas');
    this.draw();
  }
})