//index.js
//获取应用实例
const Color = require('../../utils/color.js')
const app = getApp()

Page({
  data: {
    x:0,
    y:0,
    direction:"all",
  },
  onLoad: function () {
    var data = { "palette": { "0": "0.9294117647058824 0.7372549019607844 0.5843137254901961", "1": "0.9137254901960784 0.6588235294117647 0.4549019607843137", "2": "0.2823529411764706 0.6980392156862745 0.3215686274509804", "3": "0.8666666666666667 0.9254901960784314 0.984313725490196", "4": "0.8588235294117647 0.23137254901960785 0.3568627450980392", "5": "0.25882352941176473 0.6352941176470588 0.36470588235294116", "6": "0.8196078431372549 0.9058823529411765 0.9764705882352941", "7": "0.5294117647058824 0.7411764705882353 0.3764705882352941", "8": "0.8862745098039215 0.33725490196078434 0.4470588235294118", "9": "0.9882352941176471 0.9294117647058824 0.47058823529411764", "10": "0.9686274509803922 0.9921568627450981 1.0", "11": "0.7098039215686275 0.17254901960784313 0.26666666666666666", "12": "0.13333333333333333 0.11372549019607843 0.17254901960784313" }, "pixel_map": [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, 11, 4, 11, 11, 8, 8, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 11, 8, 8, 8, 8, 8, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 4, 4, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 11, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 0, 0, 12, 0, 0, 0, 12, 0, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 0, 0, 12, 0, 0, 0, 12, 0, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, 9, -1, -1, -1, -1, 9, -1, -1, -1, -1], [-1, -1, -1, -1, 3, 3, 3, 3, -1, 1, 0, 10, 10, 10, 10, 10, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1], [-1, -1, -1, 3, 3, 3, 3, 3, 6, 1, 0, 0, 10, 10, 10, 0, 0, 0, 6, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1], [-1, -1, -1, 3, 3, 3, 3, 3, 3, 6, 1, 0, 0, 0, 0, 0, 0, 6, 3, 3, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1], [-1, -1, -1, 3, 3, 3, 3, 3, 3, 6, 6, 1, 1, 1, 1, 6, 6, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1], [-1, -1, -1, -1, 3, 3, 3, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, 3, 3, 3, 6, 0, 1, 7, 7, 1, 1, 7, 7, 1, 0, 6, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, 3, 6, 0, 0, 7, 2, 2, 7, 7, 2, 2, 7, 0, 0, -1, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 0, 0, 1, 5, 2, 2, 2, 2, 2, 2, 5, 1, 0, 0, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, 0, 0, 1, 6, 6, 5, 5, 2, 2, 5, 5, 6, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, 0, 0, 0, 1, 6, 6, 7, 2, 2, 2, 2, 2, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, 0, 0, 0, 1, 6, 3, 7, 2, 2, 7, 2, 2, 7, 2, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, 1, -1, 3, 7, 2, 2, 2, 7, 2, 2, 7, 2, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 5, 2, 5, 5, 7, 2, 2, 2, 2, 7, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 5, 5, 5, 2, 7, 5, 2, 5, 2, 7, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, 5, 1, 5, 5, 2, 2, 5, 5, 2, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 1, 5, 5, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, 0, 0, 0, 1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 0, 0, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]] };
    var pixelMap = data.pixel_map;
    var palette = data.palette;
    var pixels = [];
    var palettes = [];
    var res = wx.getSystemInfoSync();
    
    var moveableHeight = pixelMap.length*21;
    var moveableWidth = pixelMap[0].length * 21;

    var areaWith = res.windowWidth;
    var ratio = res.windowWidth / moveableWidth;
    var araeHeight = ratio * moveableHeight;
    var x = -(moveableWidth - areaWith)/2;
    var y = -(moveableHeight - araeHeight)/2;
    this.setData({ width: res.windowWidth, height: res.windowHeight, moveableWidth: areaWith, moveableHeight: araeHeight, araeHeight: araeHeight, areaWith: areaWith, ratio: ratio,x:x,y:y});
    Object.keys(palette).forEach(function (key) {
      var pal = {};
      var c = palette[key].split(" ");
      console.log(c);
      var color = new Color.Color(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]))
      pal.color = color.toCSS();
      pal.num = key;
      pal.id = "paltte"+key;
      palettes.push(pal);

    });
    this.setData({ palettes: palettes});
    for (var i = 0; i < pixelMap.length; i++) {
      var row = [];
      for (var j = 0; j < pixelMap[i].length; j++) {
        var pixel = {};
        pixel.id = "pixel"+i+"_"+j;
        var v = pixelMap[i][j];
        if (v > -1) {
          var c = palette[v].split(" ");
          
          var color = new Color.Color(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]))
          pixel.color = color.toCSS();
          pixel.num = v;
          pixel.empty = false;
        } else {
          pixel.empty = true;
          if (i > 0 && j > 0 && i < pixelMap.length - 1 && j < pixelMap[i].length - 1) {
            var style = "empty";
            if (pixelMap[i][j - 1] == -1) {
              style += " le";
            }
            if (pixelMap[i - 1][j] == -1) {
              style += " te";
            }
            pixel.style = style;
          } else {
            pixel.style = "empty le te";
          }

        }
        row.push(pixel);
      }
      pixels.push(row);
    }
    this.setData({ pixels: pixels });
  }
})
