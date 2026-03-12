/**
 * JSLab — Code Playground Logic
 * Monaco Editor integration, code execution, challenges, and snippet management.
 */
(function () {
  'use strict';

  // ── Challenges Data ─────────────────────────
  var CHALLENGES = [
    { title: 'Hello World', unit: 1, code: '// Challenge: Print "Hello, World!" to the console\n\n' },
    { title: 'Variables Practice', unit: 1, code: '// Challenge: Create variables using let and const\n// 1. Create a let variable called "age" with your age\n// 2. Create a const called "name" with your name\n// 3. Print both using template literals\n\n' },
    { title: 'Even or Odd', unit: 1, code: '// Challenge: Write a function that checks if a number is even or odd\n// Return "Even" or "Odd"\n\nfunction evenOrOdd(num) {\n  // your code here\n}\n\nconsole.log(evenOrOdd(4)); // Even\nconsole.log(evenOrOdd(7)); // Odd\n' },
    { title: 'FizzBuzz', unit: 1, code: '// Challenge: Print numbers 1-30\n// If divisible by 3, print "Fizz"\n// If divisible by 5, print "Buzz"\n// If divisible by both, print "FizzBuzz"\n\nfor (let i = 1; i <= 30; i++) {\n  // your code here\n}\n' },
    { title: 'Factorial', unit: 1, code: '// Challenge: Write a recursive factorial function\n\nfunction factorial(n) {\n  // your code here\n}\n\nconsole.log(factorial(5)); // 120\nconsole.log(factorial(0)); // 1\n' },
    { title: 'Array Filter', unit: 1, code: '// Challenge: Use filter() to get only numbers > 50\nconst scores = [23, 87, 45, 92, 51, 38, 76, 100, 12, 65];\n\nconst highScores = scores.filter(/* your code */);\nconsole.log(highScores);\n' },
    { title: 'Object Destructuring', unit: 2, code: '// Challenge: Destructure this object to extract name, age, and city\nconst person = {\n  name: "Pranav",\n  age: 20,\n  address: {\n    city: "Chandigarh",\n    state: "Punjab"\n  }\n};\n\n// Use destructuring here\n\nconsole.log(name, age, city);\n' },
    { title: 'DOM Manipulation', unit: 2, code: '// Challenge: Create a styled button that changes text on click\n// (This would run in a browser with a document)\n\nconsole.log("DOM challenges work best in an actual HTML page!");\nconsole.log("Try creating elements with document.createElement()");\n' },
    { title: 'Promise Practice', unit: 3, code: '// Challenge: Create a function that returns a Promise\n// It should resolve after 1 second with "Data loaded!"\n\nfunction loadData() {\n  return new Promise((resolve, reject) => {\n    // your code here\n  });\n}\n\nloadData().then(result => console.log(result));\n' },
    { title: 'Async/Await', unit: 3, code: '// Challenge: Rewrite the promise chain using async/await\nfunction delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function runTasks() {\n  // Wait 500ms, log "Task 1 done"\n  // Wait 500ms, log "Task 2 done"\n  // Wait 500ms, log "All done!"\n}\n\nrunTasks();\n' }
  ];

  var editor = null;
  var consoleOutput = document.getElementById('console-output');
  var consolePanel = document.getElementById('console-panel');
  var consoleHeader = document.getElementById('console-header');

  // ── Initialize Monaco Editor ────────────────
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.47.0/min/vs' } });

  require(['vs/editor/editor.main'], function () {
    monaco.editor.defineTheme('jslab-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' }
      ],
      colors: {
        'editor.background': '#0d1529',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#4fc3f744',
        'editorCursor.foreground': '#4fc3f7',
        'editor.selectionBackground': '#4fc3f722',
        'editor.lineHighlightBackground': '#ffffff06'
      }
    });

    editor = monaco.editor.create(document.getElementById('editor-container'), {
      value: '// Welcome to JSLab Playground!\n// Write your JavaScript code here and click "Run" or press Ctrl+Enter\n\nconsole.log("Hello, Pranav! 🚀");\nconsole.log("Start coding JavaScript here...");\n',
      language: 'javascript',
      theme: 'jslab-dark',
      fontSize: 14,
      fontFamily: "'Fira Code', Consolas, monospace",
      minimap: { enabled: false },
      padding: { top: 16 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      suggest: { showWords: true }
    });

    // Ctrl+Enter to run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
      runCode();
    });

    // Ctrl+S to save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      saveSnippet();
    });
  });

  // ── Console Output Helper ──────────────────
  function addOutput(type, args) {
    var line = document.createElement('div');
    line.className = 'console-line ' + type;
    var ts = document.createElement('span');
    ts.className = 'timestamp';
    var d = new Date();
    ts.textContent = d.getHours().toString().padStart(2, '0') + ':' +
                     d.getMinutes().toString().padStart(2, '0') + ':' +
                     d.getSeconds().toString().padStart(2, '0');
    line.appendChild(ts);
    var content = document.createElement('span');
    content.textContent = args.map(function (a) {
      if (typeof a === 'object') {
        try { return JSON.stringify(a, null, 2); } catch(e) { return String(a); }
      }
      return String(a);
    }).join(' ');
    line.appendChild(content);
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // ── Run Code (sandboxed iframe) ─────────────
  var runIframe = null;
  var runTimeout = null;

  function runCode() {
    if (!editor) return;
    var code = editor.getValue();
    consoleOutput.innerHTML = '';

    // Remove previous iframe if exists
    if (runIframe && runIframe.parentNode) {
      runIframe.parentNode.removeChild(runIframe);
    }
    if (runTimeout) clearTimeout(runTimeout);

    // Create sandboxed iframe — allow-scripts but NOT allow-same-origin
    // This prevents the iframe from accessing the parent's localStorage/DOM
    runIframe = document.createElement('iframe');
    runIframe.sandbox = 'allow-scripts';
    runIframe.style.display = 'none';
    document.body.appendChild(runIframe);

    // Listen for console messages from iframe
    function handleMessage(e) {
      if (!runIframe || e.source !== runIframe.contentWindow) return;
      var data = e.data;
      if (data && data.__jslab) {
        addOutput(data.type || 'log', data.args || []);
      }
    }
    window.addEventListener('message', handleMessage);

    // Build the code to run inside the iframe
    var iframeCode = [
      '<scr' + 'ipt>',
      'var console = {',
      '  log: function() { parent.postMessage({ __jslab:true, type:"log", args:Array.prototype.slice.call(arguments).map(function(a){ try{return typeof a==="object"?JSON.stringify(a,null,2):String(a);}catch(e){return String(a);} }) }, "*"); },',
      '  warn: function() { parent.postMessage({ __jslab:true, type:"warn", args:Array.prototype.slice.call(arguments).map(function(a){ try{return typeof a==="object"?JSON.stringify(a,null,2):String(a);}catch(e){return String(a);} }) }, "*"); },',
      '  error: function() { parent.postMessage({ __jslab:true, type:"error", args:Array.prototype.slice.call(arguments).map(function(a){ try{return typeof a==="object"?JSON.stringify(a,null,2):String(a);}catch(e){return String(a);} }) }, "*"); },',
      '  info: function() { console.log.apply(null, arguments); },',
      '  table: function(d) { console.log(d); },',
      '  clear: function() { parent.postMessage({ __jslab:true, type:"clear", args:[] }, "*"); }',
      '};',
      'try {',
      code,
      '} catch(e) {',
      '  console.error("❌ " + e.name + ": " + e.message);',
      '}',
      '</scr' + 'ipt>'
    ].join('\n');

    runIframe.srcdoc = iframeCode;

    // 5-second timeout — kill iframe if code runs too long (infinite loop protection)
    runTimeout = setTimeout(function () {
      if (runIframe && runIframe.parentNode) {
        runIframe.parentNode.removeChild(runIframe);
        addOutput('error', ['⏱ Execution timed out after 5 seconds (infinite loop?)']);
      }
      window.removeEventListener('message', handleMessage);
      runIframe = null;
    }, 5000);

    if (typeof ProgressManager !== 'undefined') {
      ProgressManager.logActivity('Ran code in Playground');
    }
  }

  // ── Save / Load Snippets ────────────────────
  function saveSnippet() {
    if (!editor) return;
    var name = prompt('Enter a name for this snippet:', 'Snippet ' + new Date().toLocaleTimeString());
    if (!name) return;
    if (typeof ProgressManager !== 'undefined') {
      ProgressManager.saveSnippet(name, editor.getValue());
    }
    var toast = document.getElementById('copy-toast');
    if (toast) {
      toast.textContent = 'Saved!';
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
        toast.textContent = 'Copied!';
      }, 2000);
    }
  }

  function showSnippets() {
    var modal = document.getElementById('snippets-modal');
    var list = document.getElementById('snippets-list');
    var snippets = typeof ProgressManager !== 'undefined' ? ProgressManager.getSnippets() : [];

    if (!snippets.length) {
      list.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:20px;">No saved snippets yet. Write code and click 💾 Save.</p>';
    } else {
      var html = '';
      snippets.forEach(function (s, i) {
        html += '<div class="snippet-item" data-idx="' + i + '">';
        html += '<div><strong>' + escapeHtml(s.name) + '</strong><br><span style="font-size:12px;color:var(--text-secondary);">' + new Date(s.date).toLocaleString() + '</span></div>';
        html += '<div><button class="btn btn-sm btn-primary snippet-load" data-idx="' + i + '">Load</button>';
        html += ' <button class="btn btn-sm btn-error snippet-delete" data-idx="' + i + '">✕</button></div>';
        html += '</div>';
      });
      list.innerHTML = html;
    }
    modal.classList.add('active');
  }

  // ── Build Challenges Menu ───────────────────
  function buildChallengesMenu() {
    var menu = document.getElementById('challenges-menu');
    var html = '';
    CHALLENGES.forEach(function (ch, i) {
      html += '<div class="challenge-item" data-idx="' + i + '">';
      html += '<div class="challenge-unit">Unit ' + ch.unit + '</div>';
      html += ch.title;
      html += '</div>';
    });
    menu.innerHTML = html;
  }
  buildChallengesMenu();

  // ── Event Handlers ──────────────────────────
  document.getElementById('run-btn').addEventListener('click', runCode);

  document.getElementById('clear-btn').addEventListener('click', function () {
    consoleOutput.innerHTML = '';
  });

  document.getElementById('save-btn').addEventListener('click', saveSnippet);
  document.getElementById('snippets-btn').addEventListener('click', showSnippets);

  document.getElementById('snippets-close').addEventListener('click', function () {
    document.getElementById('snippets-modal').classList.remove('active');
  });
  document.getElementById('snippets-modal').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
  });

  // Snippets load/delete
  document.getElementById('snippets-list').addEventListener('click', function (e) {
    var loadBtn = e.target.closest('.snippet-load');
    var delBtn = e.target.closest('.snippet-delete');
    if (loadBtn) {
      var snippets = ProgressManager.getSnippets();
      var idx = parseInt(loadBtn.getAttribute('data-idx'));
      if (editor && snippets[idx]) {
        editor.setValue(snippets[idx].code);
        document.getElementById('snippets-modal').classList.remove('active');
      }
    }
    if (delBtn) {
      var idx = parseInt(delBtn.getAttribute('data-idx'));
      var snippets = ProgressManager.getSnippets();
      snippets.splice(idx, 1);
      try { localStorage.setItem('jslab_snippets', JSON.stringify(snippets)); } catch(e) {}
      showSnippets();
    }
  });

  // Challenges dropdown
  var challengesBtn = document.getElementById('challenges-btn');
  var challengesMenu = document.getElementById('challenges-menu');

  challengesBtn.addEventListener('click', function () {
    challengesMenu.classList.toggle('open');
  });

  challengesMenu.addEventListener('click', function (e) {
    var item = e.target.closest('.challenge-item');
    if (item && editor) {
      var idx = parseInt(item.getAttribute('data-idx'));
      editor.setValue(CHALLENGES[idx].code);
      challengesMenu.classList.remove('open');
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.challenges-dropdown')) {
      challengesMenu.classList.remove('open');
    }
  });

  // Console toggle
  consoleHeader.addEventListener('click', function () {
    consolePanel.classList.toggle('collapsed');
    document.getElementById('console-toggle').textContent = consolePanel.classList.contains('collapsed') ? '▸' : '▾';
  });

  // Font size
  document.getElementById('font-size-select').addEventListener('change', function () {
    if (editor) editor.updateOptions({ fontSize: parseInt(this.value) });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('snippets-modal').classList.remove('active');
      challengesMenu.classList.remove('open');
    }
  });
})();
