/**
 * 朗读引擎：基于浏览器 Web Speech API（window.speechSynthesis）
 * - 英语用 en-US / en-GB 语音，语文用 zh-CN 语音
 * - 支持单句朗读、顺序连读（队列）、语速调节、停止
 */
(function (global) {
  'use strict';

  var synth = global.speechSynthesis || null;
  var voices = [];
  var currentUtter = null;
  var queueSeq = 0;          // 用于打断正在进行的连读
  var rate = 0.85;
  var listeners = { start: null, end: null };

  function refreshVoices() {
    if (!synth) return;
    voices = synth.getVoices() || [];
  }

  if (synth) {
    refreshVoices();
    if (typeof synth.onvoiceschanged !== 'undefined') {
      synth.onvoiceschanged = refreshVoices;
    }
  }

  function normalize(lang) {
    return String(lang || 'en-US').toLowerCase();
  }

  /** 在可用语音里挑选最合适的：先精确匹配语言，再前缀匹配 */
  function pickVoice(lang) {
    if (!voices.length) refreshVoices();
    var target = normalize(lang);
    var exact = voices.filter(function (v) { return normalize(v.lang) === target; });
    var loose = voices.filter(function (v) { return normalize(v.lang).indexOf(target.split('-')[0]) === 0; });
    var pool = exact.length ? exact : loose;
    if (!pool.length) return null;
    // 优先本地语音（响应更快、离线可用）
    var local = pool.filter(function (v) { return v.localService; });
    var list = local.length ? local : pool;
    // 英语优先女声（更适合儿童跟读）
    var female = list.filter(function (v) { return /female|zira|samantha|huihui|yaoyao|tingting|xiaoxiao/i.test(v.name); });
    return (female[0] || list[0]);
  }

  function supported() {
    return !!synth;
  }

  function stop() {
    queueSeq++;
    if (synth) synth.cancel();
    currentUtter = null;
    emit('end');
  }

  function emit(type) {
    if (typeof listeners[type] === 'function') listeners[type]();
  }

  /**
   * 朗读一段文本
   * @param {string} text
   * @param {object} opts { lang, rate, onstart, onend, onerror }
   */
  function speak(text, opts) {
    opts = opts || {};
    if (!synth) {
      if (opts && opts.onerror) opts.onerror(new Error('unsupported'));
      return;
    }
    var content = String(text == null ? '' : text).trim();
    if (!content) return;

    synth.cancel(); // 打断上一条
    var u = new SpeechSynthesisUtterance(content);
    var lang = opts.lang || 'en-US';
    u.lang = lang;
    var v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = typeof opts.rate === 'number' ? opts.rate : rate;
    u.pitch = typeof opts.pitch === 'number' ? opts.pitch : 1;
    u.volume = 1;

    u.onstart = function () { if (opts.onstart) opts.onstart(); };
    u.onerror = function (e) { if (opts.onerror) opts.onerror(e); };
    u.onend = function () {
      if (currentUtter === u) currentUtter = null;
      if (opts.onend) opts.onend();
    };

    currentUtter = u;
    synth.speak(u);
  }

  /**
   * 顺序连读
   * @param {string[]} texts
   * @param {object} opts { lang, rate, gap, onItem(index), onDone() }
   */
  function speakList(texts, opts) {
    opts = opts || {};
    var token = ++queueSeq;
    var list = (texts || []).filter(function (t) { return String(t || '').trim(); });
    if (!list.length || !synth) return;

    synth.cancel();
    var i = 0;

    function next() {
      if (token !== queueSeq) return;    // 已被新的朗读打断
      if (i >= list.length) {
        if (opts.onDone) opts.onDone();
        return;
      }
      var idx = i++;
      if (opts.onItem) opts.onItem(idx);
      speak(list[idx], {
        lang: opts.lang,
        rate: typeof opts.rate === 'number' ? opts.rate : rate,
        onend: function () {
          if (token !== queueSeq) return;
          setTimeout(next, opts.gap == null ? 260 : opts.gap);
        },
        onerror: function () {
          if (token !== queueSeq) return;
          setTimeout(next, 120);
        }
      });
    }
    next();
  }

  function setRate(v) {
    var n = Number(v);
    if (!isNaN(n)) rate = Math.min(2, Math.max(0.3, n));
  }

  function getRate() { return rate; }

  global.Speech = {
    supported: supported,
    speak: speak,
    speakList: speakList,
    stop: stop,
    setRate: setRate,
    getRate: getRate,
    voices: function () { refreshVoices(); return voices.slice(); }
  };
})(window);
