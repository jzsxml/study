/* 页面交互逻辑 */
(function () {
  'use strict';

  var ENG = window.ENGLISH_DATA || { books: [] };
  var EXTRA = window.ENGLISH_EXTRA || { books: [] };
  var CHN = window.CHINESE_DATA || { books: [] };
  var MATH = window.MATH_DATA || { books: [] };
  var ESSAY = window.ESSAY_DATA || { grades: [] };
  var MORAL = window.MORAL_DATA || { books: [] };
  var SCI = window.SCIENCE_DATA || { books: [] };
  var MQ = window.MathQuiz || null;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var state = {
    view: 'english',
    engBook: ENG.books.length ? ENG.books[0].id : null,
    chnBook: CHN.books.length ? CHN.books[0].id : null,
    mathBook: MATH.books.length ? MATH.books[0].id : null,
    essayGrade: ESSAY.grades.length ? ESSAY.grades[0].grade : 1,
    moralBook: MORAL.books.length ? MORAL.books[0].id : null,
    scienceBook: SCI.books.length ? SCI.books[0].id : null,
    engQuery: '',
    engType: 'words',
    chnQuery: '',
    mathQuery: '',
    essayQuery: '',
    moralQuery: '',
    scienceQuery: '',
    essayType: 'all',
    quizEn: false,
    quizCn: false,
    playingUnit: null
  };

  /* ---------------- 通用 ---------------- */
  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem('study-pref') || '{}');
      if (saved.view) state.view = saved.view;
      if (saved.engBook && ENG.books.some(function (b) { return b.id === saved.engBook; })) state.engBook = saved.engBook;
      if (saved.chnBook && CHN.books.some(function (b) { return b.id === saved.chnBook; })) state.chnBook = saved.chnBook;
      if (saved.mathBook && MATH.books.some(function (b) { return b.id === saved.mathBook; })) state.mathBook = saved.mathBook;
      if (saved.essayGrade && ESSAY.grades.some(function (g) { return g.grade === saved.essayGrade; })) state.essayGrade = saved.essayGrade;
      if (saved.moralBook && MORAL.books.some(function (b) { return b.id === saved.moralBook; })) state.moralBook = saved.moralBook;
      if (saved.scienceBook && SCI.books.some(function (b) { return b.id === saved.scienceBook; })) state.scienceBook = saved.scienceBook;
    } catch (e) { /* ignore */ }
  }

  function save() {
    try {
      localStorage.setItem('study-pref', JSON.stringify({
        view: state.view, engBook: state.engBook, chnBook: state.chnBook,
        mathBook: state.mathBook, essayGrade: state.essayGrade,
        moralBook: state.moralBook, scienceBook: state.scienceBook
      }));
    } catch (e) { /* ignore */ }
  }

  function setRateLabel() { $('#rateVal').textContent = Speech.getRate().toFixed(2); }

  /* ---------------- 英语模块 ---------------- */
  function renderEngBooks() {
    $('#engBooks').innerHTML = ENG.books.map(function (b) {
      return '<button class="chip' + (b.id === state.engBook ? ' active' : '') + '" data-book="' + b.id + '">' + esc(b.title) + '</button>';
    }).join('');
  }

  function matchWord(w, q) {
    if (!q) return true;
    var s = q.toLowerCase();
    return w.w.toLowerCase().indexOf(s) > -1 || String(w.c || '').indexOf(q) > -1;
  }

  var ENG_TYPES = [
    { id: 'words', name: '单词' },
    { id: 'patterns', name: '句型' },
    { id: 'grammar', name: '语法' }
  ];

  function renderEngTypes() {
    $('#engTypes').innerHTML = ENG_TYPES.map(function (t) {
      return '<button class="type-chip' + (t.id === state.engType ? ' active' : '') + '" data-type="' + t.id + '">' + esc(t.name) + '</button>';
    }).join('');
  }

  function renderEnglish() {
    renderEngBooks();
    renderEngTypes();
    if (state.engType === 'patterns') { renderEngPatterns(); return; }
    if (state.engType === 'grammar') { renderEngGrammars(); return; }
    renderEngWords();
  }

  function renderEngWords() {
    var q = state.engQuery.trim();
    // 有关键词时跨全部 8 册搜索，否则只显示当前册
    var books = q ? ENG.books : ENG.books.filter(function (b) { return b.id === state.engBook; });
    if (!books.length) books = ENG.books.slice(0, 1);
    if (!ENG.books.length) { $('#engContent').innerHTML = '<div class="empty">暂无数据</div>'; return; }

    var html = '';
    var total = 0;

    books.forEach(function (book) {
      book.units.forEach(function (unit) {
        var words = unit.words.filter(function (w) { return matchWord(w, q); });
        if (!words.length) return;
        total += words.length;

        html += '<div class="unit-card" data-unit="' + esc(unit.unit) + '" data-book="' + esc(book.id) + '">' +
          '<div class="unit-head">' +
            '<span class="unit-no">' + esc(unit.unit) + '</span>' +
            '<span class="unit-name">' + esc(unit.title) + '</span>' +
            (q ? '<span class="unit-book">' + esc(book.title) + '</span>' : '') +
            '<button class="play-unit" data-play-unit="' + esc(unit.unit) + '" data-play-book="' + esc(book.id) + '">▶ 连读本单元</button>' +
          '</div>' +
          '<div class="word-grid">' +
          words.map(function (w) {
            return '<div class="word" data-word="' + esc(w.w) + '" data-lang="en-US">' +
              '<div class="word-main">' +
                '<div class="word-en">' + esc(w.w) + '</div>' +
                '<div class="word-ph">' + esc(w.p || '') + '</div>' +
                '<div class="word-cn">' + esc(w.c || '') + '</div>' +
              '</div>' +
              '<div class="spk">🔊</div>' +
            '</div>';
          }).join('') +
          '</div></div>';
      });
    });

    $('#engContent').innerHTML = total ? html : '<div class="empty">没有找到 “' + esc(q) + '” 相关的单词（已搜索全部 8 册），换个关键词试试</div>';
    $('#engContent').classList.toggle('quiz-on', state.quizEn);
  }

  function renderEngPatterns() {
    var q = state.engQuery.trim();
    var low = q.toLowerCase();
    var books = q ? EXTRA.books : EXTRA.books.filter(function (b) { return b.id === state.engBook; });
    if (!books.length) books = EXTRA.books.slice(0, 1);

    var list = [];
    books.forEach(function (book) {
      (book.patterns || []).forEach(function (p) {
        if (q) {
          var hay = [p.en, p.cn, p.use, (p.eg || []).join(' '), p.egCn || ''].join(' ').toLowerCase();
          if (hay.indexOf(low) === -1) return;
        }
        list.push({ p: p, book: book.title });
      });
    });

    $('#engContent').innerHTML = list.length
      ? '<div class="pattern-grid">' + list.map(function (item) {
        var p = item.p;
        var eg = (p.eg || []).map(function (l) { return esc(l); }).join('<br>');
        return '<article class="pattern-card">' +
          '<div class="pattern-head">' +
            '<div class="pattern-main">' +
              '<div class="pattern-en">' + esc(p.en) + '</div>' +
              '<div class="pattern-cn">' + esc(p.cn) + '</div>' +
              '<span class="pattern-use">' + esc(p.use || '句型') + '</span>' +
              (q ? ' <span class="unit-book">' + esc(item.book) + '</span>' : '') +
            '</div>' +
            '<button class="play-btn" data-en-read="' + esc(p.en) + '">🔊</button>' +
          '</div>' +
          (eg ? '<div class="pattern-eg">' + eg + (p.egCn ? '<br><span class="eg-cn">' + esc(p.egCn) + '</span>' : '') + '</div>' : '') +
        '</article>';
      }).join('') + '</div>'
      : '<div class="empty">没有找到 “' + esc(q) + '” 相关的句型（已搜索全部 8 册）</div>';
    $('#engContent').classList.remove('quiz-on');
  }

  function renderEngGrammars() {
    var q = state.engQuery.trim();
    var low = q.toLowerCase();
    var books = q ? EXTRA.books : EXTRA.books.filter(function (b) { return b.id === state.engBook; });
    if (!books.length) books = EXTRA.books.slice(0, 1);

    var list = [];
    books.forEach(function (book) {
      (book.grammars || []).forEach(function (g) {
        if (q) {
          var hay = [g.t, (g.lines || []).join(' '), (g.eg || []).join(' '), g.tip || ''].join(' ').toLowerCase();
          if (hay.indexOf(low) === -1) return;
        }
        list.push({ g: g, book: book.title });
      });
    });

    $('#engContent').innerHTML = list.length
      ? '<div class="grammar-grid">' + list.map(function (item, i) {
        var g = item.g;
        var egText = (g.eg || []).join(' ');
        return '<article class="grammar-card">' +
          '<div class="grammar-head">' +
            '<span class="grammar-no">' + (i + 1) + '</span>' +
            '<h3 class="grammar-title">' + esc(g.t) + '</h3>' +
            (q ? '<span class="unit-book">' + esc(item.book) + '</span>' : '') +
            (egText ? '<button class="play-btn" data-en-read="' + esc(egText) + '">🔊 读例句</button>' : '') +
          '</div>' +
          '<div class="grammar-body">' +
            (g.lines || []).map(function (l) { return '<div class="grammar-line">' + esc(l) + '</div>'; }).join('') +
          '</div>' +
          (egText ? '<div class="grammar-eg">' + (g.eg || []).map(function (l) { return esc(l); }).join('<br>') + '</div>' : '') +
          (g.tip ? '<div class="point-tip">' + esc(g.tip) + '</div>' : '') +
        '</article>';
      }).join('') + '</div>'
      : '<div class="empty">没有找到 “' + esc(q) + '” 相关的语法点（已搜索全部 8 册）</div>';
    $('#engContent').classList.remove('quiz-on');
  }

  function playEnglishWord(el) {
    var word = el.getAttribute('data-word');
    if (!word) return;
    $$('.word.speaking').forEach(function (n) { n.classList.remove('speaking'); });
    el.classList.add('speaking');
    if (state.quizEn) el.classList.add('revealed');
    Speech.speak(word, {
      lang: 'en-US',
      onend: function () { el.classList.remove('speaking'); },
      onerror: function () {
        el.classList.remove('speaking');
        if (!Speech.supported()) toast('当前浏览器不支持语音合成，建议使用 Chrome / Edge');
      }
    });
  }

  function playEnglishUnit(unitNo, bookId, btn) {
    var book = ENG.books.filter(function (b) { return b.id === (bookId || state.engBook); })[0];
    if (!book) return;
    var unit = book.units.filter(function (u) { return u.unit === unitNo; })[0];
    if (!unit) return;
    var q = state.engQuery.trim();
    var words = unit.words.filter(function (w) { return matchWord(w, q); });

    var key = book.id + '|' + unitNo;
    if (state.playingUnit === key) {  // 再次点击 = 停止
      Speech.stop();
      state.playingUnit = null;
      btn.textContent = '▶ 连读本单元';
      return;
    }

    var card = btn.closest('.unit-card');
    var nodes = $$('.word', card);
    state.playingUnit = key;
    btn.textContent = '■ 停止连读';

    Speech.speakList(words.map(function (w) { return w.w; }), {
      lang: 'en-US',
      gap: 260,
      onItem: function (i) {
        nodes.forEach(function (n) { n.classList.remove('speaking'); });
        if (nodes[i]) {
          nodes[i].classList.add('speaking');
          if (nodes[i].scrollIntoView) nodes[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      },
      onDone: function () {
        nodes.forEach(function (n) { n.classList.remove('speaking'); });
        state.playingUnit = null;
        btn.textContent = '▶ 连读本单元';
      }
    });
  }

  /* ---------------- 语文模块 ---------------- */
  function renderChnBooks() {
    $('#chnBooks').innerHTML = CHN.books.map(function (b) {
      return '<button class="chip' + (b.id === state.chnBook ? ' active' : '') + '" data-book="' + b.id + '">' + esc(b.title) + '</button>';
    }).join('');
  }

  function renderChinese() {
    renderChnBooks();
    if (!CHN.books.length) {
      $('#chnChars').innerHTML = '<div class="empty">暂无数据</div>';
      $('#chnPoems').innerHTML = '';
      $('#chnPoints').innerHTML = '';
      return;
    }

    var q = state.chnQuery.trim();
    var qLow = q.toLowerCase();
    var qIsLower = q && qLow !== q;   // 纯拼音/英文搜索时大小写不敏感
    // 有关键词时跨 12 册搜索，否则只显示当前册
    var books = q ? CHN.books : CHN.books.filter(function (b) { return b.id === state.chnBook; });
    if (!books.length) books = CHN.books.slice(0, 1);

    var chars = [];
    books.forEach(function (book) {
      (book.chars || []).forEach(function (c) {
        if (q) {
          var hit = String(c.c).indexOf(q) > -1 ||
            String(c.w || '').indexOf(q) > -1 ||
            String(c.p || '').toLowerCase().indexOf(qLow) > -1;
          if (!hit) return;
        }
        chars.push({ c: c.c, p: c.p, w: c.w, book: book.title });
      });
    });

    $('#chnChars').innerHTML = chars.length ? chars.map(function (c) {
      return '<div class="char-card" data-read="' + esc(c.c + (c.w ? '，' + c.w : '')) + '">' +
        '<div class="char-big">' + esc(c.c) + '</div>' +
        '<div class="char-py">' + esc(c.p || '') + '</div>' +
        '<div class="char-word">' + esc(c.w || '') + '</div>' +
        (q ? '<div class="char-book">' + esc(c.book) + '</div>' : '') +
      '</div>';
    }).join('') : '<div class="empty">没有找到相关生字（已搜索全部 12 册）</div>';
    $('#chnChars').classList.toggle('quiz-on', state.quizCn);

    var poems = [];
    books.forEach(function (book) {
      (book.poems || []).forEach(function (p) {
        if (q) {
          var body = (p.lines || []).join('');
          var hit2 = String(p.t).indexOf(q) > -1 ||
            String(p.a || '').indexOf(q) > -1 ||
            body.indexOf(q) > -1 ||
            (qIsLower && body.toLowerCase().indexOf(qLow) > -1);
          if (!hit2) return;
        }
        poems.push({ p: p, book: book.title });
      });
    });

    $('#chnPoems').innerHTML = poems.length ? poems.map(function (item, idx) {
      var p = item.p;
      var lines = (p.lines || []).map(function (l) {
        return '<div class="poem-line">' + esc(l) + '</div>';
      }).join('');
      var meta = [p.dyn, p.a].filter(Boolean).join(' · ') + (q ? ' · ' + item.book : '');
      return '<article class="poem-card" data-poem="' + idx + '">' +
        '<div class="poem-top">' +
          '<div>' +
            '<h3 class="poem-title">' + esc(p.t) + '</h3>' +
            '<div class="poem-meta">' + esc(meta) + '</div>' +
          '</div>' +
          '<div class="poem-tools">' +
            '<button class="play-btn" data-play-poem="' + idx + '">🔊 朗读</button>' +
            '<button class="play-btn" data-mask="1">背诵模式</button>' +
          '</div>' +
        '</div>' +
        '<div class="poem-body">' + lines + '</div>' +
        '<div class="mask-note">背诵模式：原文已遮盖，点击“显示原文”核对</div>' +
        (p.note ? '<div class="poem-note"><b>提示</b> ' + esc(p.note) + '</div>' : '') +
      '</article>';
    }).join('') : '<div class="empty">没有找到相关诗文</div>';

    // 诗文朗读用当前过滤结果做映射
    $('#chnPoems')._poems = poems.map(function (item) { return item.p; });

    // 语文知识与考点（低 / 中 / 高年级分段整理）
    var points = [];
    books.forEach(function (book) {
      (book.points || []).forEach(function (p) {
        if (q) {
          var hay = [p.t, p.cat || '', (p.lines || []).join(' '), p.tip || ''].join(' ').toLowerCase();
          if (hay.indexOf(qLow) === -1) return;
        }
        points.push({ p: p, book: book.title });
      });
    });

    $('#chnPoints').innerHTML = points.length ? points.map(function (item, i) {
      var p = item.p;
      return '<article class="point-card">' +
        '<div class="point-head">' +
          '<span class="point-cat">' + esc(p.cat || '语文知识') + '</span>' +
          '<h3 class="point-title">' + esc(p.t) + '</h3>' +
          (q ? '<span class="unit-book">' + esc(item.book) + '</span>' : '') +
          '<button class="play-btn" data-chn-point="' + i + '">🔊 朗读</button>' +
        '</div>' +
        '<div class="point-body">' +
          (p.lines || []).map(function (l) { return '<div class="point-line">' + esc(l) + '</div>'; }).join('') +
        '</div>' +
        (p.tip ? '<div class="point-tip"><b>易错提示</b> ' + esc(p.tip) + '</div>' : '') +
      '</article>';
    }).join('') : '<div class="empty">没有找到相关语文知识（已搜索全部 12 册）</div>';
    $('#chnPoints')._points = points.map(function (item) { return item.p; });
  }

  function playChars(card) {
    var text = card.getAttribute('data-read');
    if (!text) return;
    $$('.char-card.speaking').forEach(function (n) { n.classList.remove('speaking'); });
    card.classList.add('speaking');
    if (state.quizCn) card.classList.add('revealed');
    Speech.speak(text, {
      lang: 'zh-CN',
      onend: function () { card.classList.remove('speaking'); },
      onerror: function () {
        card.classList.remove('speaking');
        if (!Speech.supported()) toast('当前浏览器不支持语音合成，建议使用 Chrome / Edge');
      }
    });
  }

  function playPoem(card, btn) {
    var idx = Number(card.getAttribute('data-poem'));
    var poems = $('#chnPoems')._poems || [];
    var poem = poems[idx];
    if (!poem) return;

    var lines = poem.lines || [];
    var nodes = $$('.poem-line', card);
    var title = [poem.t, poem.a].filter(Boolean).join('，');
    var seq = [title].concat(lines);

    btn.textContent = '■ 停止';
    Speech.speakList(seq, {
      lang: 'zh-CN',
      gap: 380,
      onItem: function (i) {
        nodes.forEach(function (n) { n.classList.remove('speaking-line'); });
        if (i > 0 && nodes[i - 1]) nodes[i - 1].classList.add('speaking-line');
      },
      onDone: function () {
        nodes.forEach(function (n) { n.classList.remove('speaking-line'); });
        btn.textContent = '🔊 朗读';
      }
    });
  }

  /* ---------------- 数学模块 ---------------- */
  function renderMathBooks() {
    $('#mathBooks').innerHTML = MATH.books.map(function (b) {
      return '<button class="chip' + (b.id === state.mathBook ? ' active' : '') + '" data-book="' + b.id + '">' + esc(b.title) + '</button>';
    }).join('');
  }

  function renderMath() {
    renderMathBooks();
    if (!MATH.books.length) {
      $('#mathPoints').innerHTML = '<div class="empty">暂无数据</div>';
      $('#mathStages').innerHTML = '';
      $('#mathStageIntro').hidden = true;
      return;
    }
    var q = state.mathQuery.trim();
    // 有关键词时跨 12 册搜索，否则只显示当前册
    var books = q ? MATH.books : MATH.books.filter(function (b) { return b.id === state.mathBook; });
    if (!books.length) books = MATH.books.slice(0, 1);

    var list = [];
    books.forEach(function (book) {
      (book.points || []).forEach(function (p) {
        if (q) {
          var hay = (p.t || '') + ' ' + (p.cat || '') + ' ' + (p.lines || []).join(' ') + ' ' + (p.tip || '');
          if (hay.indexOf(q) === -1) return;
        }
        list.push({ p: p, book: book.title });
      });
    });

    $('#mathPoints').innerHTML = list.length ? list.map(function (item) {
      var p = item.p;
      return '<article class="point-card">' +
        '<div class="point-head">' +
          '<span class="point-cat">' + esc(p.cat || '知识点') + '</span>' +
          '<h3 class="point-title">' + esc(p.t) + '</h3>' +
          (q ? '<span class="unit-book">' + esc(item.book) + '</span>' : '') +
        '</div>' +
        '<div class="point-body">' +
          (p.lines || []).map(function (l) { return '<div class="point-line">' + esc(l) + '</div>'; }).join('') +
        '</div>' +
        (p.tip ? '<div class="point-tip"><b>易错</b> ' + esc(p.tip) + '</div>' : '') +
      '</article>';
    }).join('') : '<div class="empty">没有找到 “' + esc(q) + '” 相关的知识点（已搜索全部 12 册）</div>';

    // 年级考点梳理：未搜索时按当前册的年级匹配，搜索时跨年级检索
    var curBook = MATH.books.filter(function (b) { return b.id === state.mathBook; })[0] || books[0];
    var intro = '';
    var stageCards = [];

    (MATH.stages || []).forEach(function (st) {
      var sameBook = curBook && st.grade === curBook.grade && st.term === curBook.term;
      if (!q && !sameBook) return;
      (st.points || []).forEach(function (p) {
        if (q) {
          var hay = [st.name, st.intro || '', p.cat || '', p.t || '', (p.lines || []).join(' '), p.tip || ''].join(' ');
          if (hay.indexOf(q) === -1) return;
        }
        stageCards.push({ p: p, stage: st });
      });
      if (!q) intro = st.name + ' · ' + (st.intro || '');
    });

    $('#mathStageIntro').textContent = intro;
    $('#mathStageIntro').hidden = !intro;
    $('#mathStageTitle').hidden = !!q && !stageCards.length;
    $('#mathStages').innerHTML = stageCards.length ? stageCards.map(function (item) {
      var p = item.p;
      return '<article class="point-card">' +
        '<div class="point-head">' +
          '<span class="point-cat">' + esc(item.stage.name) + '</span>' +
          '<h3 class="point-title">' + esc(p.t) + '</h3>' +
        '</div>' +
        '<div class="point-body">' +
          (p.lines || []).map(function (l) { return '<div class="point-line">' + esc(l) + '</div>'; }).join('') +
        '</div>' +
        (p.tip ? '<div class="point-tip"><b>易错</b> ' + esc(p.tip) + '</div>' : '') +
      '</article>';
    }).join('') : (q ? '' : '<div class="empty">暂无年级考点</div>');
  }

  /* --- 口算练习 --- */
  var quiz = { grade: 1, items: [], idx: 0, right: 0, wrong: 0, locked: false };

  function renderQuizGrades() {
    var html = '';
    for (var g = 1; g <= 6; g++) {
      html += '<button class="chip' + (g === quiz.grade ? ' active' : '') + '" data-grade="' + g + '">' + g + '年级</button>';
    }
    $('#quizGrades').innerHTML = html;
  }

  function setQuizFeedback(text, cls) {
    var el = $('#quizFeedback');
    el.textContent = text;
    el.className = 'quiz-feedback' + (cls ? ' ' + cls : '');
  }

  function updateQuizStats() {
    var total = quiz.items.length;
    var done = Math.min(quiz.idx, total);
    var html = '<span>进度 <b>' + done + '/' + total + '</b></span>' +
      '<span>正确 <b>' + quiz.right + '</b></span>' +
      '<span>错误 <b>' + quiz.wrong + '</b></span>';
    if (done > 0) html += '<span>正确率 <b>' + Math.round(quiz.right / done * 100) + '%</b></span>';
    $('#quizStats').innerHTML = html;
  }

  function showQuizQuestion() {
    var it = quiz.items[quiz.idx];
    if (!it) { finishQuiz(); return; }
    $('#quizQuestion').textContent = it.q.indexOf('?') > -1 ? it.q : it.q + ' = ?';
    var input = $('#quizInput');
    input.value = '';
    input.disabled = false;
    quiz.locked = false;
    updateQuizStats();
    if (state.view === 'math') input.focus();
  }

  function finishQuiz() {
    $('#quizQuestion').textContent = '本组完成';
    setQuizFeedback('答对 ' + quiz.right + ' 题，答错 ' + quiz.wrong + ' 题。点「换一组题」再来一组。',
      quiz.wrong === 0 ? 'ok' : 'bad');
    $('#quizInput').disabled = true;
    updateQuizStats();
  }

  function startQuiz() {
    if (!MQ) { setQuizFeedback('练习模块未加载', 'bad'); return; }
    var n = Number($('#quizCount').value) || 10;
    quiz.items = MQ.make(quiz.grade, n);
    quiz.idx = 0;
    quiz.right = 0;
    quiz.wrong = 0;
    quiz.locked = false;
    setQuizFeedback('', '');
    showQuizQuestion();
  }

  function submitQuizAnswer() {
    if (quiz.locked) return;
    var it = quiz.items[quiz.idx];
    if (!it) { startQuiz(); return; }
    var raw = $('#quizInput').value.trim();
    if (!raw) return;
    var res = MQ.check(raw, it);
    quiz.locked = true;
    $('#quizInput').disabled = true;
    if (res.ok) {
      quiz.right++;
      setQuizFeedback('✔ 答对了！', 'ok');
    } else {
      quiz.wrong++;
      setQuizFeedback('✘ 正确答案：' + it.text + (res.reason ? '（' + res.reason + '）' : ''), 'bad');
    }
    quiz.idx++;
    updateQuizStats();
    setTimeout(function () {
      if (quiz.idx < quiz.items.length) showQuizQuestion();
      else finishQuiz();
    }, res.ok ? 480 : 1300);
  }

  /* ---------------- 作文模块 ---------------- */
  var ESSAY_TYPES = [
    { id: 'all', name: '全部' },
    { id: 'words', name: '好词' },
    { id: 'sentences', name: '好句金句' },
    { id: 'segments', name: '好段' },
    { id: 'essays', name: '满分范文' },
    { id: 'tips', name: '写作技法' }
  ];

  function renderEssayGrades() {
    $('#essayGrades').innerHTML = ESSAY.grades.map(function (g) {
      return '<button class="chip' + (g.grade === state.essayGrade ? ' active' : '') + '" data-grade="' + g.grade + '">' + esc(g.title) + '</button>';
    }).join('');
  }

  function renderEssayTypes() {
    $('#essayTypes').innerHTML = ESSAY_TYPES.map(function (t) {
      return '<button class="type-chip' + (t.id === state.essayType ? ' active' : '') + '" data-type="' + t.id + '">' + esc(t.name) + '</button>';
    }).join('');
  }

  function essayMatch(text, q) {
    return !q || String(text || '').indexOf(q) > -1;
  }

  function renderEssay() {
    renderEssayGrades();
    renderEssayTypes();
    var box = $('#essayContent');
    if (!ESSAY.grades.length) { box.innerHTML = '<div class="empty">暂无数据</div>'; return; }

    var q = state.essayQuery.trim();
    var type = state.essayType;
    var grades = q ? ESSAY.grades : ESSAY.grades.filter(function (g) { return g.grade === state.essayGrade; });
    if (!grades.length) grades = ESSAY.grades.slice(0, 1);

    var html = '';
    var essayList = [];

    grades.forEach(function (g) {
      var block = '';

      // 年级写作要点（有内容时才显示，搜索时同时标注年级）
      var tipText = q ? (g.title + ' · ' + (g.tip || '')) : ('本年级写作要点：' + (g.tip || ''));

      // 好词
      if (type === 'all' || type === 'words') {
        var themes = (g.words || []).map(function (t) {
          var list = (t.list || []).filter(function (w) {
            return !q || w.indexOf(q) > -1 || (t.name || '').indexOf(q) > -1;
          });
          if (!list.length) return '';
          return '<div class="word-theme">' +
            '<span class="theme-name">' + esc(t.name) + '</span>' +
            '<div class="word-tags">' +
            list.map(function (w) {
              return '<span class="word-tag" data-read="' + esc(w) + '">' + esc(w) + '</span>';
            }).join('') +
            '</div></div>';
        }).join('');
        if (themes) {
          block += '<section class="essay-block"><h3 class="block-title">好词 <small>点击词语可朗读</small></h3>' +
            '<div class="word-themes">' + themes + '</div></section>';
        }
      }

      // 好句
      if (type === 'all' || type === 'sentences') {
        var ss = (g.sentences || []).filter(function (p) {
          return essayMatch(p.text, q) || essayMatch(p.t, q);
        });
        if (ss.length) {
          block += '<section class="essay-block"><h3 class="block-title">好句 · 金句 <small>点“朗读”跟着读一遍</small></h3>' +
            '<div class="quote-list">' +
            ss.map(function (p) {
              return '<div class="quote-card">' +
                '<span class="quote-tag">' + esc(p.t || '好句') + '</span>' +
                '<p class="quote-text">' + esc(p.text) + '</p>' +
                '<button class="play-btn" data-read="' + esc(p.text) + '">🔊 朗读</button>' +
              '</div>';
            }).join('') +
            '</div></section>';
        }
      }

      // 好段
      if (type === 'all' || type === 'segments') {
        var sg = (g.segments || []).filter(function (p) {
          return essayMatch(p.text, q) || essayMatch(p.t, q);
        });
        if (sg.length) {
          block += '<section class="essay-block"><h3 class="block-title">好段 <small>开头、过渡、结尾，可以直接借鉴</small></h3>' +
            '<div class="quote-list">' +
            sg.map(function (p) {
              return '<div class="quote-card">' +
                '<span class="quote-tag">' + esc(p.t || '好段') + '</span>' +
                '<p class="quote-text">' + esc(p.text) + '</p>' +
                '<button class="play-btn" data-read="' + esc(p.text) + '">🔊 朗读</button>' +
              '</div>';
            }).join('') +
            '</div></section>';
        }
      }

      // 范文
      if (type === 'all' || type === 'essays') {
        var es = (g.essays || []).filter(function (e) {
          return essayMatch(e.t, q) || essayMatch(e.type, q) ||
            essayMatch((e.body || []).join(''), q) || essayMatch(e.review, q);
        });
        if (es.length) {
          var cards = es.map(function (e) {
            var idx = essayList.length;
            essayList.push(e);
            var meta = [e.type, e.len ? '约' + e.len + '字' : ''].filter(Boolean).join(' · ');
            var paras = (e.body || []).map(function (p) {
              return '<p class="essay-para">' + esc(p) + '</p>';
            }).join('');
            return '<article class="essay-card">' +
              '<div class="essay-head">' +
                '<h3 class="essay-title">' + esc(e.t) + '</h3>' +
                '<span class="essay-meta">' + esc(meta) + '</span>' +
                '<button class="play-btn" data-essay-play="' + idx + '">🔊 朗读全文</button>' +
              '</div>' +
              '<div class="essay-body">' + paras + '</div>' +
              (e.review ? '<div class="essay-review"><b>点评</b> ' + esc(e.review) + '</div>' : '') +
            '</article>';
          }).join('');
          block += '<section class="essay-block"><h3 class="block-title">满分范文</h3>' + cards + '</section>';
        }
      }

      // 技法
      if (type === 'all' || type === 'tips') {
        var ts = (g.tips || []).filter(function (t) { return essayMatch(t, q); });
        if (ts.length) {
          block += '<section class="essay-block"><h3 class="block-title">写作技法</h3><div class="tip-list">' +
            ts.map(function (t, i) {
              return '<div class="tip-item"><span class="tip-no">' + (i + 1) + '</span><span>' + esc(t) + '</span></div>';
            }).join('') +
            '</div></section>';
        }
      }

      if (block && g.tip) {
        block = '<p class="version-tip">' + esc(tipText) + '</p>' + block;
      }
      html += block;
    });

    box.innerHTML = html || '<div class="empty">没有找到相关素材，换个关键词试试</div>';
    box._essays = essayList;
  }

  function playEssay(idx, btn) {
    var list = $('#essayContent')._essays || [];
    var e = list[idx];
    if (!e) return;
    var card = btn.closest('.essay-card');
    var paras = $$('.essay-para', card);
    var seq = ['《' + e.t + '》'].concat(e.body || []);
    btn.textContent = '■ 停止';
    Speech.speakList(seq, {
      lang: 'zh-CN',
      gap: 420,
      onItem: function (i) {
        paras.forEach(function (n) { n.classList.remove('speaking'); });
        if (i > 0 && paras[i - 1]) paras[i - 1].classList.add('speaking');
      },
      onDone: function () {
        paras.forEach(function (n) { n.classList.remove('speaking'); });
        btn.textContent = '🔊 朗读全文';
      }
    });
  }

  /* ---------------- 道德与法治模块 ---------------- */
  function renderMoralBooks() {
    $('#moralBooks').innerHTML = MORAL.books.map(function (b) {
      return '<button class="chip' + (b.id === state.moralBook ? ' active' : '') + '" data-book="' + b.id + '">' + esc(b.title) + '</button>';
    }).join('');
  }

  function updateCheckStats() {
    var box = $('#moralChecks');
    var stats = $('#moralStats');
    if (!box || !stats) return;
    var items = $$('.check-item', box);
    var done = items.filter(function (n) { return n.classList.contains('judged'); }).length;
    var right = items.filter(function (n) { return n.getAttribute('data-result') === '1'; }).length;
    var html = '<span>共 <b>' + items.length + '</b> 题</span>' +
      '<span>已答 <b>' + done + '</b></span>' +
      '<span>答对 <b>' + right + '</b></span>';
    if (done > 0) html += '<span>正确率 <b>' + Math.round(right / done * 100) + '%</b></span>';
    stats.innerHTML = html;
  }

  function renderMoral() {
    renderMoralBooks();
    var pbox = $('#moralPoints');
    var cbox = $('#moralChecks');
    if (!MORAL.books.length) {
      pbox.innerHTML = '<div class="empty">暂无数据</div>';
      cbox.innerHTML = '';
      return;
    }

    var q = state.moralQuery.trim();
    var books = q ? MORAL.books : MORAL.books.filter(function (b) { return b.id === state.moralBook; });
    if (!books.length) books = MORAL.books.slice(0, 1);

    var points = [];
    var checks = [];
    books.forEach(function (book) {
      (book.points || []).forEach(function (p) {
        if (q) {
          var hay = (p.cat || '') + ' ' + (p.t || '') + ' ' + (p.lines || []).join(' ') + ' ' + (p.act || '');
          if (hay.indexOf(q) === -1) return;
        }
        points.push({ p: p, book: book.title });
      });
      (book.checks || []).forEach(function (c) {
        if (q && (c.q || '').indexOf(q) === -1 && (c.why || '').indexOf(q) === -1) return;
        checks.push({ c: c, book: book.title });
      });
    });

    pbox.innerHTML = points.length ? points.map(function (item, i) {
      var p = item.p;
      return '<article class="point-card">' +
        '<div class="point-head">' +
          '<span class="point-cat">' + esc(p.cat || '要点') + '</span>' +
          '<h3 class="point-title">' + esc(p.t) + '</h3>' +
          (q ? '<span class="unit-book">' + esc(item.book) + '</span>' : '') +
          '<button class="play-btn" data-moral-read="' + i + '">🔊 朗读</button>' +
        '</div>' +
        '<div class="point-body">' +
          (p.lines || []).map(function (l) { return '<div class="point-line">' + esc(l) + '</div>'; }).join('') +
        '</div>' +
        (p.act ? '<div class="point-tip">' + esc(p.act) + '</div>' : '') +
      '</article>';
    }).join('') : '<div class="empty">没有找到相关要点</div>';
    pbox._items = points;

    cbox._checks = checks.map(function (x) { return x.c; });
    cbox.innerHTML = checks.length
      ? '<div class="check-stats" id="moralStats"></div><div class="check-list">' +
        checks.map(function (item, i) {
          var c = item.c;
          return '<div class="check-item" data-check="' + i + '">' +
            '<div class="check-q"><span class="check-no">' + (i + 1) + '</span><span>' + esc(c.q) + '</span></div>' +
            '<div class="check-actions">' +
              '<button class="check-btn" data-ans="1">✔ 对</button>' +
              '<button class="check-btn" data-ans="0">✘ 错</button>' +
            '</div>' +
            '<div class="check-why"><b>解析</b> ' + esc(c.why || '') + '</div>' +
          '</div>';
        }).join('') + '</div>'
      : '<div class="empty">没有找到相关判断</div>';
    updateCheckStats();
  }

  function judgeCheck(itemEl, ans) {
    if (!itemEl || itemEl.classList.contains('judged')) return;
    var list = $('#moralChecks')._checks || [];
    var c = list[Number(itemEl.getAttribute('data-check'))];
    if (!c) return;
    var userAns = ans === '1';
    var right = userAns === !!c.a;
    itemEl.classList.add('judged');
    itemEl.setAttribute('data-result', right ? '1' : '0');
    $$('.check-btn', itemEl).forEach(function (b) {
      b.disabled = true;
      var isTrue = b.getAttribute('data-ans') === '1';
      if (isTrue === !!c.a) b.classList.add('right');
      else if (isTrue === userAns) b.classList.add('wrong');
    });
    updateCheckStats();
  }

  /* ---------------- 科学模块 ---------------- */
  function renderScienceBooks() {
    $('#scienceBooks').innerHTML = SCI.books.map(function (b) {
      return '<button class="chip' + (b.id === state.scienceBook ? ' active' : '') + '" data-book="' + b.id + '">' + esc(b.title) + '</button>';
    }).join('');
  }

  function updateScienceStats() {
    var box = $('#scienceQuizzes');
    var stats = $('#scienceStats');
    if (!box || !stats) return;
    var items = $$('.check-item', box);
    var done = items.filter(function (n) { return n.classList.contains('judged'); }).length;
    var right = items.filter(function (n) { return n.getAttribute('data-result') === '1'; }).length;
    var html = '<span>共 <b>' + items.length + '</b> 题</span>' +
      '<span>已答 <b>' + done + '</b></span>' +
      '<span>答对 <b>' + right + '</b></span>';
    if (done > 0) html += '<span>正确率 <b>' + Math.round(right / done * 100) + '%</b></span>';
    stats.innerHTML = html;
  }

  function renderScience() {
    renderScienceBooks();
    var pbox = $('#sciencePoints');
    var qbox = $('#scienceQuizzes');
    if (!SCI.books.length) {
      pbox.innerHTML = '<div class="empty">暂无数据</div>';
      qbox.innerHTML = '';
      return;
    }

    var q = state.scienceQuery.trim();
    var books = q ? SCI.books : SCI.books.filter(function (b) { return b.id === state.scienceBook; });
    if (!books.length) books = SCI.books.slice(0, 1);

    var points = [];
    var quizzes = [];
    books.forEach(function (book) {
      (book.points || []).forEach(function (p) {
        if (q) {
          var hay = (p.cat || '') + ' ' + (p.t || '') + ' ' + (p.lines || []).join(' ') + ' ' + (p.exp || '');
          if (hay.indexOf(q) === -1) return;
        }
        points.push({ p: p, book: book.title });
      });
      (book.quizzes || []).forEach(function (item) {
        if (q) {
          var hay2 = (item.q || '') + ' ' + (item.opts || []).join(' ') + ' ' + (item.why || '');
          if (hay2.indexOf(q) === -1) return;
        }
        quizzes.push(item);
      });
    });

    pbox.innerHTML = points.length ? points.map(function (item, i) {
      var p = item.p;
      return '<article class="point-card">' +
        '<div class="point-head">' +
          '<span class="point-cat">' + esc(p.cat || '知识点') + '</span>' +
          '<h3 class="point-title">' + esc(p.t) + '</h3>' +
          (q ? '<span class="unit-book">' + esc(item.book) + '</span>' : '') +
          '<button class="play-btn" data-sci-read="' + i + '">🔊 朗读</button>' +
        '</div>' +
        '<div class="point-body">' +
          (p.lines || []).map(function (l) { return '<div class="point-line">' + esc(l) + '</div>'; }).join('') +
        '</div>' +
        (p.exp ? '<div class="point-tip">' + esc(p.exp) + '</div>' : '') +
      '</article>';
    }).join('') : '<div class="empty">没有找到相关知识点</div>';
    pbox._items = points;

    var letters = ['A', 'B', 'C', 'D'];
    qbox._quizzes = quizzes;
    qbox.innerHTML = quizzes.length
      ? '<div class="check-stats" id="scienceStats"></div><div class="check-list">' +
        quizzes.map(function (item, i) {
          return '<div class="check-item" data-quiz="' + i + '">' +
            '<div class="check-q"><span class="check-no">' + (i + 1) + '</span><span>' + esc(item.q) + '</span></div>' +
            '<div class="q-opts">' +
              (item.opts || []).map(function (opt, oi) {
                return '<button class="q-opt" data-opt="' + oi + '">' + letters[oi] + '. ' + esc(opt) + '</button>';
              }).join('') +
            '</div>' +
            '<div class="check-why"><b>解析</b> ' + esc(item.why || '') + '</div>' +
          '</div>';
        }).join('') + '</div>'
      : '<div class="empty">没有找到相关问答</div>';
    updateScienceStats();
  }

  function judgeScienceQuiz(itemEl, optIndex) {
    if (!itemEl || itemEl.classList.contains('judged')) return;
    var list = $('#scienceQuizzes')._quizzes || [];
    var item = list[Number(itemEl.getAttribute('data-quiz'))];
    if (!item) return;
    var right = optIndex === item.a;
    itemEl.classList.add('judged');
    itemEl.setAttribute('data-result', right ? '1' : '0');
    $$('.q-opt', itemEl).forEach(function (b) {
      b.disabled = true;
      var i = Number(b.getAttribute('data-opt'));
      if (i === item.a) b.classList.add('right');
      else if (i === optIndex) b.classList.add('wrong');
    });
    updateScienceStats();
  }

  /* ---------------- 事件绑定 ---------------- */
  function bind() {
    // 顶部切换
    $('#tabs').addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      state.view = btn.getAttribute('data-view');
      $$('.tab').forEach(function (t) { t.classList.toggle('active', t === btn); });
      $$('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + state.view); });
      Speech.stop();
      save();
    });

    // 语速
    $('#rate').addEventListener('input', function (e) {
      Speech.setRate(e.target.value);
      setRateLabel();
    });

    $('#stopBtn').addEventListener('click', function () {
      Speech.stop();
      $$('.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      $$('.play-unit').forEach(function (b) { b.textContent = '▶ 连读本单元'; });
      $$('[data-play-poem]').forEach(function (b) { b.textContent = '🔊 朗读'; });
      $$('[data-essay-play]').forEach(function (b) { b.textContent = '🔊 朗读全文'; });
      state.playingUnit = null;
    });

    // 英语：切册 / 搜索 / 自测 / 点击发音 / 单元连读
    $('#engBooks').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.engBook = chip.getAttribute('data-book');
      state.playingUnit = null;
      Speech.stop();
      renderEnglish();
      save();
    });

    $('#engTypes').addEventListener('click', function (e) {
      var chip = e.target.closest('.type-chip');
      if (!chip) return;
      var type = chip.getAttribute('data-type');
      if (!type || type === state.engType) return;
      state.engType = type;
      state.playingUnit = null;
      Speech.stop();
      renderEnglish();
      save();
    });

    $('#engSearch').addEventListener('input', function (e) {
      state.engQuery = e.target.value;
      state.playingUnit = null;
      renderEnglish();
    });

    $('#quizEn').addEventListener('change', function (e) {
      state.quizEn = e.target.checked;
      $('#engContent').classList.toggle('quiz-on', state.quizEn);
    });

    $('#engContent').addEventListener('click', function (e) {
      var unitBtn = e.target.closest('[data-play-unit]');
      if (unitBtn) {
        playEnglishUnit(unitBtn.getAttribute('data-play-unit'), unitBtn.getAttribute('data-play-book'), unitBtn);
        return;
      }
      var readBtn = e.target.closest('[data-en-read]');
      if (readBtn) {
        Speech.stop();
        if (state.playingUnit) {
          state.playingUnit = null;
          $$('.play-unit').forEach(function (b) { b.textContent = '▶ 连读本单元'; });
        }
        Speech.speak(readBtn.getAttribute('data-en-read'), {
          lang: 'en-US',
          onerror: function () {
            if (!Speech.supported()) toast('当前浏览器不支持语音合成，建议使用 Chrome / Edge');
          }
        });
        return;
      }
      var word = e.target.closest('.word');
      if (word) {
        if (state.playingUnit) {
          Speech.stop();
          state.playingUnit = null;
          $$('.play-unit').forEach(function (b) { b.textContent = '▶ 连读本单元'; });
        }
        playEnglishWord(word);
      }
    });

    // 语文：切册 / 搜索 / 自测
    $('#chnBooks').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.chnBook = chip.getAttribute('data-book');
      Speech.stop();
      renderChinese();
      save();
    });

    $('#chnSearch').addEventListener('input', function (e) {
      state.chnQuery = e.target.value;
      renderChinese();
    });

    $('#quizCn').addEventListener('change', function (e) {
      state.quizCn = e.target.checked;
      $('#chnChars').classList.toggle('quiz-on', state.quizCn);
    });

    $('#chnChars').addEventListener('click', function (e) {
      var card = e.target.closest('.char-card');
      if (card) playChars(card);
    });

    $('#chnPoints').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-chn-point]');
      if (!btn) return;
      var items = $('#chnPoints')._points || [];
      var p = items[Number(btn.getAttribute('data-chn-point'))];
      if (!p) return;
      var card = btn.closest('.point-card');
      $$('.point-card.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      if (card) card.classList.add('speaking');
      Speech.speak(p.t + '。' + (p.lines || []).join('') + (p.tip ? '。易错提示：' + p.tip : ''), {
        lang: 'zh-CN',
        onend: function () { if (card) card.classList.remove('speaking'); },
        onerror: function () { if (card) card.classList.remove('speaking'); }
      });
    });

    $('#chnPoems').addEventListener('click', function (e) {
      var poemBtn = e.target.closest('[data-play-poem]');
      if (poemBtn) {
        var card = poemBtn.closest('.poem-card');
        if (poemBtn.textContent.indexOf('停止') > -1) {
          Speech.stop();
          $$('.speaking-line').forEach(function (n) { n.classList.remove('speaking-line'); });
          poemBtn.textContent = '🔊 朗读';
        } else {
          playPoem(card, poemBtn);
        }
        return;
      }
      var maskBtn = e.target.closest('[data-mask]');
      if (maskBtn) {
        var pc = maskBtn.closest('.poem-card');
        var masked = pc.classList.toggle('mask');
        maskBtn.textContent = masked ? '显示原文' : '背诵模式';
      }
    });

    // 数学：切册 / 搜索
    $('#mathBooks').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.mathBook = chip.getAttribute('data-book');
      renderMath();
      save();
    });

    $('#mathSearch').addEventListener('input', function (e) {
      state.mathQuery = e.target.value;
      renderMath();
    });

    // 数学：口算练习
    $('#quizGrades').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      quiz.grade = Number(chip.getAttribute('data-grade')) || 1;
      renderQuizGrades();
      startQuiz();
    });

    $('#quizCount').addEventListener('change', startQuiz);
    $('#quizRestart').addEventListener('click', startQuiz);
    $('#quizForm').addEventListener('submit', function (e) {
      e.preventDefault();
      submitQuizAnswer();
    });

    // 作文：年级 / 类别 / 搜索 / 朗读
    $('#essayGrades').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.essayGrade = Number(chip.getAttribute('data-grade')) || 1;
      Speech.stop();
      renderEssay();
      save();
    });

    $('#essayTypes').addEventListener('click', function (e) {
      var chip = e.target.closest('.type-chip');
      if (!chip) return;
      state.essayType = chip.getAttribute('data-type');
      Speech.stop();
      renderEssay();
    });

    $('#essaySearch').addEventListener('input', function (e) {
      state.essayQuery = e.target.value;
      renderEssay();
    });

    $('#essayContent').addEventListener('click', function (e) {
      var essayBtn = e.target.closest('[data-essay-play]');
      if (essayBtn) {
        if (essayBtn.textContent.indexOf('停止') > -1) {
          Speech.stop();
          $$('.essay-para.speaking').forEach(function (n) { n.classList.remove('speaking'); });
          essayBtn.textContent = '🔊 朗读全文';
        } else {
          playEssay(Number(essayBtn.getAttribute('data-essay-play')), essayBtn);
        }
        return;
      }

      var readEl = e.target.closest('[data-read]');
      if (!readEl) return;
      var text = readEl.getAttribute('data-read');
      if (!text) return;
      var host = readEl.closest('.word-tag') || readEl.closest('.quote-card');
      $$('.word-tag.speaking, .quote-card.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      if (host) host.classList.add('speaking');
      Speech.speak(text, {
        lang: 'zh-CN',
        onend: function () { if (host) host.classList.remove('speaking'); },
        onerror: function () { if (host) host.classList.remove('speaking'); }
      });
    });

    // 道德与法治：切册 / 搜索 / 朗读 / 判断
    $('#moralBooks').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.moralBook = chip.getAttribute('data-book');
      Speech.stop();
      renderMoral();
      save();
    });

    $('#moralSearch').addEventListener('input', function (e) {
      state.moralQuery = e.target.value;
      renderMoral();
    });

    $('#moralPoints').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-moral-read]');
      if (!btn) return;
      var items = $('#moralPoints')._items || [];
      var it = items[Number(btn.getAttribute('data-moral-read'))];
      if (!it) return;
      var p = it.p;
      var text = p.t + '。' + (p.lines || []).join('') + (p.act ? '。' + p.act : '');
      var card = btn.closest('.point-card');
      $$('.point-card.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      if (card) card.classList.add('speaking');
      Speech.speak(text, {
        lang: 'zh-CN',
        onend: function () { if (card) card.classList.remove('speaking'); },
        onerror: function () { if (card) card.classList.remove('speaking'); }
      });
    });

    $('#moralChecks').addEventListener('click', function (e) {
      var btn = e.target.closest('.check-btn');
      if (!btn) return;
      judgeCheck(btn.closest('.check-item'), btn.getAttribute('data-ans'));
    });

    // 科学：切册 / 搜索 / 朗读 / 选择
    $('#scienceBooks').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.scienceBook = chip.getAttribute('data-book');
      Speech.stop();
      renderScience();
      save();
    });

    $('#scienceSearch').addEventListener('input', function (e) {
      state.scienceQuery = e.target.value;
      renderScience();
    });

    $('#sciencePoints').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-sci-read]');
      if (!btn) return;
      var items = $('#sciencePoints')._items || [];
      var it = items[Number(btn.getAttribute('data-sci-read'))];
      if (!it) return;
      var p = it.p;
      var text = p.t + '。' + (p.lines || []).join('') + (p.exp ? '。' + p.exp : '');
      var card = btn.closest('.point-card');
      $$('.point-card.speaking').forEach(function (n) { n.classList.remove('speaking'); });
      if (card) card.classList.add('speaking');
      Speech.speak(text, {
        lang: 'zh-CN',
        onend: function () { if (card) card.classList.remove('speaking'); },
        onerror: function () { if (card) card.classList.remove('speaking'); }
      });
    });

    $('#scienceQuizzes').addEventListener('click', function (e) {
      var btn = e.target.closest('.q-opt');
      if (!btn) return;
      judgeScienceQuiz(btn.closest('.check-item'), Number(btn.getAttribute('data-opt')));
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    restore();
    bind();
    setRateLabel();
    Speech.setRate($('#rate').value);

    $('#quizEn').checked = state.quizEn;
    $('#quizCn').checked = state.quizCn;

    // 应用记忆的视图
    $$('.tab').forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-view') === state.view); });
    $$('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + state.view); });

    renderEnglish();
    renderChinese();
    renderMath();
    renderQuizGrades();
    startQuiz();
    renderEssay();
    renderMoral();
    renderScience();

    if (!Speech.supported()) {
      toast('当前浏览器不支持语音合成，建议使用 Chrome 或 Edge 打开');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
