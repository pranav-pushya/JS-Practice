/**
 * JSLab — Git Terminal Simulator
 * Simulates basic Git commands with in-memory state.
 */
(function () {
  'use strict';

  var body = document.getElementById('terminal-body');
  var input = document.getElementById('terminal-input');
  var promptEl = document.getElementById('terminal-prompt');

  // ── Git Simulator State ─────────────────────
  var gitState = {
    initialized: false,
    branch: 'main',
    branches: ['main'],
    staged: [],
    working: [],
    commits: [],
    remotes: {},
    stash: []
  };

  function updatePrompt() {
    var branchStr = gitState.initialized ? ' (' + gitState.branch + ')' : '';
    promptEl.textContent = '~/jslab-project' + branchStr + ' $';
  }

  function addLine(text, cls) {
    var div = document.createElement('div');
    div.className = 'terminal-line ' + (cls || '');
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function addLines(arr, cls) {
    arr.forEach(function (line) { addLine(line, cls); });
  }

  // ── Command Handlers ────────────────────────
  var commands = {
    help: function () {
      addLines([
        'Available commands:',
        '  git init              — Initialize a repository',
        '  git status            — Show working tree status',
        '  git add <file>        — Stage a file (or . for all)',
        '  git commit -m "msg"   — Commit staged changes',
        '  git log               — Show commit history',
        '  git log --oneline     — Compact commit log',
        '  git branch            — List branches',
        '  git branch <name>     — Create a new branch',
        '  git checkout <branch> — Switch branches',
        '  git checkout -b <name>— Create + switch branch',
        '  git merge <branch>    — Merge a branch',
        '  git branch -d <name>  — Delete a branch',
        '  git remote add <n> <u>— Add a remote',
        '  git remote -v         — List remotes',
        '  git push origin <b>   — Push to remote',
        '  git pull origin <b>   — Pull from remote',
        '  git stash             — Stash changes',
        '  git stash pop         — Restore stash',
        '  git diff              — Show unstaged changes',
        '  touch <file>          — Create a file',
        '  ls                    — List files',
        '  clear                 — Clear terminal',
        '  reset                 — Reset simulator state',
        '  help                  — Show this list'
      ], 'output');
    },

    'git init': function () {
      if (gitState.initialized) {
        addLine('Reinitialized existing Git repository in ~/jslab-project/.git/', 'output');
      } else {
        gitState.initialized = true;
        addLine('Initialized empty Git repository in ~/jslab-project/.git/', 'success');
      }
      updatePrompt();
    },

    'git status': function () {
      if (!requireInit()) return;
      addLine('On branch ' + gitState.branch, 'branch');
      if (!gitState.commits.length) addLine('No commits yet', 'output');
      if (gitState.staged.length) {
        addLine('Changes to be committed:', 'success');
        gitState.staged.forEach(function (f) { addLine('  new file:   ' + f, 'success'); });
      }
      if (gitState.working.length) {
        addLine('Untracked files:', 'error-line');
        gitState.working.forEach(function (f) { addLine('  ' + f, 'error-line'); });
      }
      if (!gitState.staged.length && !gitState.working.length) {
        addLine('nothing to commit, working tree clean', 'output');
      }
    },

    'git add': function (args) {
      if (!requireInit()) return;
      if (!args.length) { addLine('Nothing specified, nothing added.', 'error-line'); return; }
      if (args[0] === '.') {
        if (!gitState.working.length) { addLine('No untracked files to add.', 'output'); return; }
        gitState.staged = gitState.staged.concat(gitState.working);
        gitState.working = [];
        addLine('All files staged.', 'success');
      } else {
        var file = args[0];
        var idx = gitState.working.indexOf(file);
        if (idx === -1) { addLine("pathspec '" + file + "' did not match any files", 'error-line'); return; }
        gitState.working.splice(idx, 1);
        gitState.staged.push(file);
        addLine("Added '" + file + "' to staging area.", 'success');
      }
    },

    'git commit': function (args) {
      if (!requireInit()) return;
      if (!gitState.staged.length) { addLine('nothing to commit (create/copy files and use "git add")', 'error-line'); return; }
      var msg = '';
      var mIdx = args.indexOf('-m');
      if (mIdx !== -1) msg = args.slice(mIdx + 1).join(' ').replace(/^["']|["']$/g, '');
      if (!msg) { addLine('Aborting commit due to empty commit message.', 'error-line'); return; }

      var hash = Math.random().toString(36).substring(2, 9);
      gitState.commits.push({ hash: hash, message: msg, branch: gitState.branch, files: gitState.staged.slice(), date: new Date().toISOString() });
      addLine('[' + gitState.branch + ' ' + hash + '] ' + msg, 'success');
      addLine(' ' + gitState.staged.length + ' file(s) changed', 'output');
      gitState.staged = [];
    },

    'git log': function (args) {
      if (!requireInit()) return;
      var branchCommits = gitState.commits.filter(function (c) { return c.branch === gitState.branch; });
      if (!branchCommits.length) { addLine('No commits on branch ' + gitState.branch, 'output'); return; }
      var oneline = args.indexOf('--oneline') !== -1;
      branchCommits.slice().reverse().forEach(function (c) {
        if (oneline) {
          addLine(c.hash + ' ' + c.message, 'output');
        } else {
          addLine('commit ' + c.hash, 'branch');
          addLine('Date:   ' + new Date(c.date).toLocaleString(), 'output');
          addLine('    ' + c.message, '');
          addLine('', '');
        }
      });
    },

    'git branch': function (args) {
      if (!requireInit()) return;
      if (args.length === 0) {
        gitState.branches.forEach(function (b) {
          addLine((b === gitState.branch ? '* ' : '  ') + b, b === gitState.branch ? 'success' : 'output');
        });
      } else if (args[0] === '-d') {
        var name = args[1];
        if (!name) { addLine('branch name required', 'error-line'); return; }
        if (name === gitState.branch) { addLine("Cannot delete the branch '" + name + "' which you are currently on.", 'error-line'); return; }
        var idx = gitState.branches.indexOf(name);
        if (idx === -1) { addLine("branch '" + name + "' not found.", 'error-line'); return; }
        gitState.branches.splice(idx, 1);
        addLine("Deleted branch " + name + ".", 'success');
      } else {
        var name = args[0];
        if (gitState.branches.indexOf(name) !== -1) { addLine("A branch named '" + name + "' already exists.", 'error-line'); return; }
        gitState.branches.push(name);
        addLine("Created branch '" + name + "'.", 'success');
      }
    },

    'git checkout': function (args) {
      if (!requireInit()) return;
      if (args[0] === '-b') {
        var name = args[1];
        if (!name) { addLine('branch name required', 'error-line'); return; }
        if (gitState.branches.indexOf(name) !== -1) { addLine("branch '" + name + "' already exists.", 'error-line'); return; }
        gitState.branches.push(name);
        gitState.branch = name;
        addLine("Switched to a new branch '" + name + "'", 'success');
      } else {
        var target = args[0];
        if (!target) { addLine('branch name required', 'error-line'); return; }
        if (gitState.branches.indexOf(target) === -1) { addLine("pathspec '" + target + "' did not match any branch.", 'error-line'); return; }
        gitState.branch = target;
        addLine("Switched to branch '" + target + "'", 'success');
      }
      updatePrompt();
    },

    'git merge': function (args) {
      if (!requireInit()) return;
      var target = args[0];
      if (!target) { addLine('branch name required', 'error-line'); return; }
      if (gitState.branches.indexOf(target) === -1) { addLine("merge: " + target + " - not something we can merge", 'error-line'); return; }
      if (target === gitState.branch) { addLine('Already on ' + target, 'output'); return; }
      addLine("Merge made by the 'recursive' strategy.", 'success');
      addLine("  Branch '" + target + "' merged into '" + gitState.branch + "'.", 'output');
    },

    'git remote': function (args) {
      if (args[0] === 'add' && args[1] && args[2]) {
        gitState.remotes[args[1]] = args[2];
        addLine("Remote '" + args[1] + "' added.", 'success');
      } else if (args[0] === '-v') {
        var keys = Object.keys(gitState.remotes);
        if (!keys.length) { addLine('No remotes configured.', 'output'); return; }
        keys.forEach(function (k) {
          addLine(k + '\t' + gitState.remotes[k] + ' (fetch)', 'output');
          addLine(k + '\t' + gitState.remotes[k] + ' (push)', 'output');
        });
      } else { addLine('Usage: git remote add <name> <url> | git remote -v', 'output'); }
    },

    'git push': function (args) {
      if (!requireInit()) return;
      addLine('Enumerating objects: ' + (gitState.commits.length * 3) + ', done.', 'output');
      addLine('Counting objects: 100% (' + gitState.commits.length + '/' + gitState.commits.length + '), done.', 'output');
      addLine('Writing objects: 100%, done.', 'output');
      addLine('To ' + (gitState.remotes.origin || 'https://github.com/user/repo.git'), 'output');
      addLine(' * [new branch]      ' + (args[1] || gitState.branch) + ' -> ' + (args[1] || gitState.branch), 'success');
    },

    'git pull': function () {
      if (!requireInit()) return;
      addLine('Already up to date.', 'success');
    },

    'git stash': function (args) {
      if (!requireInit()) return;
      if (args[0] === 'pop') {
        if (!gitState.stash.length) { addLine('No stash entries found.', 'error-line'); return; }
        gitState.working = gitState.working.concat(gitState.stash.pop());
        addLine('Restored stashed changes.', 'success');
      } else {
        if (!gitState.working.length && !gitState.staged.length) { addLine('No local changes to save', 'output'); return; }
        gitState.stash.push(gitState.working.concat(gitState.staged));
        gitState.working = [];
        gitState.staged = [];
        addLine('Saved working directory and index state', 'success');
      }
    },

    'git diff': function () {
      if (!requireInit()) return;
      if (!gitState.working.length) { addLine('No changes to show.', 'output'); return; }
      gitState.working.forEach(function (f) { addLine('diff --git a/' + f + ' b/' + f, 'branch'); });
    },

    touch: function (args) {
      if (!args.length) { addLine('touch: missing file operand', 'error-line'); return; }
      args.forEach(function (f) {
        if (gitState.working.indexOf(f) === -1 && gitState.staged.indexOf(f) === -1) {
          gitState.working.push(f);
          addLine("Created '" + f + "'", 'success');
        } else {
          addLine("'" + f + "' already exists", 'output');
        }
      });
    },

    ls: function () {
      var all = gitState.working.concat(gitState.staged);
      gitState.commits.forEach(function (c) {
        c.files.forEach(function (f) { if (all.indexOf(f) === -1) all.push(f); });
      });
      if (!all.length) { addLine('(empty directory)', 'output'); return; }
      addLine(all.join('  '), 'output');
    },

    clear: function () { body.innerHTML = ''; },

    reset: function () {
      gitState = { initialized: false, branch: 'main', branches: ['main'], staged: [], working: [], commits: [], remotes: {}, stash: [] };
      body.innerHTML = '';
      addLine('Simulator reset.', 'success');
      addLine('Type "help" for available commands.', 'output');
      updatePrompt();
    }
  };

  function requireInit() {
    if (!gitState.initialized) {
      addLine('fatal: not a git repository (or any of the parent directories): .git', 'error-line');
      addLine('Run "git init" first.', 'output');
      return false;
    }
    return true;
  }

  // ── Command Parser ──────────────────────────
  function processCommand(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;

    addLine(promptEl.textContent + ' ' + trimmed, '');

    var parts = trimmed.split(/\s+/);
    var cmd = parts[0];
    var args = parts.slice(1);

    if (cmd === 'git') {
      var subCmd = parts[1] || '';
      var gitCmd = 'git ' + subCmd;
      var gitArgs = parts.slice(2);
      if (commands[gitCmd]) {
        commands[gitCmd](gitArgs);
      } else {
        addLine("git: '" + subCmd + "' is not a git command. See 'help'.", 'error-line');
      }
    } else if (commands[cmd]) {
      commands[cmd](args);
    } else {
      addLine("command not found: " + cmd, 'error-line');
      addLine("Type 'help' for available commands.", 'output');
    }
  }

  // ── Input Handler ───────────────────────────
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      processCommand(input.value);
      input.value = '';
    }
  });

  // Focus terminal on click
  body.parentElement.addEventListener('click', function () { input.focus(); });

  // Log activity
  if (typeof ProgressManager !== 'undefined') {
    ProgressManager.logActivity('Opened Git Lab');
  }
})();
