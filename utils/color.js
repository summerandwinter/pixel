const Color = function () {
  var spaces = {
    rgb: { r: 0, g: 0, b: 0 },
    hsv: { h: 0, s: 0, v: 0 },
    hsl: { h: 0, s: 0, l: 0 },
    lab: { l: 0, a: 0, b: 0 },
    cmyk: { c: 0, m: 0, y: 0, k: 1 }
  },
    a = 1,
    arg,
    args = arguments,
    _clip = function (v) {
      if (isNaN(v) || v === null) {
        return 0;
      }
      if (typeof v == 'string') {
        v = parseInt(v, 10);
      }
      return Math.max(0, Math.min(v, 1));
    },
    _hexify = function (number) {
      var digits = '0123456789abcdef',
        lsd = number % 16,
        msd = (number - lsd) / 16,
        hexified = digits.charAt(msd) + digits.charAt(lsd);
      return hexified;
    },
    _rgb_to_xyz = function (rgb) {
      var r = (rgb.r > 0.04045) ? Math.pow((rgb.r + 0.055) / 1.055, 2.4) : rgb.r / 12.92,
        g = (rgb.g > 0.04045) ? Math.pow((rgb.g + 0.055) / 1.055, 2.4) : rgb.g / 12.92,
        b = (rgb.b > 0.04045) ? Math.pow((rgb.b + 0.055) / 1.055, 2.4) : rgb.b / 12.92;

      return {
        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
        z: r * 0.0193 + g * 0.1192 + b * 0.9505
      };
    },
    _xyz_to_rgb = function (xyz) {
      var rgb = {
        r: xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986,
        g: xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415,
        b: xyz.x * 0.0557 + xyz.y * -0.2040 + xyz.z * 1.0570
      };

      rgb.r = (rgb.r > 0.0031308) ? 1.055 * Math.pow(rgb.r, (1 / 2.4)) - 0.055 : 12.92 * rgb.r;
      rgb.g = (rgb.g > 0.0031308) ? 1.055 * Math.pow(rgb.g, (1 / 2.4)) - 0.055 : 12.92 * rgb.g;
      rgb.b = (rgb.b > 0.0031308) ? 1.055 * Math.pow(rgb.b, (1 / 2.4)) - 0.055 : 12.92 * rgb.b;

      return rgb;
    },
    _rgb_to_hsv = function (rgb) {
      var minVal = Math.min(rgb.r, rgb.g, rgb.b),
        maxVal = Math.max(rgb.r, rgb.g, rgb.b),
        delta = maxVal - minVal,
        del_R, del_G, del_B,
        hsv = {
          h: 0,
          s: 0,
          v: maxVal
        };

      if (delta === 0) {
        hsv.h = 0;
        hsv.s = 0;
      } else {
        hsv.s = delta / maxVal;

        del_R = (((maxVal - rgb.r) / 6) + (delta / 2)) / delta;
        del_G = (((maxVal - rgb.g) / 6) + (delta / 2)) / delta;
        del_B = (((maxVal - rgb.b) / 6) + (delta / 2)) / delta;

        if (rgb.r === maxVal) {
          hsv.h = del_B - del_G;
        } else if (rgb.g === maxVal) {
          hsv.h = (1 / 3) + del_R - del_B;
        } else if (rgb.b === maxVal) {
          hsv.h = (2 / 3) + del_G - del_R;
        }

        if (hsv.h < 0) {
          hsv.h += 1;
        } else if (hsv.h > 1) {
          hsv.h -= 1;
        }
      }

      return hsv;
    },
    _hsv_to_rgb = function (hsv) {
      var rgb = {
        r: 0,
        g: 0,
        b: 0
      },
        var_h,
        var_i,
        var_1,
        var_2,
        var_3;

      if (hsv.s === 0) {
        rgb.r = rgb.g = rgb.b = hsv.v;
      } else {
        var_h = hsv.h === 1 ? 0 : hsv.h * 6;
        var_i = Math.floor(var_h);
        var_1 = hsv.v * (1 - hsv.s);
        var_2 = hsv.v * (1 - hsv.s * (var_h - var_i));
        var_3 = hsv.v * (1 - hsv.s * (1 - (var_h - var_i)));

        if (var_i === 0) {
          rgb.r = hsv.v;
          rgb.g = var_3;
          rgb.b = var_1;
        } else if (var_i === 1) {
          rgb.r = var_2;
          rgb.g = hsv.v;
          rgb.b = var_1;
        } else if (var_i === 2) {
          rgb.r = var_1;
          rgb.g = hsv.v;
          rgb.b = var_3;
        } else if (var_i === 3) {
          rgb.r = var_1;
          rgb.g = var_2;
          rgb.b = hsv.v;
        } else if (var_i === 4) {
          rgb.r = var_3;
          rgb.g = var_1;
          rgb.b = hsv.v;
        } else {
          rgb.r = hsv.v;
          rgb.g = var_1;
          rgb.b = var_2;
        }
      }

      return rgb;
    },
    _rgb_to_hsl = function (rgb) {
      var minVal = Math.min(rgb.r, rgb.g, rgb.b),
        maxVal = Math.max(rgb.r, rgb.g, rgb.b),
        delta = maxVal - minVal,
        del_R, del_G, del_B,
        hsl = {
          h: 0,
          s: 0,
          l: (maxVal + minVal) / 2
        };

      if (delta === 0) {
        hsl.h = 0;
        hsl.s = 0;
      } else {
        hsl.s = hsl.l < 0.5 ? delta / (maxVal + minVal) : delta / (2 - maxVal - minVal);

        del_R = (((maxVal - rgb.r) / 6) + (delta / 2)) / delta;
        del_G = (((maxVal - rgb.g) / 6) + (delta / 2)) / delta;
        del_B = (((maxVal - rgb.b) / 6) + (delta / 2)) / delta;

        if (rgb.r === maxVal) {
          hsl.h = del_B - del_G;
        } else if (rgb.g === maxVal) {
          hsl.h = (1 / 3) + del_R - del_B;
        } else if (rgb.b === maxVal) {
          hsl.h = (2 / 3) + del_G - del_R;
        }

        if (hsl.h < 0) {
          hsl.h += 1;
        } else if (hsl.h > 1) {
          hsl.h -= 1;
        }
      }

      return hsl;
    },
    _hsl_to_rgb = function (hsl) {
      var var_1,
        var_2,
        hue_to_rgb = function (v1, v2, vH) {
          if (vH < 0) {
            vH += 1;
          }
          if (vH > 1) {
            vH -= 1;
          }
          if ((6 * vH) < 1) {
            return v1 + (v2 - v1) * 6 * vH;
          }
          if ((2 * vH) < 1) {
            return v2;
          }
          if ((3 * vH) < 2) {
            return v1 + (v2 - v1) * ((2 / 3) - vH) * 6;
          }
          return v1;
        };

      if (hsl.s === 0) {
        return {
          r: hsl.l,
          g: hsl.l,
          b: hsl.l
        };
      }

      var_2 = (hsl.l < 0.5) ? hsl.l * (1 + hsl.s) : (hsl.l + hsl.s) - (hsl.s * hsl.l);
      var_1 = 2 * hsl.l - var_2;

      return {
        r: hue_to_rgb(var_1, var_2, hsl.h + (1 / 3)),
        g: hue_to_rgb(var_1, var_2, hsl.h),
        b: hue_to_rgb(var_1, var_2, hsl.h - (1 / 3))
      };
    },
    _xyz_to_lab = function (xyz) {
      // CIE-L*ab D65 1931
      var x = xyz.x / 0.95047,
        y = xyz.y,
        z = xyz.z / 1.08883;

      x = (x > 0.008856) ? Math.pow(x, (1 / 3)) : (7.787 * x) + (16 / 116);
      y = (y > 0.008856) ? Math.pow(y, (1 / 3)) : (7.787 * y) + (16 / 116);
      z = (z > 0.008856) ? Math.pow(z, (1 / 3)) : (7.787 * z) + (16 / 116);

      return {
        l: ((116 * y) - 16) / 100,	// [0,100]
        a: ((500 * (x - y)) + 128) / 255,	// [-128,127]
        b: ((200 * (y - z)) + 128) / 255	// [-128,127]
      };
    },
    _lab_to_xyz = function (lab) {
      var lab2 = {
        l: lab.l * 100,
        a: (lab.a * 255) - 128,
        b: (lab.b * 255) - 128
      },
        xyz = {
          x: 0,
          y: (lab2.l + 16) / 116,
          z: 0
        };

      xyz.x = lab2.a / 500 + xyz.y;
      xyz.z = xyz.y - lab2.b / 200;

      xyz.x = (Math.pow(xyz.x, 3) > 0.008856) ? Math.pow(xyz.x, 3) : (xyz.x - 16 / 116) / 7.787;
      xyz.y = (Math.pow(xyz.y, 3) > 0.008856) ? Math.pow(xyz.y, 3) : (xyz.y - 16 / 116) / 7.787;
      xyz.z = (Math.pow(xyz.z, 3) > 0.008856) ? Math.pow(xyz.z, 3) : (xyz.z - 16 / 116) / 7.787;

      xyz.x *= 0.95047;
      xyz.y *= 1;
      xyz.z *= 1.08883;

      return xyz;
    },
    _rgb_to_cmy = function (rgb) {
      return {
        c: 1 - (rgb.r),
        m: 1 - (rgb.g),
        y: 1 - (rgb.b)
      };
    },
    _cmy_to_rgb = function (cmy) {
      return {
        r: 1 - (cmy.c),
        g: 1 - (cmy.m),
        b: 1 - (cmy.y)
      };
    },
    _cmy_to_cmyk = function (cmy) {
      var K = 1;

      if (cmy.c < K) {
        K = cmy.c;
      }
      if (cmy.m < K) {
        K = cmy.m;
      }
      if (cmy.y < K) {
        K = cmy.y;
      }

      if (K == 1) {
        return {
          c: 0,
          m: 0,
          y: 0,
          k: 1
        };
      }

      return {
        c: (cmy.c - K) / (1 - K),
        m: (cmy.m - K) / (1 - K),
        y: (cmy.y - K) / (1 - K),
        k: K
      };
    },
    _cmyk_to_cmy = function (cmyk) {
      return {
        c: cmyk.c * (1 - cmyk.k) + cmyk.k,
        m: cmyk.m * (1 - cmyk.k) + cmyk.k,
        y: cmyk.y * (1 - cmyk.k) + cmyk.k
      };
    };

  this.set = true;

  this.setAlpha = function (_a) {
    if (_a !== null) {
      a = _clip(_a);
    }

    return this;
  };

  this.getAlpha = function () {
    return a;
  };

  this.setRGB = function (r, g, b) {
    spaces = { rgb: this.getRGB() };
    if (r !== null) {
      spaces.rgb.r = _clip(r);
    }
    if (g !== null) {
      spaces.rgb.g = _clip(g);
    }
    if (b !== null) {
      spaces.rgb.b = _clip(b);
    }

    return this;
  };

  this.setHSV = function (h, s, v) {
    spaces = { hsv: this.getHSV() };
    if (h !== null) {
      spaces.hsv.h = _clip(h);
    }
    if (s !== null) {
      spaces.hsv.s = _clip(s);
    }
    if (v !== null) {
      spaces.hsv.v = _clip(v);
    }

    return this;
  };

  this.setHSL = function (h, s, l) {
    spaces = { hsl: this.getHSL() };
    if (h !== null) {
      spaces.hsl.h = _clip(h);
    }
    if (s !== null) {
      spaces.hsl.s = _clip(s);
    }
    if (l !== null) {
      spaces.hsl.l = _clip(l);
    }

    return this;
  };

  this.setLAB = function (l, a, b) {
    spaces = { lab: this.getLAB() };
    if (l !== null) {
      spaces.lab.l = _clip(l);
    }
    if (a !== null) {
      spaces.lab.a = _clip(a);
    }
    if (b !== null) {
      spaces.lab.b = _clip(b);
    }

    return this;
  };

  this.setCMYK = function (c, m, y, k) {
    spaces = { cmyk: this.getCMYK() };
    if (c !== null) {
      spaces.cmyk.c = _clip(c);
    }
    if (m !== null) {
      spaces.cmyk.m = _clip(m);
    }
    if (y !== null) {
      spaces.cmyk.y = _clip(y);
    }
    if (k !== null) {
      spaces.cmyk.k = _clip(k);
    }

    return this;
  };

  this.getRGB = function () {
    if (!spaces.rgb) {
      spaces.rgb = spaces.lab ? _xyz_to_rgb(_lab_to_xyz(spaces.lab))
        : spaces.hsv ? _hsv_to_rgb(spaces.hsv)
          : spaces.hsl ? _hsl_to_rgb(spaces.hsl)
            : spaces.cmyk ? _cmy_to_rgb(_cmyk_to_cmy(spaces.cmyk))
              : { r: 0, g: 0, b: 0 };
      spaces.rgb.r = _clip(spaces.rgb.r);
      spaces.rgb.g = _clip(spaces.rgb.g);
      spaces.rgb.b = _clip(spaces.rgb.b);
    }
    return spaces.rgb;
  };

  this.getHSV = function () {
    if (!spaces.hsv) {
      spaces.hsv = spaces.lab ? _rgb_to_hsv(this.getRGB())
        : spaces.rgb ? _rgb_to_hsv(spaces.rgb)
          : spaces.hsl ? _rgb_to_hsv(this.getRGB())
            : spaces.cmyk ? _rgb_to_hsv(this.getRGB())
              : { h: 0, s: 0, v: 0 };
      spaces.hsv.h = _clip(spaces.hsv.h);
      spaces.hsv.s = _clip(spaces.hsv.s);
      spaces.hsv.v = _clip(spaces.hsv.v);
    }
    return spaces.hsv;
  };

  this.getHSL = function () {
    if (!spaces.hsl) {
      spaces.hsl = spaces.rgb ? _rgb_to_hsl(spaces.rgb)
        : spaces.hsv ? _rgb_to_hsl(this.getRGB())
          : spaces.cmyk ? _rgb_to_hsl(this.getRGB())
            : spaces.hsv ? _rgb_to_hsl(this.getRGB())
              : { h: 0, s: 0, l: 0 };
      spaces.hsl.h = _clip(spaces.hsl.h);
      spaces.hsl.s = _clip(spaces.hsl.s);
      spaces.hsl.l = _clip(spaces.hsl.l);
    }
    return spaces.hsl;
  };

  this.getCMYK = function () {
    if (!spaces.cmyk) {
      spaces.cmyk = spaces.rgb ? _cmy_to_cmyk(_rgb_to_cmy(spaces.rgb))
        : spaces.hsv ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB()))
          : spaces.hsl ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB()))
            : spaces.lab ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB()))
              : { c: 0, m: 0, y: 0, k: 1 };
      spaces.cmyk.c = _clip(spaces.cmyk.c);
      spaces.cmyk.m = _clip(spaces.cmyk.m);
      spaces.cmyk.y = _clip(spaces.cmyk.y);
      spaces.cmyk.k = _clip(spaces.cmyk.k);
    }
    return  spaces.cmyk;
  };

  this.getLAB = function () {
    if (!spaces.lab) {
      spaces.lab = spaces.rgb ? _xyz_to_lab(_rgb_to_xyz(spaces.rgb))
        : spaces.hsv ? _xyz_to_lab(_rgb_to_xyz(this.getRGB()))
          : spaces.hsl ? _xyz_to_lab(_rgb_to_xyz(this.getRGB()))
            : spaces.cmyk ? _xyz_to_lab(_rgb_to_xyz(this.getRGB()))
              : { l: 0, a: 0, b: 0 };
      spaces.lab.l = _clip(spaces.lab.l);
      spaces.lab.a = _clip(spaces.lab.a);
      spaces.lab.b = _clip(spaces.lab.b);
    }
    return spaces.lab;
  };

  this.getChannels = function () {
    return {
      r: this.getRGB().r,
      g: this.getRGB().g,
      b: this.getRGB().b,
      a: this.getAlpha(),
      h: this.getHSV().h,
      s: this.getHSV().s,
      v: this.getHSV().v,
      c: this.getCMYK().c,
      m: this.getCMYK().m,
      y: this.getCMYK().y,
      k: this.getCMYK().k,
      L: this.getLAB().l,
      A: this.getLAB().a,
      B: this.getLAB().b
    };
  };

  this.distance = function (color) {
    var space = 'lab',
      getter = 'get' + space.toUpperCase(),
      a = this[getter](),
      b = color[getter](),
      distance = 0,
      channel;

    for (channel in a) {
      distance += Math.pow(a[channel] - b[channel], 2);
    }

    return distance;
  };

  this.equals = function (color) {
    var a = this.getRGB(),
      b = color.getRGB();

    return this.getAlpha() == color.getAlpha()
      && a.r == b.r
      && a.g == b.g
      && a.b == b.b;
  };

  this.limit = function (steps) {
    steps -= 1;
    var rgb = this.getRGB();
    this.setRGB(
      Math.round(rgb.r * steps) / steps,
      Math.round(rgb.g * steps) / steps,
      Math.round(rgb.b * steps) / steps
    );
  };

  this.toHex = function () {
    var rgb = this.getRGB();
    return _hexify(rgb.r * 255) + _hexify(rgb.g * 255) + _hexify(rgb.b * 255);
  };

  this.toCSS = function () {
    return '#' + this.toHex();
  };

  this.normalize = function () {
    this.setHSV(null, 1, 1);
    return this;
  };

  this.copy = function () {
    var rgb = this.getRGB(),
      a = this.getAlpha();
    return new Color(rgb.r, rgb.g, rgb.b, a);
  };

  // Construct
  if (args.length > 0) {
    this.setRGB(args[0], args[1], args[2]);
    this.setAlpha(args[3] === 0 ? 0 : args[3] || 1);
  }
};

module.exports = {
  Color: Color
}
