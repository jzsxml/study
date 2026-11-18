/**
 * 口算练习生成器：按年级随机出题 + 答案判定
 * 题目对象：{ q: '12 + 8', a: 20, text: '20' }
 * 判分支持：整数、小数、分数（3/4）、百分数（80%）
 */
(function (global) {
  'use strict';

  function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function item(q, a, text) { return { q: q, a: a, text: text == null ? String(a) : text }; }

  /** 去掉浮点误差后的字符串，如 1.2000000000000002 -> 1.2 */
  function dec(x) { return String(Math.round(x * 1e6) / 1e6); }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = a % b; a = b; b = t; }
    return a || 1;
  }

  function fracText(n, d) {
    var g = gcd(n, d);
    n /= g; d /= g;
    if (d === 1) return String(n);
    return n + '/' + d;
  }

  /** 真分数（分子小于分母且已是最简），如 3/4 */
  function randFrac() {
    for (var i = 0; i < 60; i++) {
      var d = ri(2, 9);
      var n = ri(1, d - 1);
      if (gcd(n, d) === 1) return { n: n, d: d };
    }
    return { n: 1, d: 2 };
  }

  /** 一位小数，且不取到整数，如 3.8 */
  function randDec(min, max) {
    var v = ri(min, max) / 10;
    if (v % 1 === 0) v += 0.1;
    return Math.round(v * 10) / 10;
  }

  var makers = {};

  /* 一年级：20以内加减法 */
  makers[1] = function () {
    if (Math.random() < 0.55) {
      var a = ri(1, 9), b = ri(1, 9);
      if (a + b > 20) b = 20 - a;
      return item(a + ' + ' + b, a + b);
    }
    var s = ri(3, 20), x = ri(1, 9);
    if (x >= s) x = s - 1;
    return item(s + ' - ' + x, s - x);
  };

  /* 二年级：表内乘除 + 100以内加减 */
  makers[2] = function () {
    var r = Math.random();
    if (r < 0.42) {
      var a = ri(2, 9), b = ri(2, 9);
      return item(a + ' × ' + b, a * b);
    }
    if (r < 0.72) {
      var b2 = ri(2, 9), q2 = ri(2, 9);
      return item((b2 * q2) + ' ÷ ' + b2, q2);
    }
    if (r < 0.86) {
      var x = ri(11, 89), y = ri(1, 9) * 10;
      return item(x + ' + ' + y, x + y);
    }
    var big = ri(31, 99), small = ri(1, 9) * 10;
    if (big < small) { var t = big; big = small; small = t; }
    return item(big + ' - ' + small, big - small);
  };

  /* 三年级：两位数乘一位数、一位数除法、三位数加减 */
  makers[3] = function () {
    var r = Math.random();
    if (r < 0.4) {
      var a = ri(12, 99), b = ri(2, 9);
      return item(a + ' × ' + b, a * b);
    }
    if (r < 0.7) {
      var b3 = ri(2, 9), q3 = ri(12, 99);
      return item((b3 * q3) + ' ÷ ' + b3, q3);
    }
    if (r < 0.85) {
      var x = ri(120, 899), y = ri(120, 899);
      return item(x + ' + ' + y, x + y);
    }
    var s = ri(300, 999), t2 = ri(120, 899);
    if (s < t2) { var tmp = s; s = t2; t2 = tmp; }
    return item(s + ' - ' + t2, s - t2);
  };

  /* 四年级：两位数乘两位数、小数加减、除数是两位数 */
  makers[4] = function () {
    var r = Math.random();
    if (r < 0.32) {
      var a = ri(11, 29), b = ri(11, 19);
      return item(a + ' × ' + b, a * b);
    }
    if (r < 0.68) {
      var x = randDec(11, 99), y = randDec(11, 99);
      if (Math.random() < 0.5) {
        return item(dec(x) + ' + ' + dec(y), x + y, dec(x + y));
      }
      var big = Math.max(x, y), small = Math.min(x, y);
      return item(dec(big) + ' - ' + dec(small), big - small, dec(big - small));
    }
    var b4 = ri(11, 25), q4 = ri(2, 9);
    return item((b4 * q4) + ' ÷ ' + b4, q4);
  };

  /* 五年级：小数乘除、分数加减 */
  makers[5] = function () {
    var r = Math.random();
    if (r < 0.28) {
      var a = randDec(11, 99), b = ri(2, 9);
      return item(dec(a) + ' × ' + b, a * b, dec(a * b));
    }
    if (r < 0.48) {
      var b5 = ri(2, 9), q5 = randDec(11, 99);
      return item(dec(b5 * q5) + ' ÷ ' + b5, q5, dec(q5));
    }
    if (r < 0.78) {   // 同分母分数加减
      var d = pick([3, 4, 5, 6, 7, 8, 9]);
      var n1 = ri(1, d - 1), n2 = ri(1, d - 1);
      if (Math.random() < 0.5) {
        return item(n1 + '/' + d + ' + ' + n2 + '/' + d, (n1 + n2) / d, fracText(n1 + n2, d));
      }
      var bigN = Math.max(n1, n2), smallN = Math.min(n1, n2);
      return item(bigN + '/' + d + ' - ' + smallN + '/' + d, (bigN - smallN) / d, fracText(bigN - smallN, d));
    }
    // 异分母分数加法（简单情形）
    var p = pick([['1', '2', '1', '4'], ['1', '2', '1', '3'], ['1', '3', '1', '6'], ['3', '4', '1', '8'], ['1', '4', '1', '8']]);
    var m1 = +p[0], d1 = +p[1], m2 = +p[2], d2 = +p[3];
    return item(m1 + '/' + d1 + ' + ' + m2 + '/' + d2, m1 / d1 + m2 / d2, fracText(m1 * d2 + m2 * d1, d1 * d2));
  };

  /* 六年级：分数乘除、百分数 */
  makers[6] = function () {
    var r = Math.random();
    if (r < 0.3) {
      var f1 = randFrac(), f2 = randFrac();
      return item(f1.n + '/' + f1.d + ' × ' + f2.n + '/' + f2.d,
        (f1.n * f2.n) / (f1.d * f2.d), fracText(f1.n * f2.n, f1.d * f2.d));
    }
    if (r < 0.55) {
      var f3 = randFrac(), f4 = randFrac();
      return item(f3.n + '/' + f3.d + ' ÷ ' + f4.n + '/' + f4.d,
        (f3.n / f3.d) / (f4.n / f4.d), fracText(f3.n * f4.d, f3.d * f4.n));
    }
    if (r < 0.8) {
      var pc = pick([5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 80, 125]);
      return item(pc + '% 化成小数 = ?', pc / 100, dec(pc / 100));
    }
    var base = pick([20, 40, 50, 60, 80, 120, 200]);
    var p2 = pick([10, 20, 25, 50, 75]);
    return item(base + ' 的 ' + p2 + '% = ?', base * p2 / 100, dec(base * p2 / 100));
  };

  /** 生成一组题目（去重） */
  function make(grade, count) {
    var mk = makers[grade] || makers[1];
    var n = count || 10;
    var out = [], seen = {}, guard = 0;
    while (out.length < n && guard++ < 800) {
      var it = mk();
      if (seen[it.q]) continue;
      seen[it.q] = 1;
      out.push(it);
    }
    return out;
  }

  /** 把用户输入解析成数值，支持 24 / 0.5 / 3/4 / 80% */
  function parseValue(input) {
    var s = String(input == null ? '' : input).trim()
      .replace(/[，,]/g, '')
      .replace(/[＝=]/g, '')
      .replace(/\s+/g, '');
    if (!s) return NaN;
    if (/%$/.test(s)) {
      var pv = parseFloat(s.slice(0, -1));
      return isNaN(pv) ? NaN : pv / 100;
    }
    var m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m) {
      var d = parseFloat(m[2]);
      if (!d) return NaN;
      return parseFloat(m[1]) / d;
    }
    if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
    return NaN;
  }

  /** 判定答案 */
  function check(input, it) {
    var v = parseValue(input);
    if (isNaN(v)) return { ok: false, reason: '请输入数字、分数（如 3/4）或百分数' };
    return { ok: Math.abs(v - it.a) < 1e-6 };
  }

  global.MathQuiz = { make: make, check: check, parseValue: parseValue };
})(window);
