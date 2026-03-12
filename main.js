/**
 * JSLab — Main Application Logic
 * Home page: countdowns, progress, streak, recent activity.
 * Author: Pranav Pushya
 * Course: Frontend Engineering-1 (25CSE0105)
 */

/* ========== EXAM DATE CONFIG ========== */
const EXAM_DATES = {
  st1: "2025-10-15",
  st2: "2025-11-20",
  endTerm: "2025-12-20"
};

/* ========== SIDEBAR ========== */
function initSidebar() {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const main = document.querySelector(".main-content");

  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    sidebar.classList.toggle("collapsed");
  });

  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
      if (!sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove("open");
        sidebar.classList.add("collapsed");
      }
    }
  });
}

/** Highlight the active nav link */
function setActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll(".sidebar-nav a");
  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (path.endsWith(href) || (href === "../index.html" && (path.endsWith("index.html") || path.endsWith("/")))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ========== TOP PROGRESS BAR ========== */
function updateTopProgressBar() {
  const fill = document.querySelector(".top-progress-bar .fill");
  if (fill) {
    fill.style.width = getOverallPercentage() + "%";
  }
}

/* ========== COUNTDOWN TIMERS ========== */
function initCountdowns() {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

function updateCountdowns() {
  renderCountdown("st1", EXAM_DATES.st1);
  renderCountdown("st2", EXAM_DATES.st2);
  renderCountdown("endTerm", EXAM_DATES.endTerm);
}

function renderCountdown(id, dateStr) {
  const container = document.getElementById("countdown-" + id);
  if (!container) return;

  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    container.innerHTML = '<span style="color:var(--error);font-weight:700;font-size:1.2rem;">Exam Completed</span>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  container.innerHTML =
    '<div class="timer-unit"><div class="value">' + days + '</div><div class="label">Days</div></div>' +
    '<div class="timer-unit"><div class="value">' + hours + '</div><div class="label">Hours</div></div>' +
    '<div class="timer-unit"><div class="value">' + mins + '</div><div class="label">Mins</div></div>' +
    '<div class="timer-unit"><div class="value">' + secs + '</div><div class="label">Secs</div></div>';
}

/* ========== PROGRESS RING ========== */
function updateProgressRing() {
  const pct = getOverallPercentage();
  const completed = getCompletedCount();
  const ring = document.getElementById("progress-ring-fill");
  const pctText = document.getElementById("progress-pct");
  const countText = document.getElementById("progress-count");

  if (ring) {
    const circumference = 2 * Math.PI * 65;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
  }
  if (pctText) pctText.textContent = pct + "%";
  if (countText) countText.textContent = completed + " of " + TOTAL_LECTURES + " lectures completed";
}

function updateUnitBars() {
  var units = ["unit1", "unit2", "unit3"];
  for (var i = 0; i < units.length; i++) {
    var key = units[i];
    var prog = getUnitProgress(key);
    var fill = document.getElementById(key + "-fill");
    var label = document.getElementById(key + "-label");
    if (fill) fill.style.width = (prog.done / prog.total * 100) + "%";
    if (label) label.textContent = prog.done + "/" + prog.total;
  }
}

/* ========== STREAK ========== */
function updateStreakDisplay() {
  var streak = updateStreak();
  var el = document.getElementById("streak-count");
  if (el) el.textContent = streak.count + " Day Streak";
}

/* ========== RECENT ACTIVITY ========== */
function renderRecentActivity() {
  var container = document.getElementById("recent-activity");
  if (!container) return;

  var activities = getRecentActivity(4);
  if (activities.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);font-size:14px;padding:12px;">No activity yet. Start learning to see your progress here!</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < activities.length; i++) {
    var a = activities[i];
    var icon = a.type === "completed" ? "✅" : a.type === "quiz" ? "📝" : "📌";
    html += '<div class="activity-item fade-in">' +
      '<span class="activity-icon">' + icon + '</span>' +
      '<span class="activity-text">' + escapeHtml(a.text) + '</span>' +
      '<span class="activity-time">' + timeAgo(a.time) + '</span>' +
      '</div>';
  }
  container.innerHTML = html;
}

/* ========== BACK TO TOP ========== */
function initBackToTop() {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========== KEYBOARD SHORTCUTS ========== */
function initKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var modals = document.querySelectorAll(".modal-overlay.active");
      modals.forEach(function (m) { m.classList.remove("active"); });
    }
    if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
      var search = document.getElementById("search-input");
      if (search && document.activeElement !== search) {
        e.preventDefault();
        search.focus();
      }
    }
  });
}

/* ========== HTML SANITIZATION ========== */
/**
 * Sanitize a string for safe use in innerHTML.
 * Prevents XSS by escaping HTML special characters.
 * @param {string} str — untrusted string
 * @returns {string} — safe HTML string
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ========== COPY TO CLIPBOARD ========== */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function () {
    showCopyToast();
  });
}

function showCopyToast() {
  var toast = document.getElementById("copy-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "copy-toast";
    toast.className = "copy-toast";
    toast.textContent = "Copied!";
    document.body.appendChild(toast);
  }
  toast.classList.add("show");
  setTimeout(function () { toast.classList.remove("show"); }, 1500);
}

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
  setActiveNav();
  updateTopProgressBar();
  initCountdowns();
  updateProgressRing();
  updateUnitBars();
  updateStreakDisplay();
  renderRecentActivity();
  initBackToTop();
  initKeyboardShortcuts();
});
