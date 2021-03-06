! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@tensorflow/tfjs")) : "function" == typeof define && define.amd ? define(["exports", "@tensorflow/tfjs"], t) : t(e.posenet = {}, e.tf)
}(this, function (e, t) {
  "use strict";

  function n(e, t, n, r) {
    return new(n || (n = Promise))(function (i, o) {
      function a(e) {
        try {
          u(r.next(e))
        } catch (e) {
          o(e)
        }
      }

      function s(e) {
        try {
          u(r.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function u(e) {
        e.done ? i(e.value) : new n(function (t) {
          t(e.value)
        }).then(a, s)
      }
      u((r = r.apply(e, t || [])).next())
    })
  }

  function r(e, t) {
    function n(e) {
      return function (t) {
        return r([e, t])
      }
    }

    function r(n) {
      if (i) throw new TypeError("Generator is already executing.");
      for (; u;) try {
        if (i = 1, o && (a = o[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(a = a.call(o, n[1])).done) return a;
        switch (o = 0, a && (n = [0, a.value]), n[0]) {
          case 0:
          case 1:
            a = n;
            break;
          case 4:
            return u.label++, {
              value: n[1],
              done: !1
            };
          case 5:
            u.label++, o = n[1], n = [0];
            continue;
          case 7:
            n = u.ops.pop(), u.trys.pop();
            continue;
          default:
            if (a = u.trys, !(a = a.length > 0 && a[a.length - 1]) && (6 === n[0] || 2 === n[0])) {
              u = 0;
              continue
            }
            if (3 === n[0] && (!a || n[1] > a[0] && n[1] < a[3])) {
              u.label = n[1];
              break
            }
            if (6 === n[0] && u.label < a[1]) {
              u.label = a[1], a = n;
              break
            }
            if (a && u.label < a[2]) {
              u.label = a[2], u.ops.push(n);
              break
            }
            a[2] && u.ops.pop(), u.trys.pop();
            continue
        }
        n = t.call(e, u)
      } catch (e) {
        n = [6, e], o = 0
      } finally {
        i = a = 0
      }
      if (5 & n[0]) throw n[1];
      return {
        value: n[0] ? n[1] : void 0,
        done: !0
      }
    }
    var i, o, a, s, u = {
      label: 0,
      sent: function () {
        if (1 & a[0]) throw a[1];
        return a[1]
      },
      trys: [],
      ops: []
    };
    return s = {
      next: n(0),
      throw: n(1),
      return: n(2)
    }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {
      return this
    }), s
  }

  function i(e, t, n) {
    return e < n || t < n
  }

  function o(e) {
    return e.reduce(function (e, t) {
      var n = e.maxX,
        r = e.maxY,
        i = e.minX,
        o = e.minY,
        a = t.position,
        s = a.x,
        u = a.y;
      return {
        maxX: Math.max(n, s),
        maxY: Math.max(r, u),
        minX: Math.min(i, s),
        minY: Math.min(o, u)
      }
    }, {
      maxX: Q,
      maxY: Q,
      minX: W,
      minY: W
    })
  }

  function a(e, i) {
    return void 0 === i && (i = "float32"), n(this, void 0, void 0, function () {
      var n;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, e.data()];
          case 1:
            return n = r.sent(), [2, new t.TensorBuffer(e.shape, i, n)]
        }
      })
    })
  }

  function s(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        return [2, Promise.all(e.map(function (e) {
          return a(e, "float32")
        }))]
      })
    })
  }

  function u(e, t, n) {
    return {
      score: e.score,
      keypoints: e.keypoints.map(function (e) {
        var r = e.score,
          i = e.part,
          o = e.position;
        return {
          score: r,
          part: i,
          position: {
            x: o.x * t,
            y: o.y * n
          }
        }
      })
    }
  }

  function l(e, t, n) {
    return 1 === n && 1 === t ? e : e.map(function (e) {
      return u(e, n, t)
    })
  }

  function c(e, t, n) {
    var r = t * e - 1;
    return r - r % n + 1
  }

  function p(e) {
    return Math.floor(e / 2)
  }

  function f(e, t, n, r, i, o) {
    for (var a = o.shape, s = a[0], u = a[1], l = !0, c = Math.max(n - i, 0), p = Math.min(n + i + 1, s), f = c; f < p; ++f) {
      for (var h = Math.max(r - i, 0), v = Math.min(r + i + 1, u), d = h; d < v; ++d)
        if (o.get(f, d, e) > t) {
          l = !1;
          break
        }
      if (!l) break
    }
    return l
  }

  function h(e, t, n) {
    for (var r = n.shape, i = r[0], o = r[1], a = r[2], s = new R(i * o * a, function (e) {
        return e.score
      }), u = 0; u < i; ++u)
      for (var l = 0; l < o; ++l)
        for (var c = 0; c < a; ++c) {
          var p = n.get(u, l, c);
          p < e || f(c, p, u, l, t, n) && s.enqueue({
            score: p,
            part: {
              heatmapY: u,
              heatmapX: l,
              id: c
            }
          })
        }
    return s
  }

  function v(e, t, n, r) {
    return {
      y: r.get(e, t, n),
      x: r.get(e, t, n + X)
    }
  }

  function d(e, t, n) {
    var r = v(e.heatmapY, e.heatmapX, e.id, n),
      i = r.y,
      o = r.x;
    return {
      x: e.heatmapX * t + o,
      y: e.heatmapY * t + i
    }
  }

  function b(e, t, n) {
    return e < t ? t : e > n ? n : e
  }

  function m(e, t, n, r) {
    var i = n - e,
      o = r - t;
    return i * i + o * o
  }

  function y(e, t) {
    return {
      x: e.x + t.x,
      y: e.y + t.y
    }
  }

  function g(e, t, n) {
    var r = n.shape[2] / 2;
    return {
      y: n.get(t.y, t.x, e),
      x: n.get(t.y, t.x, r + e)
    }
  }

  function w(e, t, n, r) {
    return {
      y: b(Math.round(e.y / t), 0, n - 1),
      x: b(Math.round(e.x / t), 0, r - 1)
    }
  }

  function x(e, t, n, r, i, o, a) {
    var s = r.shape,
      u = s[0],
      l = s[1],
      c = g(e, w(t.position, o, u, l), a),
      p = w(y(t.position, c), o, u, l),
      f = v(p.y, p.x, n, i),
      h = r.get(p.y, p.x, n);
    return {
      position: y({
        x: p.x * o,
        y: p.y * o
      }, {
        x: f.x,
        y: f.y
      }),
      part: j[n],
      score: h
    }
  }

  function C(e, t, n, r, i, o) {
    var a = t.shape[2],
      s = D.length,
      u = new Array(a),
      l = e.part,
      c = e.score,
      p = d(l, r, n);
    u[l.id] = {
      score: c,
      part: j[l.id],
      position: p
    };
    for (v = s - 1; v >= 0; --v) {
      var f = D[v],
        h = G[v];
      u[f] && !u[h] && (u[h] = x(v, u[f], h, t, n, r, o))
    }
    for (var v = 0; v < s; ++v) {
      var f = G[v],
        h = D[v];
      u[f] && !u[h] && (u[h] = x(v, u[f], h, t, n, r, i))
    }
    return u
  }

  function E(e, t, n, r) {
    var i = n.x,
      o = n.y;
    return e.some(function (e) {
      var n = e.keypoints[r].position;
      return m(o, i, n.y, n.x) <= t
    })
  }

  function S(e, t, n) {
    var r = n.reduce(function (n, r, i) {
      var o = r.position,
        a = r.score;
      return E(e, t, o, i) || (n += a), n
    }, 0);
    return r /= n.length
  }

  function k(e, t, i, o, a, u, l, c) {
    return void 0 === l && (l = .5), void 0 === c && (c = 20), n(this, void 0, void 0, function () {
      var n, p, f, v, b, m, y, g, w, x, k, M;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return n = [], [4, s([e, t, i, o])];
          case 1:
            for (p = r.sent(), f = p[0], v = p[1], b = p[2], m = p[3], y = h(l, z, f), g = c * c; n.length < u && !y.empty();) w = y.dequeue(), x = d(w.part, a, v), E(n, g, x, w.part.id) || (k = C(w, f, v, a, b, m), M = S(n, g, k), n.push({
              keypoints: k,
              score: M
            }));
            return [2, n]
        }
      })
    })
  }

  function M(e) {
    t.util.assert("number" == typeof e, "outputStride is not a number"), t.util.assert(J.indexOf(e) >= 0, "outputStride of " + e + " is invalid. It must be either 8, 16, or 32")
  }

  function P(e) {
    t.util.assert("number" == typeof e, "imageScaleFactor is not a number"), t.util.assert(e >= .2 && e <= 1, "imageScaleFactor must be between 0.2 and 1.0")
  }

  function O(e, t) {
    var n = 1,
      r = 1;
    return e.map(function (e, i) {
      var o, a, s = e[0],
        u = e[1];
      return n === t ? (o = 1, a = r, r *= u) : (o = u, a = 1, n *= u), {
        blockId: i,
        convType: s,
        stride: o,
        rate: a,
        outputStride: n
      }
    })
  }

  function _(e, n) {
    return t.tidy(function () {
      var r = e.div(t.scalar(n, "int32"));
      return e.sub(r.mul(t.scalar(n, "int32")))
    })
  }

  function N(e) {
    var n = e.shape,
      r = n[0],
      i = n[1],
      o = n[2];
    return t.tidy(function () {
      var n = e.reshape([r * i, o]).argMax(0),
        a = n.div(t.scalar(i, "int32")).expandDims(1),
        s = _(n, i).expandDims(1);
      return t.concat([a, s], 1)
    })
  }

  function T(e, t) {
    for (var n = t.shape[0], r = new Float32Array(n), i = 0; i < n; i++) {
      var o = t.get(i, 0),
        a = t.get(i, 1);
      r[i] = e.get(o, a, i)
    }
    return r
  }

  function A(e, t, n, r) {
    return {
      y: r.get(e, t, n),
      x: r.get(e, t, n + X)
    }
  }

  function V(e, n) {
    for (var r = [], i = 0; i < X; i++) {
      var o = A(e.get(i, 0).valueOf(), e.get(i, 1).valueOf(), i, n),
        a = o.x,
        s = o.y;
      r.push(s), r.push(a)
    }
    return t.tensor2d(r, [X, 2])
  }

  function I(e, n, r) {
    return t.tidy(function () {
      var i = V(e, r);
      return e.toTensor().mul(t.scalar(n, "int32")).toFloat().add(i)
    })
  }

  function H(e, t, i) {
    return n(this, void 0, void 0, function () {
      var n, o, s, u, l, c, p, f, h, v;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return n = 0, o = N(e), [4, Promise.all([a(e), a(t), a(o, "int32")])];
          case 1:
            return s = r.sent(), u = s[0], l = s[1], c = s[2], p = I(c, i, l), [4, a(p)];
          case 2:
            return f = r.sent(), h = Array.from(T(u, c)), v = h.map(function (e, t) {
              return n += e, {
                position: {
                  y: f.get(t, 0),
                  x: f.get(t, 1)
                },
                part: j[t],
                score: e
              }
            }), o.dispose(), p.dispose(), [2, {
              keypoints: v,
              score: n / v.length
            }]
        }
      })
    })
  }

  function F(e, n, r, i) {
    var o = t.fromPixels(e);
    return i ? o.reverse(1).resizeBilinear([n, r]) : o.resizeBilinear([n, r])
  }
  var j = ["nose", "leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"],
    X = j.length,
    Y = j.reduce(function (e, t, n) {
      return e[t] = n, e
    }, {}),
    B = [
      ["nose", "leftEye"],
      ["leftEye", "leftEar"],
      ["nose", "rightEye"],
      ["rightEye", "rightEar"],
      ["nose", "leftShoulder"],
      ["leftShoulder", "leftElbow"],
      ["leftElbow", "leftWrist"],
      ["leftShoulder", "leftHip"],
      ["leftHip", "leftKnee"],
      ["leftKnee", "leftAnkle"],
      ["nose", "rightShoulder"],
      ["rightShoulder", "rightElbow"],
      ["rightElbow", "rightWrist"],
      ["rightShoulder", "rightHip"],
      ["rightHip", "rightKnee"],
      ["rightKnee", "rightAnkle"]
    ],
    K = [
      ["leftHip", "leftShoulder"],
      ["leftElbow", "leftShoulder"],
      ["leftElbow", "leftWrist"],
      ["leftHip", "leftKnee"],
      ["leftKnee", "leftAnkle"],
      ["rightHip", "rightShoulder"],
      ["rightElbow", "rightShoulder"],
      ["rightElbow", "rightWrist"],
      ["rightHip", "rightKnee"],
      ["rightKnee", "rightAnkle"],
      ["leftShoulder", "rightShoulder"],
      ["leftHip", "rightHip"]
    ].map(function (e) {
      var t = e[0],
        n = e[1];
      return [Y[t], Y[n]]
    }),
    Q = Number.NEGATIVE_INFINITY,
    W = Number.POSITIVE_INFINITY,
    R = function () {
      function e(e, t) {
        this.priorityQueue = new Array(e), this.numberOfElements = -1, this.getElementValue = t
      }
      return e.prototype.enqueue = function (e) {
        this.priorityQueue[++this.numberOfElements] = e, this.swim(this.numberOfElements)
      }, e.prototype.dequeue = function () {
        var e = this.priorityQueue[0];
        return this.exchange(0, this.numberOfElements--), this.sink(0), this.priorityQueue[this.numberOfElements + 1] = null, e
      }, e.prototype.empty = function () {
        return -1 === this.numberOfElements
      }, e.prototype.size = function () {
        return this.numberOfElements + 1
      }, e.prototype.all = function () {
        return this.priorityQueue.slice(0, this.numberOfElements + 1)
      }, e.prototype.max = function () {
        return this.priorityQueue[0]
      }, e.prototype.swim = function (e) {
        for (; e > 0 && this.less(p(e), e);) this.exchange(e, p(e)), e = p(e)
      }, e.prototype.sink = function (e) {
        for (; 2 * e <= this.numberOfElements;) {
          var t = 2 * e;
          if (t < this.numberOfElements && this.less(t, t + 1) && t++, !this.less(e, t)) break;
          this.exchange(e, t), e = t
        }
      }, e.prototype.getValueAt = function (e) {
        return this.getElementValue(this.priorityQueue[e])
      }, e.prototype.less = function (e, t) {
        return this.getValueAt(e) < this.getValueAt(t)
      }, e.prototype.exchange = function (e, t) {
        var n = this.priorityQueue[e];
        this.priorityQueue[e] = this.priorityQueue[t], this.priorityQueue[t] = n
      }, e
    }(),
    q = B.map(function (e) {
      var t = e[0],
        n = e[1];
      return [Y[t], Y[n]]
    }),
    D = q.map(function (e) {
      return e[1]
    }),
    G = q.map(function (e) {
      return e[0]
    }),
    z = 1,
    L = function () {
      function e(e) {
        this.urlPath = e, "/" !== this.urlPath.charAt(this.urlPath.length - 1) && (this.urlPath += "/")
      }
      return e.prototype.loadManifest = function () {
        var e = this;
        return new Promise(function (t, n) {
          var r = new XMLHttpRequest;
          r.open("GET", e.urlPath + "manifest.json"), r.onload = function () {
            e.checkpointManifest = JSON.parse(r.responseText), t()
          }, r.onerror = function (t) {
            throw new Error("manifest.json not found at " + e.urlPath + ". " + t)
          }, r.send()
        })
      }, e.prototype.getCheckpointManifest = function () {
        var e = this;
        return null == this.checkpointManifest ? new Promise(function (t, n) {
          e.loadManifest().then(function () {
            t(e.checkpointManifest)
          })
        }) : new Promise(function (t, n) {
          t(e.checkpointManifest)
        })
      }, e.prototype.getAllVariables = function () {
        var e = this;
        return null != this.variables ? new Promise(function (t, n) {
          t(e.variables)
        }) : new Promise(function (t, n) {
          e.getCheckpointManifest().then(function (n) {
            for (var r = Object.keys(e.checkpointManifest), i = [], o = 0; o < r.length; o++) i.push(e.getVariable(r[o]));
            Promise.all(i).then(function (n) {
              e.variables = {};
              for (var i = 0; i < n.length; i++) e.variables[r[i]] = n[i];
              t(e.variables)
            })
          })
        })
      }, e.prototype.getVariable = function (e) {
        var n = this;
        if (!(e in this.checkpointManifest)) throw new Error("Cannot load non-existant variable " + e);
        var r = function (r, i) {
          var o = new XMLHttpRequest;
          o.responseType = "arraybuffer";
          var a = n.checkpointManifest[e].filename;
          o.open("GET", n.urlPath + a), o.onload = function () {
            if (404 === o.status) throw new Error("Not found variable " + e);
            var i = new Float32Array(o.response),
              a = t.Tensor.make(n.checkpointManifest[e].shape, {
                values: i
              });
            r(a)
          }, o.onerror = function (t) {
            throw new Error("Could not fetch variable " + e + ": " + t)
          }, o.send()
        };
        return null == this.checkpointManifest ? new Promise(function (e, t) {
          n.loadManifest().then(function () {
            new Promise(r).then(e)
          })
        }) : new Promise(r)
      }, e
    }(),
    J = [8, 16, 32],
    U = {
      100: [
        ["conv2d", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1]
      ],
      75: [
        ["conv2d", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1]
      ],
      50: [
        ["conv2d", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 2],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1],
        ["separableConv", 1]
      ]
    },
    Z = function () {
      function e(e, n) {
        this.PREPROCESS_DIVISOR = t.scalar(127.5), this.ONE = t.scalar(1), this.variables = e, this.convolutionDefinitions = n
      }
      return e.prototype.predict = function (e, n) {
        var r = this,
          i = t.cast(e, "float32").div(this.PREPROCESS_DIVISOR).sub(this.ONE);
        return O(this.convolutionDefinitions, n).reduce(function (e, t) {
          var n = t.blockId,
            i = t.stride,
            o = t.convType,
            a = t.rate;
          if ("conv2d" === o) return r.conv(e, i, n);
          if ("separableConv" === o) return r.separableConv(e, i, n, a);
          throw Error("Unknown conv type of " + o)
        }, i)
      }, e.prototype.convToOutput = function (e, t) {
        return e.conv2d(this.weights(t), 1, "same").add(this.biases(t))
      }, e.prototype.conv = function (e, t, n) {
        return e.conv2d(this.weights("Conv2d_" + String(n)), t, "same").add(this.biases("Conv2d_" + String(n))).clipByValue(0, 6)
      }, e.prototype.separableConv = function (e, t, n, r) {
        void 0 === r && (r = 1);
        var i = "Conv2d_" + String(n) + "_depthwise",
          o = "Conv2d_" + String(n) + "_pointwise";
        return e.depthwiseConv2D(this.depthwiseWeights(i), t, "same", "NHWC", r).add(this.biases(i)).clipByValue(0, 6).conv2d(this.weights(o), [1, 1], "same").add(this.biases(o)).clipByValue(0, 6)
      }, e.prototype.weights = function (e) {
        return this.variables["MobilenetV1/" + e + "/weights"]
      }, e.prototype.biases = function (e) {
        return this.variables["MobilenetV1/" + e + "/biases"]
      }, e.prototype.depthwiseWeights = function (e) {
        return this.variables["MobilenetV1/" + e + "/depthwise_weights"]
      }, e.prototype.dispose = function () {
        for (var e in this.variables) this.variables[e].dispose()
      }, e
    }(),
    // $ = "https://storage.googleapis.com/tfjs-models/weights/posenet/",
    $ = document.location.protocol + "//" + window.location.host + "/tfjs-models/weights/posenet/",
    ee = {
      1.01: {
        url: $ + "mobilenet_v1_101/",
        architecture: U[100]
      },
      1: {
        url: $ + "mobilenet_v1_100/",
        architecture: U[100]
      },
      .75: {
        url: $ + "mobilenet_v1_075/",
        architecture: U[75]
      },
      .5: {
        url: $ + "mobilenet_v1_050/",
        architecture: U[50]
      }
    },
    te = function () {
      function e(e) {
        this.mobileNet = e
      }
      return e.prototype.predictForSinglePose = function (e, n) {
        var r = this;
        return void 0 === n && (n = 16), M(n), t.tidy(function () {
          var t = r.mobileNet.predict(e, n),
            i = r.mobileNet.convToOutput(t, "heatmap_2"),
            o = r.mobileNet.convToOutput(t, "offset_2");
          return {
            heatmapScores: i.sigmoid(),
            offsets: o
          }
        })
      }, e.prototype.predictForMultiPose = function (e, n) {
        var r = this;
        return void 0 === n && (n = 16), t.tidy(function () {
          var t = r.mobileNet.predict(e, n),
            i = r.mobileNet.convToOutput(t, "heatmap_2"),
            o = r.mobileNet.convToOutput(t, "offset_2"),
            a = r.mobileNet.convToOutput(t, "displacement_fwd_2"),
            s = r.mobileNet.convToOutput(t, "displacement_bwd_2");
          return {
            heatmapScores: i.sigmoid(),
            offsets: o,
            displacementFwd: a,
            displacementBwd: s
          }
        })
      }, e.prototype.estimateSinglePose = function (e, i, o, a) {
        return void 0 === i && (i = .5), void 0 === o && (o = !1), void 0 === a && (a = 16), n(this, void 0, void 0, function () {
          var n, s, l, p, f, h, v, d, b = this;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return M(a), P(i), n = c(i, e.height, a), s = c(i, e.width, a), l = t.tidy(function () {
                  var t = F(e, n, s, o);
                  return b.predictForSinglePose(t, a)
                }), p = l.heatmapScores, f = l.offsets, [4, H(p, f, a)];
              case 1:
                return h = r.sent(), p.dispose(), f.dispose(), v = e.height / n, d = e.width / s, [2, u(h, v, d)]
            }
          })
        })
      }, e.prototype.estimateMultiplePoses = function (e, i, o, a, s, u, p) {
        return void 0 === i && (i = .5), void 0 === o && (o = !1), void 0 === a && (a = 16), void 0 === s && (s = 5), void 0 === u && (u = .5), void 0 === p && (p = 20), n(this, void 0, void 0, function () {
          var n, f, h, v, d, b, m, y, g, w, x = this;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return M(a), P(i), n = c(i, e.height, a), f = c(i, e.width, a), h = t.tidy(function () {
                  var t = F(e, n, f, o);
                  return x.predictForMultiPose(t, a)
                }), v = h.heatmapScores, d = h.offsets, b = h.displacementFwd, m = h.displacementBwd, [4, k(v, d, b, m, a, s, u, p)];
              case 1:
                return y = r.sent(), v.dispose(), d.dispose(), b.dispose(), m.dispose(), g = e.height / n, w = e.width / f, [2, l(y, g, w)]
            }
          })
        })
      }, e.prototype.dispose = function () {
        this.mobileNet.dispose()
      }, e
    }();
  e.decodeMultiplePoses = k, e.decodeSinglePose = H, e.load = function (e) {
    return void 0 === e && (e = 1.01), n(this, void 0, void 0, function () {
      var n, i, o, a, s;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            if (null == t) throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this model.");
            return n = Object.keys(ee), t.util.assert("number" == typeof e, "got multiplier type of " + typeof e + " when it should be a number."), t.util.assert(n.indexOf(e.toString()) >= 0, "invalid multiplier value of " + e + ".  No checkpoint exists for that multiplier. Must be one of " + n.join(",") + "."), i = ee[e], o = new L(i.url), [4, o.getAllVariables()];
          case 1:
            return a = r.sent(), s = new Z(a, i.architecture), [2, new te(s)]
        }
      })
    })
  }, e.PoseNet = te, e.checkpoints = ee, e.partIds = Y, e.partNames = j, e.poseChain = B, e.getAdjacentKeyPoints = function (e, t) {
    return K.reduce(function (n, r) {
      var o = r[0],
        a = r[1];
      return i(e[o].score, e[a].score, t) ? n : (n.push([e[o], e[a]]), n)
    }, [])
  }, e.getBoundingBox = o, e.getBoundingBoxPoints = function (e) {
    var t = o(e),
      n = t.minX,
      r = t.minY,
      i = t.maxX,
      a = t.maxY;
    return [{
      x: n,
      y: r
    }, {
      x: i,
      y: r
    }, {
      x: i,
      y: a
    }, {
      x: n,
      y: a
    }]
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  })
});
