/**
 * JSLab — Progress Module
 * Handles all localStorage operations for progress tracking,
 * quiz scores, study streak, saved snippets, and settings.
 * Author: Pranav Pushya
 * Course: Frontend Engineering-1 (25CSE0105)
 */

const STORAGE_KEYS = {
  progress: "jslab_progress",
  quizScores: "jslab_scores",
  streak: "jslab_streak",
  snippets: "jslab_snippets",
  settings: "jslab_settings",
  activity: "jslab_activity"
};

const TOTAL_LECTURES = 45;
const UNIT_RANGES = {
  unit1: { start: 1, end: 18, label: "Unit 1: JS Foundations" },
  unit2: { start: 19, end: 34, label: "Unit 2: DOM & Browser" },
  unit3: { start: 35, end: 45, label: "Unit 3: Async & Git" }
};

/**
 * Safely read from localStorage
 * @param {string} key - Storage key
 * @param {*} fallback - Default value if key not found
 * @returns {*} Parsed value or fallback
 */
function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

/**
 * Safely write to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // quota exceeded or other error — silently fail
  }
}

/* ===================== PROGRESS ===================== */

/**
 * Get the full progress object
 * @returns {Object} e.g. { lec1: true, lec2: false, ... }
 */
function getProgress() {
  const p = storageGet(STORAGE_KEYS.progress, {});
  for (let i = 1; i <= TOTAL_LECTURES; i++) {
    if (p["lec" + i] === undefined) p["lec" + i] = false;
  }
  return p;
}

/**
 * Mark a lecture as done or not done
 * @param {number} lecNum - Lecture number (1-45)
 * @param {boolean} done - true/false
 */
function setLectureDone(lecNum, done) {
  const p = getProgress();
  p["lec" + lecNum] = done;
  storageSet(STORAGE_KEYS.progress, p);
  if (done) {
    addActivity("completed", "Completed Lecture " + lecNum);
  }
}

/**
 * Check if a lecture is done
 * @param {number} lecNum
 * @returns {boolean}
 */
function isLectureDone(lecNum) {
  const p = getProgress();
  return !!p["lec" + lecNum];
}

/**
 * Count completed lectures overall
 * @returns {number}
 */
function getCompletedCount() {
  const p = getProgress();
  let count = 0;
  for (let i = 1; i <= TOTAL_LECTURES; i++) {
    if (p["lec" + i]) count++;
  }
  return count;
}

/**
 * Count completed lectures in a unit
 * @param {string} unitKey - "unit1", "unit2", "unit3"
 * @returns {{ done: number, total: number }}
 */
function getUnitProgress(unitKey) {
  const range = UNIT_RANGES[unitKey];
  const p = getProgress();
  let done = 0;
  const total = range.end - range.start + 1;
  for (let i = range.start; i <= range.end; i++) {
    if (p["lec" + i]) done++;
  }
  return { done, total };
}

/**
 * Get overall completion percentage
 * @returns {number} 0-100
 */
function getOverallPercentage() {
  return Math.round((getCompletedCount() / TOTAL_LECTURES) * 100);
}

/* ===================== STREAK ===================== */

/**
 * Update and return the current study streak
 * @returns {{ count: number, lastVisit: string }}
 */
function updateStreak() {
  const streak = storageGet(STORAGE_KEYS.streak, { count: 0, lastVisit: null });
  const today = new Date().toISOString().slice(0, 10);

  if (streak.lastVisit === today) {
    return streak;
  }

  if (streak.lastVisit) {
    const lastDate = new Date(streak.lastVisit);
    const todayDate = new Date(today);
    const diffMs = todayDate - lastDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak.count += 1;
    } else if (diffDays > 1) {
      streak.count = 1;
    }
  } else {
    streak.count = 1;
  }

  streak.lastVisit = today;
  storageSet(STORAGE_KEYS.streak, streak);
  return streak;
}

/**
 * Get current streak without updating
 * @returns {{ count: number, lastVisit: string }}
 */
function getStreak() {
  return storageGet(STORAGE_KEYS.streak, { count: 0, lastVisit: null });
}

/* ===================== QUIZ SCORES ===================== */

/**
 * Save a quiz score
 * @param {{ mode: string, score: number, total: number, percentage: number, timeTaken: string, date: string }} scoreObj
 */
function saveQuizScore(scoreObj) {
  const scores = storageGet(STORAGE_KEYS.quizScores, []);
  scoreObj.date = scoreObj.date || new Date().toISOString();
  scores.unshift(scoreObj);
  if (scores.length > 50) scores.length = 50;
  storageSet(STORAGE_KEYS.quizScores, scores);
  addActivity("quiz", "Scored " + scoreObj.percentage + "% on " + scoreObj.mode);
}

/**
 * Get last N quiz scores
 * @param {number} n
 * @returns {Array}
 */
function getQuizScores(n) {
  const scores = storageGet(STORAGE_KEYS.quizScores, []);
  return n ? scores.slice(0, n) : scores;
}

/* ===================== SNIPPETS ===================== */

/**
 * Save a code snippet
 * @param {string} name - Snippet name
 * @param {string} code - Code content
 */
function saveSnippet(name, code) {
  if (name === '__proto__' || name === 'constructor' || name === 'prototype') return;
  const snippets = storageGet(STORAGE_KEYS.snippets, {});
  snippets[name] = { code, savedAt: new Date().toISOString() };
  storageSet(STORAGE_KEYS.snippets, snippets);
}

/**
 * Get all saved snippets
 * @returns {Object}
 */
function getSnippets() {
  return storageGet(STORAGE_KEYS.snippets, {});
}

/**
 * Delete a snippet
 * @param {string} name
 */
function deleteSnippet(name) {
  const snippets = storageGet(STORAGE_KEYS.snippets, {});
  delete snippets[name];
  storageSet(STORAGE_KEYS.snippets, snippets);
}

/**
 * Rename a snippet
 * @param {string} oldName
 * @param {string} newName
 */
function renameSnippet(oldName, newName) {
  const snippets = storageGet(STORAGE_KEYS.snippets, {});
  if (snippets[oldName]) {
    snippets[newName] = snippets[oldName];
    delete snippets[oldName];
    storageSet(STORAGE_KEYS.snippets, snippets);
  }
}

/* ===================== ACTIVITY ===================== */

/**
 * Add recent activity entry
 * @param {string} type - "completed", "quiz", etc.
 * @param {string} text - Description
 */
function addActivity(type, text) {
  const activities = storageGet(STORAGE_KEYS.activity, []);
  activities.unshift({
    type,
    text,
    time: new Date().toISOString()
  });
  if (activities.length > 20) activities.length = 20;
  storageSet(STORAGE_KEYS.activity, activities);
}

/**
 * Get recent activities
 * @param {number} n - Number of items
 * @returns {Array}
 */
function getRecentActivity(n) {
  const activities = storageGet(STORAGE_KEYS.activity, []);
  return activities.slice(0, n || 5);
}

/* ===================== SETTINGS ===================== */

/**
 * Get settings
 * @returns {Object}
 */
function getSettings() {
  return storageGet(STORAGE_KEYS.settings, { fontSize: 15 });
}

/**
 * Update a setting
 * @param {string} key
 * @param {*} value
 */
function updateSetting(key, value) {
  const settings = getSettings();
  settings[key] = value;
  storageSet(STORAGE_KEYS.settings, settings);
}

/* ===================== UTILITY ===================== */

/**
 * Format a date string to readable format
 * @param {string} isoStr
 * @returns {string}
 */
function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/**
 * Time ago helper
 * @param {string} isoStr
 * @returns {string}
 */
function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  return days + "d ago";
}
