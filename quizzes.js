/**
 * JSLab — Quiz Engine
 * Pulls questions from LECTURES data, supports ST1/ST2/EndTerm/Unit modes.
 */
(function () {
  'use strict';

  var MODES = {
    st1:     { label: 'ST1 Practice', maxLecture: 18, count: 20, time: 20 },
    st2:     { label: 'ST2 Practice', maxLecture: 40, count: 30, time: 30 },
    endterm: { label: 'End Term',     maxLecture: 45, count: 40, time: 45 },
    unit:    { label: 'Unit Practice', count: 15, time: 0 }
  };

  var state = { mode: null, questions: [], current: 0, answers: [], timer: null, timeLeft: 0 };

  var homeEl = document.getElementById('quiz-home');
  var activeEl = document.getElementById('quiz-active');
  var resultsEl = document.getElementById('quiz-results');
  var questionArea = document.getElementById('quiz-question-area');
  var progressEl = document.getElementById('quiz-progress');
  var timerEl = document.getElementById('quiz-timer');
  var modeLabel = document.getElementById('quiz-mode-label');
  var unitSelector = document.getElementById('unit-selector');

  // ── Build Question Pool from Lectures ───────
  function getQuestionPool(maxLecture, unitFilter) {
    var pool = [];
    LECTURES.forEach(function (lec) {
      if (maxLecture && lec.id > maxLecture) return;
      if (unitFilter && lec.unit !== unitFilter) return;
      if (!lec.miniQuiz) return;
      lec.miniQuiz.forEach(function (q) {
        pool.push({ lecture: lec.id, lectureTitle: lec.title, q: q.q, options: q.options, correct: q.correct, explanation: q.explanation });
      });
    });
    return pool;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // ── Start Quiz ──────────────────────────────
  function startQuiz(mode, unitFilter) {
    var cfg = MODES[mode];
    var maxLec = mode === 'unit' ? null : cfg.maxLecture;
    var pool = getQuestionPool(maxLec, unitFilter);
    shuffle(pool);
    var questions = pool.slice(0, cfg.count);

    if (questions.length === 0) {
      alert('No questions available for this selection.');
      return;
    }

    state.mode = mode;
    state.questions = questions;
    state.current = 0;
    state.answers = new Array(questions.length).fill(-1);
    state.timeLeft = cfg.time * 60;

    modeLabel.textContent = cfg.label + (unitFilter ? ' (Unit ' + unitFilter + ')' : '');
    homeEl.style.display = 'none';
    resultsEl.style.display = 'none';
    activeEl.style.display = 'block';

    if (cfg.time > 0) {
      timerEl.style.display = '';
      startTimer();
    } else {
      timerEl.style.display = 'none';
    }

    renderQuestion();
  }

  // ── Timer ───────────────────────────────────
  function startTimer() {
    if (state.timer) clearInterval(state.timer);
    updateTimerDisplay();
    state.timer = setInterval(function () {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        submitQuiz();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    var m = Math.floor(state.timeLeft / 60);
    var s = state.timeLeft % 60;
    timerEl.textContent = m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
    timerEl.className = 'quiz-timer' + (state.timeLeft <= 60 ? ' warning' : '');
  }

  // ── Render Question ─────────────────────────
  function renderQuestion() {
    var q = state.questions[state.current];
    var total = state.questions.length;
    progressEl.textContent = 'Q ' + (state.current + 1) + ' / ' + total;

    var html = '<div class="glass-card quiz-question">';
    html += '<div class="q-number">Question ' + (state.current + 1) + ' of ' + total;
    html += ' <span style="float:right;font-size:11px;color:var(--text-secondary);">L' + q.lecture + ': ' + q.lectureTitle + '</span></div>';
    html += '<div class="q-text">' + q.q + '</div>';

    q.options.forEach(function (opt, oi) {
      var selected = state.answers[state.current] === oi ? ' selected' : '';
      html += '<button class="quiz-option' + selected + '" data-oi="' + oi + '">';
      html += '<span class="option-letter">' + String.fromCharCode(65 + oi) + '</span>';
      html += opt;
      html += '</button>';
    });
    html += '</div>';
    questionArea.innerHTML = html;

    // Nav buttons
    document.getElementById('prev-q').disabled = state.current === 0;
    var isLast = state.current === total - 1;
    document.getElementById('next-q').style.display = isLast ? 'none' : '';
    document.getElementById('submit-quiz').style.display = isLast ? '' : 'none';
  }

  // ── Submit Quiz ─────────────────────────────
  function submitQuiz() {
    if (state.timer) clearInterval(state.timer);
    var score = 0;
    state.questions.forEach(function (q, i) {
      if (state.answers[i] === q.correct) score++;
    });

    var total = state.questions.length;
    var pct = Math.round((score / total) * 100);
    var passed = pct >= 50;

    // Save score
    if (typeof ProgressManager !== 'undefined') {
      ProgressManager.saveQuizScore(state.mode, score, total);
      ProgressManager.logActivity('Quiz ' + MODES[state.mode].label + ': ' + score + '/' + total);
    }

    // Show results
    activeEl.style.display = 'none';
    var html = '<div class="glass-card scorecard">';
    html += '<h2>Quiz Results</h2>';
    html += '<div class="score-big ' + (passed ? 'pass' : 'fail') + '">' + pct + '%</div>';
    html += '<div class="score-details">';
    html += '<div class="score-detail"><div class="val">' + score + '</div><div class="lbl">Correct</div></div>';
    html += '<div class="score-detail"><div class="val">' + (total - score) + '</div><div class="lbl">Wrong</div></div>';
    html += '<div class="score-detail"><div class="val">' + total + '</div><div class="lbl">Total</div></div>';
    html += '</div>';
    html += '<p style="margin:16px 0;color:var(--text-secondary);">' + (passed ? '🎉 Great job! Keep it up!' : '📚 Keep studying! Review the lectures and try again.') + '</p>';
    html += '</div>';

    // Review section
    html += '<div style="margin-top:24px;"><h3 style="margin-bottom:16px;">📖 Review Answers</h3>';
    state.questions.forEach(function (q, i) {
      var yours = state.answers[i];
      var correct = q.correct;
      var isCorrect = yours === correct;
      html += '<div class="glass-card" style="margin-bottom:12px;">';
      html += '<div class="q-number" style="display:flex;justify-content:space-between;">';
      html += '<span>Q' + (i + 1) + '</span>';
      html += '<span style="color:' + (isCorrect ? 'var(--success)' : 'var(--error)') + ';">' + (isCorrect ? '✅ Correct' : '❌ Wrong') + '</span>';
      html += '</div>';
      html += '<div class="q-text">' + q.q + '</div>';
      q.options.forEach(function (opt, oi) {
        var cls = '';
        if (oi === correct) cls = ' correct';
        else if (oi === yours && yours !== correct) cls = ' wrong';
        html += '<div class="quiz-option' + cls + '" style="cursor:default;pointer-events:none;">';
        html += '<span class="option-letter">' + String.fromCharCode(65 + oi) + '</span>';
        html += opt;
        html += '</div>';
      });
      if (!isCorrect) {
        html += '<div class="quiz-explanation">' + q.explanation + '</div>';
      }
      html += '</div>';
    });
    html += '</div>';

    html += '<div style="text-align:center;margin-top:24px;"><button class="btn btn-primary btn-lg" id="back-home-btn">← Back to Quizzes</button></div>';

    resultsEl.innerHTML = html;
    resultsEl.style.display = 'block';
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    loadScoreHistory();
  }

  // ── Score History ───────────────────────────
  function loadScoreHistory() {
    var el = document.getElementById('score-history');
    if (!el) return;
    var scores = [];
    try {
      scores = JSON.parse(localStorage.getItem('jslab_quiz_scores') || '[]');
    } catch(e) {}

    if (!scores.length) {
      el.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:16px;">No quiz attempts yet.</p>';
      return;
    }
    var html = '<table class="score-history-table"><thead><tr><th>Quiz</th><th>Score</th><th>Date</th></tr></thead><tbody>';
    scores.slice(-10).reverse().forEach(function (s) {
      var pct = Math.round((s.score / s.total) * 100);
      html += '<tr><td>' + escapeHtml(String(s.label || s.id || 'Quiz')) + '</td><td>' + escapeHtml(s.score + '/' + s.total + ' (' + pct + '%)') + '</td><td>' + new Date(s.date).toLocaleDateString() + '</td></tr>';
    });
    html += '</tbody></table>';
    el.innerHTML = html;
  }

  // ── Event Handlers ──────────────────────────
  // Mode selection
  document.querySelectorAll('.quiz-mode-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var mode = this.getAttribute('data-mode');
      if (mode === 'unit') {
        unitSelector.style.display = unitSelector.style.display === 'none' ? 'block' : 'none';
      } else {
        unitSelector.style.display = 'none';
        startQuiz(mode);
      }
    });
  });

  // Unit selection
  document.querySelectorAll('[data-unit-start]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      startQuiz('unit', parseInt(this.getAttribute('data-unit-start')));
    });
  });

  // Answer selection
  questionArea.addEventListener('click', function (e) {
    var opt = e.target.closest('.quiz-option');
    if (opt) {
      state.answers[state.current] = parseInt(opt.getAttribute('data-oi'));
      renderQuestion();
    }
  });

  // Navigation
  document.getElementById('prev-q').addEventListener('click', function () {
    if (state.current > 0) { state.current--; renderQuestion(); }
  });
  document.getElementById('next-q').addEventListener('click', function () {
    if (state.current < state.questions.length - 1) { state.current++; renderQuestion(); }
  });
  document.getElementById('submit-quiz').addEventListener('click', function () {
    var unanswered = state.answers.filter(function (a) { return a === -1; }).length;
    if (unanswered > 0) {
      if (!confirm(unanswered + ' question(s) unanswered. Submit anyway?')) return;
    }
    submitQuiz();
  });
  document.getElementById('quit-quiz').addEventListener('click', function () {
    if (confirm('Are you sure you want to quit this quiz?')) {
      if (state.timer) clearInterval(state.timer);
      activeEl.style.display = 'none';
      homeEl.style.display = 'block';
    }
  });

  // Back to home from results
  resultsEl.addEventListener('click', function (e) {
    if (e.target.id === 'back-home-btn') {
      resultsEl.style.display = 'none';
      homeEl.style.display = 'block';
    }
  });

  // ── Init ────────────────────────────────────
  loadScoreHistory();
})();
