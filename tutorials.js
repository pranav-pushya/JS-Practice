/**
 * JSLab — Tutorials Page Logic
 * Renders sidebar, lecture content, search, and mini quizzes.
 */
(function () {
  'use strict';

  var UNITS = [
    { id: 1, name: 'Unit 1: JS Fundamentals', lectures: [] },
    { id: 2, name: 'Unit 2: DOM & BOM', lectures: [] },
    { id: 3, name: 'Unit 3: Async & Git', lectures: [] }
  ];

  // Group lectures into units
  LECTURES.forEach(function (l) {
    var u = UNITS.find(function (u) { return u.id === l.unit; });
    if (u) u.lectures.push(l);
  });

  var sidebarEl = document.getElementById('tutorials-sidebar');
  var contentEl = document.getElementById('lecture-content');
  var searchInput = document.getElementById('search-input');
  var quizModal = document.getElementById('mini-quiz-modal');
  var quizTitle = document.getElementById('mini-quiz-title');
  var quizBody = document.getElementById('mini-quiz-body');
  var quizClose = document.getElementById('mini-quiz-close');
  var currentLectureId = null;

  // ── Build sidebar ──────────────────────────
  function buildSidebar(filter) {
    filter = (filter || '').toLowerCase();
    var html = '';
    UNITS.forEach(function (unit) {
      var filtered = unit.lectures.filter(function (l) {
        return !filter || l.title.toLowerCase().indexOf(filter) !== -1;
      });
      if (!filtered.length) return;
      html += '<div class="unit-group">';
      html += '<div class="unit-title">' + unit.name + '</div>';
      filtered.forEach(function (l) {
        var completed = typeof ProgressManager !== 'undefined' && ProgressManager.getProgress(l.id);
        var active = l.id === currentLectureId ? ' active' : '';
        var check = completed ? ' ✅' : '';
        html += '<button class="lecture-btn' + active + '" data-id="' + l.id + '">';
        html += '<span class="lecture-num">L' + l.id + '</span> ';
        html += l.title + check;
        html += '</button>';
      });
      html += '</div>';
    });
    sidebarEl.innerHTML = html;
  }

  // ── Render lecture content ──────────────────
  function renderLecture(id) {
    var lecture = LECTURES.find(function (l) { return l.id === id; });
    if (!lecture) return;
    currentLectureId = id;
    buildSidebar(searchInput.value);

    var diffColor = lecture.difficulty === 'Beginner' ? '#69f0ae' :
      lecture.difficulty === 'Intermediate' ? '#ffd740' : '#ff5252';

    var html = '<div class="glass-card lecture-detail">';
    // Header
    html += '<div class="lecture-header">';
    html += '<span class="badge" style="background:' + diffColor + '22;color:' + diffColor + '">' + lecture.difficulty + '</span>';
    html += '<span class="badge">' + lecture.clo + '</span>';
    html += '<span class="badge">⏱ ' + lecture.readTime + '</span>';
    html += '</div>';
    html += '<h2>Lecture ' + lecture.id + ': ' + lecture.title + '</h2>';

    // Theory
    html += '<div class="theory-section">' + lecture.theory + '</div>';

    // Code Examples
    html += '<h3>💻 Code Examples</h3>';
    lecture.examples.forEach(function (ex) {
      html += '<div class="code-example">';
      html += '<div class="code-title">' + ex.title + '</div>';
      html += '<div class="code-block-wrapper"><pre><code class="language-javascript">' + escapeHtml(ex.code) + '</code></pre>';
      html += '<button class="copy-btn" data-code="' + encodeURIComponent(ex.code) + '">📋 Copy</button>';
      html += '</div></div>';
    });

    // Quick Reference
    html += '<h3>📌 Quick Reference</h3>';
    html += '<div class="quick-ref-grid">';
    lecture.quickRef.forEach(function (qr) {
      html += '<div class="quick-ref-item"><code>' + escapeHtml(qr.syntax) + '</code><span>' + qr.desc + '</span></div>';
    });
    html += '</div>';

    // Nav buttons
    html += '<div class="lecture-nav">';
    if (id > 1) {
      html += '<button class="btn btn-secondary" data-nav="' + (id - 1) + '">← Prev Lecture</button>';
    } else {
      html += '<span></span>';
    }
    html += '<button class="btn btn-primary" id="take-quiz-btn">🧠 Take Mini Quiz</button>';
    if (id < LECTURES.length) {
      html += '<button class="btn btn-secondary" data-nav="' + (id + 1) + '">Next Lecture →</button>';
    } else {
      html += '<span></span>';
    }
    html += '</div>';

    // Mark complete button
    var completed = typeof ProgressManager !== 'undefined' && ProgressManager.getProgress(id);
    html += '<div style="text-align:center;margin-top:16px;">';
    html += '<button class="btn ' + (completed ? 'btn-secondary' : 'btn-primary') + '" id="mark-complete-btn">';
    html += completed ? '✅ Completed' : '☐ Mark as Complete';
    html += '</button></div>';

    html += '</div>';
    contentEl.innerHTML = html;

    // Highlight code blocks
    contentEl.querySelectorAll('pre code').forEach(function (block) {
      if (typeof hljs !== 'undefined') hljs.highlightElement(block);
    });

    // Scroll to top of content
    contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Log activity
    if (typeof ProgressManager !== 'undefined') {
      ProgressManager.logActivity('Opened Lecture ' + id + ': ' + lecture.title);
    }
  }

  // ── Mini Quiz ──────────────────────────────
  function openQuiz(lectureId) {
    var lecture = LECTURES.find(function (l) { return l.id === lectureId; });
    if (!lecture || !lecture.miniQuiz) return;

    quizTitle.textContent = 'Mini Quiz — L' + lecture.id + ': ' + lecture.title;
    var html = '';
    var total = lecture.miniQuiz.length;

    lecture.miniQuiz.forEach(function (q, qi) {
      html += '<div class="quiz-question" id="qq-' + qi + '">';
      html += '<p class="quiz-q"><strong>Q' + (qi + 1) + '.</strong> ' + q.q + '</p>';
      q.options.forEach(function (opt, oi) {
        html += '<button class="quiz-option" data-qi="' + qi + '" data-oi="' + oi + '">';
        html += String.fromCharCode(65 + oi) + '. ' + opt;
        html += '</button>';
      });
      html += '<div class="quiz-explanation" id="qe-' + qi + '" style="display:none;"></div>';
      html += '</div>';
    });

    html += '<div id="quiz-result" style="display:none;" class="quiz-result"></div>';
    quizBody.innerHTML = html;
    quizModal.classList.add('active');

    var answered = 0;
    var score = 0;

    quizBody.addEventListener('click', function handler(e) {
      var btn = e.target.closest('.quiz-option');
      if (!btn || btn.disabled) return;
      var qi = parseInt(btn.getAttribute('data-qi'));
      var oi = parseInt(btn.getAttribute('data-oi'));
      var q = lecture.miniQuiz[qi];
      var isCorrect = oi === q.correct;

      // Disable all options in this question
      var opts = document.querySelectorAll('[data-qi="' + qi + '"]');
      opts.forEach(function (o) {
        o.disabled = true;
        o.style.opacity = '0.6';
        o.style.cursor = 'not-allowed';
        if (parseInt(o.getAttribute('data-oi')) === q.correct) {
          o.style.borderColor = '#69f0ae';
          o.style.background = 'rgba(105,240,174,0.1)';
        }
      });
      if (!isCorrect) {
        btn.style.borderColor = '#ff5252';
        btn.style.background = 'rgba(255,82,82,0.1)';
      }

      // Show explanation
      var expEl = document.getElementById('qe-' + qi);
      expEl.innerHTML = (isCorrect ? '✅ Correct! ' : '❌ Incorrect. ') + q.explanation;
      expEl.style.display = 'block';
      expEl.style.color = isCorrect ? '#69f0ae' : '#ff5252';

      if (isCorrect) score++;
      answered++;

      // All answered
      if (answered === total) {
        var resultEl = document.getElementById('quiz-result');
        resultEl.style.display = 'block';
        resultEl.innerHTML = '<h3>Score: ' + score + '/' + total + '</h3>';
        if (score === total) resultEl.innerHTML += '<p style="color:#69f0ae;">🎉 Perfect score!</p>';
        else if (score >= total / 2) resultEl.innerHTML += '<p style="color:#ffd740;">👍 Good job! Review mistakes above.</p>';
        else resultEl.innerHTML += '<p style="color:#ff5252;">📚 Keep studying! Review the lecture.</p>';

        if (typeof ProgressManager !== 'undefined') {
          ProgressManager.saveQuizScore(lectureId, score, total);
        }
      }
    });
  }

  // ── Helpers ─────────────────────────────────
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    var toast = document.getElementById('copy-toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 2000);
    }
  }

  // ── Event Delegation ────────────────────────
  sidebarEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.lecture-btn');
    if (btn) renderLecture(parseInt(btn.getAttribute('data-id')));
  });

  contentEl.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) { renderLecture(parseInt(nav.getAttribute('data-nav'))); return; }

    var copy = e.target.closest('.copy-btn');
    if (copy) { copyToClipboard(decodeURIComponent(copy.getAttribute('data-code'))); return; }

    if (e.target.id === 'take-quiz-btn') { openQuiz(currentLectureId); return; }

    if (e.target.id === 'mark-complete-btn') {
      if (typeof ProgressManager !== 'undefined') {
        var done = ProgressManager.getProgress(currentLectureId);
        ProgressManager.setProgress(currentLectureId, !done);
        renderLecture(currentLectureId);
      }
    }
  });

  // Quiz modal close
  quizClose.addEventListener('click', function () { quizModal.classList.remove('active'); });
  quizModal.addEventListener('click', function (e) {
    if (e.target === quizModal) quizModal.classList.remove('active');
  });

  // Search
  searchInput.addEventListener('input', function () { buildSidebar(searchInput.value); });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      quizModal.classList.remove('active');
      searchInput.blur();
    }
  });

  // ── Init ────────────────────────────────────
  buildSidebar();

  // Check URL hash for direct lecture link
  var hash = window.location.hash;
  if (hash && hash.indexOf('#lecture-') === 0) {
    var lid = parseInt(hash.replace('#lecture-', ''));
    if (lid) renderLecture(lid);
  }
})();
