/**
 * JSLab — Tutorials Data (All 45 Lectures)
 * Complete theory, code examples, quick reference, and mini quiz data.
 * Author: Pranav Pushya
 * Course: Frontend Engineering-1 (25CSE0105)
 */

var LECTURES = [
  // ============ LECTURE 1 ============
  {
    id: 1, unit: 1, title: "Introduction to JavaScript",
    clo: "CLO01", difficulty: "Beginner", readTime: "8 min",
    theory: "<h3>What is JavaScript?</h3><p>JavaScript is a lightweight, interpreted programming language that makes web pages interactive. While HTML provides the structure and CSS handles the styling, JavaScript adds behavior — it can respond to clicks, validate forms, update content without reloading the page, and much more.</p><div class='analogy-box'><strong>Analogy:</strong> If a web page were a house, HTML would be the walls and rooms (structure), CSS would be the paint and furniture (appearance), and JavaScript would be the electricity and plumbing (functionality).</div><h3>Brief History</h3><p>JavaScript was created by Brendan Eich in just 10 days in 1995 at Netscape. Originally named \"Mocha\", then \"LiveScript\", it was finally renamed \"JavaScript\" as a marketing strategy to ride the popularity of Java — though the two languages are very different.</p><p>Today, JavaScript is the most widely-used programming language in the world. It runs in every web browser, and thanks to Node.js, it can also run on servers.</p><h3>Role in Web Development</h3><ul><li><strong>Client-side:</strong> Runs in the browser to create interactive UI elements, handle events, and manipulate the page.</li><li><strong>Server-side:</strong> With Node.js, JavaScript can handle backend tasks like database queries and API creation.</li><li><strong>Full-stack:</strong> JavaScript is the only language that works on both the frontend and backend.</li></ul>",
    examples: [
      { title: "Your first JavaScript code", code: "// This is a comment — the browser ignores it\nconsole.log(\"Hello, World!\");\n\n// JavaScript can do math\nconsole.log(5 + 3);  // Output: 8\nconsole.log(10 * 2); // Output: 20" },
      { title: "JavaScript inside HTML", code: "// In an HTML file, you write JS inside <script> tags:\n// <script>\n//   alert(\"Welcome to JavaScript!\");\n// </script>\n\n// Or link an external file:\n// <script src=\"main.js\"></script>\n\nconsole.log(\"JS is loaded and running!\");" }
    ],
    quickRef: [
      { syntax: "console.log()", desc: "Print output to the browser console" },
      { syntax: "<script>", desc: "HTML tag to embed JavaScript code" },
      { syntax: "// comment", desc: "Single-line comment (ignored by browser)" }
    ],
    miniQuiz: [
      { q: "Who created JavaScript?", options: ["James Gosling", "Brendan Eich", "Guido van Rossum", "Tim Berners-Lee"], correct: 1, explanation: "Brendan Eich created JavaScript in 1995 at Netscape." },
      { q: "What does JavaScript add to a web page?", options: ["Structure", "Styling", "Behavior and interactivity", "Database storage"], correct: 2, explanation: "JavaScript adds behavior and interactivity — HTML provides structure, CSS provides styling." },
      { q: "Which tag is used to include JavaScript in HTML?", options: ["<js>", "<javascript>", "<script>", "<code>"], correct: 2, explanation: "The <script> tag is used to embed or link JavaScript in HTML documents." }
    ]
  },
  // ============ LECTURE 2 ============
  {
    id: 2, unit: 1, title: "ECMAScript Standards & ES6+",
    clo: "CLO01", difficulty: "Beginner", readTime: "7 min",
    theory: "<h3>What is ECMAScript?</h3><p>ECMAScript (ES) is the official specification that defines how JavaScript should work. Think of it as the rule book that all browsers follow when running your JavaScript code. JavaScript is an implementation of ECMAScript.</p><p>The specification is maintained by a committee called TC39, which proposes and votes on new features.</p><h3>Key ECMAScript Versions</h3><ul><li><strong>ES5 (2009):</strong> Added strict mode, JSON support, and array methods like forEach, map, filter.</li><li><strong>ES6 / ES2015:</strong> The biggest update ever — added let/const, arrow functions, classes, template literals, destructuring, Promises, and modules.</li><li><strong>ES2016–ES2024:</strong> Yearly updates adding features like async/await (ES2017), optional chaining (ES2020), and more.</li></ul><div class='analogy-box'><strong>Analogy:</strong> ECMAScript is like the grammar rules for the English language. JavaScript is the actual language people speak using those rules. Updates to ECMAScript are like adding new words to the dictionary.</div><h3>What ES6+ Means</h3><p>When developers say \"ES6+\", they mean ECMAScript 2015 and all versions after it. This is the modern JavaScript that you will learn in this course. Almost all modern browsers support ES6+ features.</p>",
    examples: [
      { title: "ES6 template literals", code: "// Old way (ES5) - string concatenation\nvar name = 'Pranav';\nconsole.log('Hello, ' + name + '!');\n\n// New way (ES6+) - template literals\nconst greeting = `Hello, ${name}!`;\nconsole.log(greeting); // Hello, Pranav!" },
      { title: "let and const (ES6)", code: "// var - old way, function scoped\nvar x = 10;\n\n// let - block scoped, can be reassigned\nlet y = 20;\ny = 25; // OK\n\n// const - block scoped, cannot be reassigned\nconst z = 30;\n// z = 35; // ERROR: Assignment to constant variable\n\nconsole.log(x, y, z); // 10 25 30" }
    ],
    quickRef: [
      { syntax: "ES6 / ES2015", desc: "Major JavaScript update with modern features" },
      { syntax: "`template ${literal}`", desc: "String with embedded expressions" },
      { syntax: "TC39", desc: "Committee that manages the ECMAScript specification" }
    ],
    miniQuiz: [
      { q: "What is ECMAScript?", options: ["A JavaScript library", "The official JS specification", "A browser engine", "A CSS preprocessor"], correct: 1, explanation: "ECMAScript is the official specification that defines how JavaScript works." },
      { q: "Which ES version introduced let and const?", options: ["ES5", "ES6 / ES2015", "ES2017", "ES2020"], correct: 1, explanation: "ES6 (ES2015) introduced let, const, arrow functions, and many other modern features." },
      { q: "What does `${name}` do inside backticks?", options: ["Creates a variable", "Embeds a variable's value in the string", "Declares a constant", "Nothing — it prints literally"], correct: 1, explanation: "Inside template literals (backticks), ${} embeds the value of an expression into the string." }
    ]
  },
  // ============ LECTURE 3 ============
  {
    id: 3, unit: 1, title: "Variables — var, let, const",
    clo: "CLO01", difficulty: "Beginner", readTime: "10 min",
    theory: "<h3>What Are Variables?</h3><p>Variables are containers that store data values. Think of them as labeled boxes where you keep information that your program can use later.</p><h3>var — The Old Way</h3><p><code>var</code> was the original way to declare variables in JavaScript. It is <strong>function-scoped</strong>, meaning it is accessible throughout the entire function it was declared in, regardless of blocks like if/for.</p><p><code>var</code> also gets <strong>hoisted</strong> — the declaration is moved to the top of its scope, but the value assignment stays in place. This can cause confusing bugs.</p><h3>let — The Modern Variable</h3><p><code>let</code> is <strong>block-scoped</strong>, meaning it only exists inside the nearest curly braces <code>{}</code> where it was declared. It can be reassigned a new value but cannot be re-declared in the same scope.</p><h3>const — The Constant</h3><p><code>const</code> is also <strong>block-scoped</strong> like <code>let</code>, but it cannot be reassigned after its initial value is set. You must assign a value when you declare it.</p><div class='analogy-box'><strong>Analogy:</strong> <code>var</code> is like a sticky note that floats around the entire room (function). <code>let</code> is a sticky note that stays only on the desk (block) where you put it. <code>const</code> is a sticky note glued permanently to the desk — you can read it, but cannot move or replace it.</div><h3>Hoisting Explained</h3><p>JavaScript moves variable declarations to the top of their scope before running the code. With <code>var</code>, the variable exists but is <code>undefined</code> until the assignment line. With <code>let</code> and <code>const</code>, they are hoisted but sit in a \"Temporal Dead Zone\" — accessing them before declaration throws a ReferenceError.</p><h3>Mutability</h3><p><code>const</code> prevents reassignment, but if the value is an object or array, you can still modify the contents (properties/elements). The reference is constant, not the value itself.</p>",
    examples: [
      { title: "Scope difference: var vs let", code: "// var is function-scoped\nfunction testVar() {\n  if (true) {\n    var x = 10;\n  }\n  console.log(x); // 10 — var leaks out of the if block\n}\ntestVar();\n\n// let is block-scoped\nfunction testLet() {\n  if (true) {\n    let y = 20;\n  }\n  // console.log(y); // ReferenceError: y is not defined\n  console.log('y is not accessible here');\n}\ntestLet();" },
      { title: "Hoisting behavior", code: "// var hoisting\nconsole.log(a); // undefined (hoisted, but not assigned yet)\nvar a = 5;\nconsole.log(a); // 5\n\n// let hoisting (Temporal Dead Zone)\ntry {\n  console.log(b); // ReferenceError\n} catch(e) {\n  console.log('Error:', e.message);\n}\nlet b = 10;" },
      { title: "const with objects", code: "const person = { name: 'Pranav', age: 20 };\n\n// You CAN modify properties\nperson.age = 21;\nconsole.log(person); // { name: 'Pranav', age: 21 }\n\n// You CANNOT reassign the variable\n// person = { name: 'Other' }; // TypeError\n\nconsole.log('const prevents reassignment, not mutation');" }
    ],
    quickRef: [
      { syntax: "var x = 5;", desc: "Function-scoped, hoisted, can be redeclared" },
      { syntax: "let y = 10;", desc: "Block-scoped, not redeclared, can be reassigned" },
      { syntax: "const z = 15;", desc: "Block-scoped, cannot be reassigned" }
    ],
    miniQuiz: [
      { q: "What scope does `let` have?", options: ["Global scope", "Function scope", "Block scope", "No scope"], correct: 2, explanation: "let is block-scoped — it only exists within the nearest {} where it was declared." },
      { q: "What happens when you access a `var` variable before its declaration?", options: ["ReferenceError", "undefined", "null", "0"], correct: 1, explanation: "var declarations are hoisted, so the variable exists but has the value undefined until the assignment line." },
      { q: "Can you change properties of a const object?", options: ["Yes", "No", "Only in strict mode", "Only arrays"], correct: 0, explanation: "const prevents reassignment of the variable itself, but you can still modify properties of objects and elements of arrays." }
    ]
  },
  // ============ LECTURE 4 ============
  {
    id: 4, unit: 1, title: "Primitive Data Types",
    clo: "CLO01", difficulty: "Beginner", readTime: "10 min",
    theory: "<h3>What Are Data Types?</h3><p>Every value in JavaScript has a type that tells the engine what kind of data it is and what operations can be performed on it. JavaScript has 7 primitive data types.</p><h3>1. String</h3><p>Strings represent text. They are created using single quotes <code>'hello'</code>, double quotes <code>\"hello\"</code>, or backticks <code>`hello`</code>. Strings are immutable — once created, individual characters cannot be changed.</p><h3>2. Number</h3><p>JavaScript uses a single <code>Number</code> type for both integers and decimals (floating-point). Special number values include <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code> (Not a Number).</p><h3>3. Boolean</h3><p>Booleans have only two values: <code>true</code> or <code>false</code>. They are used in conditions, comparisons, and logical operations.</p><h3>4. null</h3><p><code>null</code> represents the intentional absence of any value. It means \"nothing\" or \"empty\" — and it is something you explicitly assign.</p><h3>5. undefined</h3><p><code>undefined</code> means a variable has been declared but not yet assigned a value. JavaScript automatically sets uninitialized variables to <code>undefined</code>.</p><h3>6. Symbol (ES6)</h3><p>Symbols are unique, immutable identifiers. Every <code>Symbol()</code> call creates a completely unique value, even if you pass the same description. They are used as unique property keys.</p><h3>7. BigInt (ES2020)</h3><p>BigInt allows you to work with integers beyond the safe integer limit of <code>Number</code> (2^53 - 1). You create a BigInt by appending <code>n</code> to a number or using <code>BigInt()</code>.</p><div class='analogy-box'><strong>Analogy:</strong> Primitive types are like simple values written on index cards — each card holds one thing (a number, a word, true/false). You cannot change what is written; you can only get a new card.</div><h3>typeof Operator</h3><p>Use <code>typeof</code> to check the type of any value. Note: <code>typeof null</code> returns <code>\"object\"</code> — this is a known bug in JavaScript that has existed since the language was created.</p>",
    examples: [
      { title: "All 7 primitive types", code: "// String\nlet name = 'Pranav';\nconsole.log(typeof name); // \"string\"\n\n// Number\nlet age = 20;\nlet pi = 3.14;\nconsole.log(typeof age); // \"number\"\n\n// Boolean\nlet isStudent = true;\nconsole.log(typeof isStudent); // \"boolean\"\n\n// null\nlet emptyValue = null;\nconsole.log(typeof emptyValue); // \"object\" (JS bug!)\n\n// undefined\nlet notAssigned;\nconsole.log(typeof notAssigned); // \"undefined\"\n\n// Symbol\nlet id = Symbol('userId');\nconsole.log(typeof id); // \"symbol\"\n\n// BigInt\nlet bigNumber = 9007199254740993n;\nconsole.log(typeof bigNumber); // \"bigint\"" },
      { title: "String methods and template literals", code: "let greeting = 'Hello, World!';\n\nconsole.log(greeting.length);        // 13\nconsole.log(greeting.toUpperCase());  // HELLO, WORLD!\nconsole.log(greeting.includes('World')); // true\nconsole.log(greeting.slice(0, 5));    // Hello\n\n// Template literal with expression\nlet a = 10, b = 20;\nconsole.log(`Sum of ${a} and ${b} is ${a + b}`); // Sum of 10 and 20 is 30" }
    ],
    quickRef: [
      { syntax: "typeof value", desc: "Returns the type of a value as a string" },
      { syntax: "String, Number, Boolean", desc: "The 3 most common primitive types" },
      { syntax: "null vs undefined", desc: "null = intentionally empty; undefined = not yet assigned" },
      { syntax: "Symbol('desc')", desc: "Creates a unique identifier" },
      { syntax: "123n or BigInt(123)", desc: "Creates a BigInt for very large integers" }
    ],
    miniQuiz: [
      { q: "How many primitive data types does JavaScript have?", options: ["5", "6", "7", "8"], correct: 2, explanation: "JavaScript has 7 primitives: String, Number, Boolean, null, undefined, Symbol, and BigInt." },
      { q: "What does typeof null return?", options: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""], correct: 2, explanation: "typeof null returns 'object' — this is a known, long-standing bug in JavaScript." },
      { q: "What is the difference between null and undefined?", options: ["They are the same", "null is assigned intentionally; undefined means not yet assigned", "undefined is assigned intentionally; null means not yet assigned", "null is a number; undefined is a string"], correct: 1, explanation: "null is explicitly set to mean 'nothing'. undefined means a variable exists but has not been given a value yet." }
    ]
  },
  // ============ LECTURE 5 ============
  {
    id: 5, unit: 1, title: "Operators — Arithmetic, Comparison, Logical",
    clo: "CLO02", difficulty: "Beginner", readTime: "9 min",
    theory: "<h3>Arithmetic Operators</h3><p>These perform mathematical calculations:</p><ul><li><code>+</code> Addition (also concatenates strings)</li><li><code>-</code> Subtraction</li><li><code>*</code> Multiplication</li><li><code>/</code> Division</li><li><code>%</code> Modulus (remainder after division)</li><li><code>**</code> Exponentiation (power)</li><li><code>++</code> Increment, <code>--</code> Decrement</li></ul><h3>Comparison Operators</h3><p>These compare two values and return a boolean (<code>true</code> or <code>false</code>):</p><ul><li><code>==</code> Equal (loose — performs type conversion)</li><li><code>===</code> Strict equal (no type conversion)</li><li><code>!=</code> Not equal (loose)</li><li><code>!==</code> Strict not equal</li><li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> Greater/less than</li></ul><div class='analogy-box'><strong>Important:</strong> Always prefer <code>===</code> over <code>==</code>. Loose equality can produce surprising results like <code>0 == ''</code> being <code>true</code>.</div><h3>Logical Operators</h3><ul><li><code>&&</code> AND — true only if both operands are true</li><li><code>||</code> OR — true if at least one operand is true</li><li><code>!</code> NOT — flips true to false and vice versa</li></ul><h3>Ternary Operator</h3><p>A shorthand for if/else: <code>condition ? valueIfTrue : valueIfFalse</code>. It is the only JavaScript operator that takes three operands.</p>",
    examples: [
      { title: "Arithmetic and comparison operators", code: "// Arithmetic\nconsole.log(10 + 3);  // 13\nconsole.log(10 - 3);  // 7\nconsole.log(10 * 3);  // 30\nconsole.log(10 / 3);  // 3.333...\nconsole.log(10 % 3);  // 1 (remainder)\nconsole.log(2 ** 5);  // 32 (2 to the power 5)\n\n// Comparison\nconsole.log(5 == '5');   // true (loose)\nconsole.log(5 === '5');  // false (strict)\nconsole.log(5 !== '5');  // true\nconsole.log(10 > 3);    // true" },
      { title: "Logical and ternary operators", code: "let age = 20;\nlet hasID = true;\n\n// Logical AND — both must be true\nconsole.log(age >= 18 && hasID); // true\n\n// Logical OR — at least one must be true\nconsole.log(age >= 21 || hasID); // true\n\n// Logical NOT — flips the value\nconsole.log(!hasID); // false\n\n// Ternary operator\nlet status = age >= 18 ? 'Adult' : 'Minor';\nconsole.log(status); // Adult" }
    ],
    quickRef: [
      { syntax: "===", desc: "Strict equality (no type conversion)" },
      { syntax: "&&, ||, !", desc: "Logical AND, OR, NOT" },
      { syntax: "a ? b : c", desc: "Ternary — if a is true, return b, else c" },
      { syntax: "%", desc: "Modulus — returns remainder of division" },
      { syntax: "**", desc: "Exponentiation (power)" }
    ],
    miniQuiz: [
      { q: "What does `5 == '5'` return?", options: ["true", "false", "undefined", "Error"], correct: 0, explanation: "Loose equality (==) performs type conversion, so the string '5' is converted to number 5, making them equal." },
      { q: "What does the ternary operator do?", options: ["Loops 3 times", "Shorthand for if/else", "Declares 3 variables", "Compares 3 values"], correct: 1, explanation: "The ternary operator condition ? a : b is a shorthand for if/else — returns a if condition is true, b otherwise." },
      { q: "What does `!true` evaluate to?", options: ["true", "false", "null", "undefined"], correct: 1, explanation: "The NOT operator (!) flips a boolean — !true becomes false." }
    ]
  },
  // ============ LECTURE 6 ============
  {
    id: 6, unit: 1, title: "Control Flow — if/else, switch",
    clo: "CLO02", difficulty: "Beginner", readTime: "8 min",
    theory: "<h3>if Statement</h3><p>The <code>if</code> statement executes a block of code only if a specified condition is true. You can chain multiple conditions using <code>else if</code> and provide a fallback with <code>else</code>.</p><h3>switch Statement</h3><p>The <code>switch</code> statement evaluates an expression and matches its value against multiple <code>case</code> clauses. It is cleaner than many if/else if chains when comparing a single value against multiple options.</p><p>Important: always include <code>break</code> after each case to prevent \"fall-through\" (executing subsequent cases). The <code>default</code> case runs when no other case matches.</p><div class='analogy-box'><strong>Analogy:</strong> <code>if/else</code> is like a series of questions: \"Is it raining? If yes, take umbrella. Else if it's sunny, take sunglasses. Else, just go.\" <code>switch</code> is like a vending machine — you enter a code, and it matches to the right product.</div><h3>Truthy and Falsy Values</h3><p>In conditions, JavaScript converts values to boolean. <strong>Falsy values:</strong> <code>false</code>, <code>0</code>, <code>''</code> (empty string), <code>null</code>, <code>undefined</code>, <code>NaN</code>. Everything else is <strong>truthy</strong>.</p>",
    examples: [
      { title: "if / else if / else", code: "let score = 85;\n\nif (score >= 90) {\n  console.log('Grade: A');\n} else if (score >= 80) {\n  console.log('Grade: B'); // This runs\n} else if (score >= 70) {\n  console.log('Grade: C');\n} else {\n  console.log('Grade: F');\n}" },
      { title: "switch statement", code: "let day = 'Monday';\n\nswitch (day) {\n  case 'Monday':\n    console.log('Start of the week!');\n    break;\n  case 'Friday':\n    console.log('Almost weekend!');\n    break;\n  case 'Saturday':\n  case 'Sunday':\n    console.log('Weekend!');\n    break;\n  default:\n    console.log('Regular day');\n}" },
      { title: "Truthy and falsy values", code: "// All falsy values\nconsole.log(Boolean(false));     // false\nconsole.log(Boolean(0));         // false\nconsole.log(Boolean(''));        // false\nconsole.log(Boolean(null));      // false\nconsole.log(Boolean(undefined)); // false\nconsole.log(Boolean(NaN));       // false\n\n// Truthy examples\nconsole.log(Boolean('hello'));   // true\nconsole.log(Boolean(42));        // true\nconsole.log(Boolean([]));        // true (empty array is truthy!)" }
    ],
    quickRef: [
      { syntax: "if (cond) { }", desc: "Execute block if condition is true" },
      { syntax: "else if (cond) { }", desc: "Check another condition if previous was false" },
      { syntax: "switch (expr) { case: }", desc: "Match expression against multiple values" },
      { syntax: "break", desc: "Exit the switch block after a match" }
    ],
    miniQuiz: [
      { q: "What happens if you forget `break` in a switch case?", options: ["Error is thrown", "Only the matching case runs", "Subsequent cases also execute (fall-through)", "The switch is skipped"], correct: 2, explanation: "Without break, JavaScript 'falls through' to the next case and executes it too, regardless of whether it matches." },
      { q: "Which of these is a falsy value?", options: ["[] (empty array)", "'0' (string zero)", "0 (number zero)", "{} (empty object)"], correct: 2, explanation: "The number 0 is falsy. Empty arrays [], empty objects {}, and the string '0' are all truthy." },
      { q: "What does else do?", options: ["Checks another condition", "Runs if all previous conditions were false", "Ends the if block", "Loops the condition"], correct: 1, explanation: "else is the fallback — it runs only when all preceding if and else if conditions are false." }
    ]
  },
  // ============ LECTURE 7 ============
  {
    id: 7, unit: 1, title: "Loops — for, while, do/while, for...in, for...of",
    clo: "CLO02", difficulty: "Beginner", readTime: "12 min",
    theory: "<h3>Why Loops?</h3><p>Loops let you repeat a block of code multiple times without writing it over and over. They are essential for processing arrays, repeating tasks, and iterating over data.</p><h3>for Loop</h3><p>The most common loop. It has three parts: <code>initialization</code>, <code>condition</code>, and <code>update</code>. The loop runs as long as the condition is true.</p><h3>while Loop</h3><p>Runs as long as a condition is true. Use when you don't know in advance how many times to loop.</p><h3>do...while Loop</h3><p>Like <code>while</code>, but the code block runs at least once because the condition is checked after execution.</p><h3>for...in Loop</h3><p>Iterates over the <strong>keys</strong> (property names) of an object. Can also iterate over array indices, but <code>for...of</code> is preferred for arrays.</p><h3>for...of Loop (ES6)</h3><p>Iterates over the <strong>values</strong> of an iterable (arrays, strings, Maps, Sets). Cleaner and more readable than a traditional for loop for arrays.</p><div class='analogy-box'><strong>Analogy:</strong> A <code>for</code> loop is like running laps on a track — you know you'll run 10 laps. A <code>while</code> loop is like running until you're tired — you don't know when you'll stop. A <code>do...while</code> is like \"run at least one lap, then check if you're tired.\"</div>",
    examples: [
      { title: "for, while, and do...while", code: "// for loop\nfor (let i = 1; i <= 5; i++) {\n  console.log('Count:', i);\n}\n\n// while loop\nlet n = 3;\nwhile (n > 0) {\n  console.log('while:', n);\n  n--;\n}\n\n// do...while — runs at least once\nlet x = 0;\ndo {\n  console.log('do-while runs even when x is', x);\n  x++;\n} while (x < 0); // condition is false, but it ran once" },
      { title: "for...in and for...of", code: "// for...in — iterates over keys (properties)\nconst person = { name: 'Pranav', age: 20, city: 'Chandigarh' };\nfor (let key in person) {\n  console.log(key + ':', person[key]);\n}\n\n// for...of — iterates over values\nconst colors = ['red', 'green', 'blue'];\nfor (let color of colors) {\n  console.log(color);\n}\n\n// for...of on a string\nfor (let char of 'Hello') {\n  console.log(char);\n}" }
    ],
    quickRef: [
      { syntax: "for (init; cond; update)", desc: "Loop with known iteration count" },
      { syntax: "while (cond) { }", desc: "Loop while condition is true" },
      { syntax: "do { } while (cond)", desc: "Execute at least once, then check condition" },
      { syntax: "for (key in obj)", desc: "Iterate over object keys" },
      { syntax: "for (val of iterable)", desc: "Iterate over array/string values" }
    ],
    miniQuiz: [
      { q: "Which loop always runs at least once?", options: ["for", "while", "do...while", "for...of"], correct: 2, explanation: "do...while checks the condition after the code block runs, so it always executes at least once." },
      { q: "What does for...of iterate over?", options: ["Object keys", "Object values", "Iterable values (arrays, strings)", "Index numbers"], correct: 2, explanation: "for...of iterates over the values of iterables like arrays, strings, Maps, and Sets." },
      { q: "What are the 3 parts of a for loop?", options: ["start, end, step", "init, condition, update", "declare, assign, return", "open, run, close"], correct: 1, explanation: "A for loop has: initialization (run once), condition (checked each iteration), and update (run after each iteration)." }
    ]
  },
  // ============ LECTURE 8 ============
  {
    id: 8, unit: 1, title: "break, continue, console methods, Reference Types Intro",
    clo: "CLO02", difficulty: "Beginner", readTime: "10 min",
    theory: "<h3>break Statement</h3><p><code>break</code> immediately exits the current loop entirely. Use it to stop looping when a condition is met.</p><h3>continue Statement</h3><p><code>continue</code> skips the rest of the current iteration and jumps to the next one. The loop itself does not stop.</p><h3>Console Methods</h3><p>The <code>console</code> object provides several methods beyond <code>log()</code>:</p><ul><li><code>console.log()</code> — General output</li><li><code>console.warn()</code> — Warning message (yellow)</li><li><code>console.error()</code> — Error message (red)</li><li><code>console.table()</code> — Display data as a formatted table</li></ul><h3>Reference Types: Arrays</h3><p>Arrays are ordered collections of values. They can hold any type of data, and elements are accessed by index (starting from 0). Arrays are reference types — when you assign an array to a new variable, both variables point to the same array in memory.</p><h3>Reference Types: Objects</h3><p>Objects are collections of key-value pairs. Keys are strings (or Symbols), and values can be any type. Objects are the most versatile data structure in JavaScript.</p><div class='analogy-box'><strong>Analogy:</strong> An array is like a numbered list (shopping list: item 0, item 1, item 2...). An object is like a dictionary — you look up a word (key) to find its definition (value).</div>",
    examples: [
      { title: "break and continue", code: "// break — stop when we find 5\nfor (let i = 1; i <= 10; i++) {\n  if (i === 5) break;\n  console.log(i); // 1, 2, 3, 4\n}\n\n// continue — skip even numbers\nfor (let i = 1; i <= 6; i++) {\n  if (i % 2 === 0) continue;\n  console.log(i); // 1, 3, 5\n}" },
      { title: "Console methods and arrays/objects", code: "// Console methods\nconsole.log('Normal message');\nconsole.warn('Warning: check this');\nconsole.error('Error: something broke');\n\n// Array\nconst fruits = ['apple', 'banana', 'cherry'];\nconsole.log(fruits[0]); // apple\nconsole.log(fruits.length); // 3\nconsole.table(fruits);\n\n// Object\nconst student = {\n  name: 'Pranav',\n  course: 'FE-1',\n  year: 2025\n};\nconsole.log(student.name); // Pranav\nconsole.table(student);" }
    ],
    quickRef: [
      { syntax: "break", desc: "Exit the loop entirely" },
      { syntax: "continue", desc: "Skip to the next loop iteration" },
      { syntax: "console.warn()", desc: "Print a yellow warning message" },
      { syntax: "console.error()", desc: "Print a red error message" },
      { syntax: "console.table()", desc: "Print data in table format" }
    ],
    miniQuiz: [
      { q: "What does `continue` do in a loop?", options: ["Stops the loop", "Skips the current iteration", "Restarts the loop", "Pauses the loop"], correct: 1, explanation: "continue skips the rest of the current iteration and moves to the next one." },
      { q: "What index does the first element of an array have?", options: ["1", "0", "-1", "It depends"], correct: 1, explanation: "Arrays in JavaScript are zero-indexed — the first element has index 0." },
      { q: "What does console.table() do?", options: ["Creates an HTML table", "Displays data in a formatted table in the console", "Saves data to a file", "Converts data to a string"], correct: 1, explanation: "console.table() displays array or object data in a nicely formatted table view in the browser console." }
    ]
  },
  // ============ LECTURE 9 ============
  {
    id: 9, unit: 1, title: "Functions — Declaration & Calling",
    clo: "CLO03", difficulty: "Beginner", readTime: "9 min",
    theory: "<h3>What Is a Function?</h3><p>A function is a reusable block of code that performs a specific task. Instead of writing the same code multiple times, you write it once in a function and call that function whenever needed.</p><h3>Function Declaration</h3><p>You declare a function using the <code>function</code> keyword, followed by a name, parentheses for parameters, and curly braces for the code body. Function declarations are hoisted — you can call them before they appear in the code.</p><h3>Calling a Function</h3><p>You call (invoke) a function by writing its name followed by parentheses. If the function accepts parameters, you pass values (arguments) inside the parentheses.</p><h3>Return Values</h3><p>Functions can return a value using the <code>return</code> statement. Once <code>return</code> executes, the function stops immediately. If there is no return statement, the function returns <code>undefined</code>.</p><div class='analogy-box'><strong>Analogy:</strong> A function is like a recipe. You define the recipe once (declaration), and every time you want to make that dish, you follow the recipe (call the function). Ingredients are parameters, and the finished dish is the return value.</div>",
    examples: [
      { title: "Declaring and calling functions", code: "// Function declaration\nfunction greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\n// Calling the function\nlet message = greet('Pranav');\nconsole.log(message); // Hello, Pranav!\n\n// Function without return (returns undefined)\nfunction sayHi() {\n  console.log('Hi there!');\n}\nlet result = sayHi(); // prints: Hi there!\nconsole.log(result);  // undefined" },
      { title: "Functions with multiple parameters", code: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(5, 3));  // 8\nconsole.log(add(10, 20)); // 30\n\n// Function that checks even/odd\nfunction isEven(num) {\n  return num % 2 === 0;\n}\nconsole.log(isEven(4));  // true\nconsole.log(isEven(7));  // false" }
    ],
    quickRef: [
      { syntax: "function name(params) { }", desc: "Declare a named function" },
      { syntax: "name(args)", desc: "Call/invoke a function with arguments" },
      { syntax: "return value", desc: "Send a value back from the function" }
    ],
    miniQuiz: [
      { q: "What does a function return if there's no return statement?", options: ["0", "null", "undefined", "false"], correct: 2, explanation: "If a function has no return statement, it returns undefined by default." },
      { q: "What is the difference between parameters and arguments?", options: ["They're the same thing", "Parameters are in the declaration; arguments are the values passed when calling", "Arguments are in the declaration; parameters are passed when calling", "Parameters are for objects only"], correct: 1, explanation: "Parameters are the variable names listed in the function declaration. Arguments are the actual values you pass when you call the function." },
      { q: "Are function declarations hoisted?", options: ["Yes", "No", "Only with var", "Only in strict mode"], correct: 0, explanation: "Yes, function declarations are fully hoisted — you can call them before they appear in your code." }
    ]
  },
  // ============ LECTURE 10 ============
  {
    id: 10, unit: 1, title: "Function Arguments — Default, Rest Parameters",
    clo: "CLO03", difficulty: "Beginner", readTime: "9 min",
    theory: "<h3>Required Arguments</h3><p>When you define a function with parameters, those parameters are expected to receive values. If you call the function without providing an argument, that parameter becomes <code>undefined</code>.</p><h3>Default Parameters (ES6)</h3><p>Default parameters let you set a fallback value for a parameter. If no argument is passed (or <code>undefined</code> is passed), the default value is used instead.</p><h3>Rest Parameters (ES6)</h3><p>The rest parameter syntax <code>...args</code> allows a function to accept any number of arguments as an array. It must be the last parameter in the function definition.</p><div class='analogy-box'><strong>Analogy:</strong> Default parameters are like a restaurant order: \"I'll have the usual\" means use the default. Rest parameters are like saying \"I'll take everything you have\" — you get all remaining items gathered into one basket.</div><h3>The arguments Object</h3><p>Before rest parameters existed, JavaScript provided a special <code>arguments</code> object inside every function (not arrow functions). It is array-like but not a real array. Modern code should prefer rest parameters.</p>",
    examples: [
      { title: "Default and rest parameters", code: "// Default parameter\nfunction greet(name = 'Student') {\n  console.log('Hello, ' + name);\n}\ngreet('Pranav'); // Hello, Pranav\ngreet();         // Hello, Student\n\n// Rest parameter\nfunction sum(...numbers) {\n  let total = 0;\n  for (let num of numbers) {\n    total += num;\n  }\n  return total;\n}\nconsole.log(sum(1, 2, 3));       // 6\nconsole.log(sum(10, 20, 30, 40)); // 100" },
      { title: "Combining regular and rest parameters", code: "function introduce(greeting, ...names) {\n  for (let name of names) {\n    console.log(greeting + ', ' + name + '!');\n  }\n}\n\nintroduce('Hello', 'Pranav', 'Riya', 'Arjun');\n// Hello, Pranav!\n// Hello, Riya!\n// Hello, Arjun!" }
    ],
    quickRef: [
      { syntax: "function f(a = 10)", desc: "Default parameter — used if no argument is passed" },
      { syntax: "function f(...args)", desc: "Rest parameter — collects remaining arguments into an array" },
      { syntax: "arguments", desc: "Legacy array-like object of all passed arguments" }
    ],
    miniQuiz: [
      { q: "What value does a parameter have if no argument is passed and there's no default?", options: ["0", "null", "undefined", "Error"], correct: 2, explanation: "If no argument is passed and there's no default value, the parameter is undefined." },
      { q: "Where must the rest parameter appear?", options: ["First", "Anywhere", "Last", "Middle"], correct: 2, explanation: "The rest parameter (...args) must be the last parameter in the function definition." },
      { q: "What type is the rest parameter inside the function?", options: ["Object", "String", "Array", "Arguments object"], correct: 2, explanation: "The rest parameter gathers all remaining arguments into a real Array." }
    ]
  },
  // ============ LECTURE 11 ============
  {
    id: 11, unit: 1, title: "Scope & Call by Value vs Call by Reference",
    clo: "CLO03", difficulty: "Intermediate", readTime: "10 min",
    theory: "<h3>Global Scope</h3><p>Variables declared outside any function or block are in the global scope. They can be accessed from anywhere in your program. In the browser, global variables become properties of the <code>window</code> object.</p><h3>Local / Function Scope</h3><p>Variables declared inside a function (with <code>var</code>, <code>let</code>, or <code>const</code>) are local to that function. They cannot be accessed from outside.</p><h3>Block Scope</h3><p>Variables declared with <code>let</code> or <code>const</code> inside a block <code>{}</code> (if, for, while, etc.) are only accessible within that block. <code>var</code> ignores blocks and is only scoped to functions.</p><h3>Call by Value (Primitives)</h3><p>When you pass a primitive value (number, string, boolean, etc.) to a function, a <strong>copy</strong> of that value is passed. Changing the parameter inside the function does not affect the original variable.</p><h3>Call by Reference (Objects)</h3><p>When you pass an object or array to a function, the <strong>reference</strong> (memory address) is passed, not a copy. Changing the object's properties inside the function <em>does</em> affect the original object.</p><div class='analogy-box'><strong>Analogy:</strong> Call by value is like giving someone a photocopy of a document — they can scribble on it, but your original is safe. Call by reference is like giving someone your actual document — any changes they make will be on your original.</div>",
    examples: [
      { title: "Scope demonstration", code: "let globalVar = 'I am global';\n\nfunction testScope() {\n  let localVar = 'I am local';\n  console.log(globalVar);  // I am global (accessible)\n  console.log(localVar);   // I am local\n\n  if (true) {\n    let blockVar = 'I am in a block';\n    var funcVar = 'I leak out of blocks';\n    console.log(blockVar); // I am in a block\n  }\n\n  // console.log(blockVar); // Error: not defined\n  console.log(funcVar); // I leak out of blocks (var ignores blocks)\n}\ntestScope();\n// console.log(localVar); // Error: not defined" },
      { title: "Call by value vs call by reference", code: "// Call by Value — primitives\nlet num = 10;\nfunction changeNum(n) {\n  n = 99;\n  console.log('Inside:', n); // 99\n}\nchangeNum(num);\nconsole.log('Outside:', num); // 10 (unchanged!)\n\n// Call by Reference — objects\nlet person = { name: 'Pranav' };\nfunction changeName(obj) {\n  obj.name = 'Changed!';\n  console.log('Inside:', obj.name); // Changed!\n}\nchangeName(person);\nconsole.log('Outside:', person.name); // Changed! (affected!)" }
    ],
    quickRef: [
      { syntax: "Global scope", desc: "Accessible everywhere in the program" },
      { syntax: "Function scope", desc: "Accessible only inside the function" },
      { syntax: "Block scope (let/const)", desc: "Accessible only inside the {} block" },
      { syntax: "Primitives → by value", desc: "A copy is passed; original is safe" },
      { syntax: "Objects → by reference", desc: "The reference is passed; original can be modified" }
    ],
    miniQuiz: [
      { q: "What happens when you modify an object passed to a function?", options: ["Nothing, it's a copy", "The original object is modified", "An error is thrown", "A new object is created"], correct: 1, explanation: "Objects are passed by reference, so modifying properties inside the function affects the original object." },
      { q: "Which keyword ignores block scope?", options: ["let", "const", "var", "All of them"], correct: 2, explanation: "var is function-scoped, not block-scoped. It ignores blocks like if and for, leaking into the surrounding function." },
      { q: "What is call by value?", options: ["Passing the memory address", "Passing a copy of the value", "Passing the variable name", "Passing by default parameter"], correct: 1, explanation: "Call by value means a copy of the value is passed to the function. Changes inside the function don't affect the original." }
    ]
  },
  // ============ LECTURE 12 ============
  {
    id: 12, unit: 1, title: "Recursive Functions",
    clo: "CLO03", difficulty: "Intermediate", readTime: "10 min",
    theory: "<h3>What Is Recursion?</h3><p>Recursion is when a function calls itself. It is an alternative to loops for solving problems that can be broken down into smaller, identical sub-problems.</p><h3>Two Essential Parts</h3><ul><li><strong>Base case:</strong> The condition where the function stops calling itself. Without this, you get infinite recursion (like an infinite loop), which crashes the program with a stack overflow.</li><li><strong>Recursive case:</strong> The part where the function calls itself with a simpler version of the problem, moving closer to the base case.</li></ul><div class='analogy-box'><strong>Analogy:</strong> Imagine you are climbing stairs and want to know the total count. Recursion is like saying: \"The number of stairs is 1 + the number of stairs above me.\" You keep asking until you reach the top (base case), then count back down.</div><h3>How the Call Stack Works</h3><p>Each recursive call adds a new frame to the call stack. When the base case is reached, the stack starts unwinding — each function returns its result to the one that called it.</p><h3>Common Use Cases</h3><ul><li>Factorial calculation</li><li>Fibonacci sequence</li><li>Traversing tree-like structures (DOM, file systems)</li><li>Solving problems like Tower of Hanoi</li></ul>",
    examples: [
      { title: "Factorial using recursion", code: "function factorial(n) {\n  // Base case\n  if (n <= 1) return 1;\n  // Recursive case\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // 120\n// How it works:\n// factorial(5) = 5 * factorial(4)\n// factorial(4) = 4 * factorial(3)\n// factorial(3) = 3 * factorial(2)\n// factorial(2) = 2 * factorial(1)\n// factorial(1) = 1 (base case)\n// = 5 * 4 * 3 * 2 * 1 = 120" },
      { title: "Countdown and sum using recursion", code: "// Recursive countdown\nfunction countdown(n) {\n  if (n <= 0) {\n    console.log('Done!');\n    return;\n  }\n  console.log(n);\n  countdown(n - 1);\n}\ncountdown(5); // 5, 4, 3, 2, 1, Done!\n\n// Sum of numbers from 1 to n\nfunction sum(n) {\n  if (n <= 1) return n;\n  return n + sum(n - 1);\n}\nconsole.log(sum(10)); // 55" }
    ],
    quickRef: [
      { syntax: "Base case", desc: "Condition that stops the recursion" },
      { syntax: "Recursive case", desc: "Function calls itself with a simpler input" },
      { syntax: "Stack overflow", desc: "Error from infinite recursion (no base case)" }
    ],
    miniQuiz: [
      { q: "What happens without a base case in recursion?", options: ["The function returns 0", "Infinite recursion / stack overflow", "The function runs once", "Nothing happens"], correct: 1, explanation: "Without a base case, the function calls itself forever, filling up the call stack until it overflows and crashes." },
      { q: "What is factorial(0)?", options: ["0", "1", "undefined", "Error"], correct: 1, explanation: "By mathematical definition, 0! (factorial of 0) equals 1. This is the common base case for factorial functions." },
      { q: "What is the recursive case?", options: ["Where the function stops", "Where the function calls itself with simpler input", "The first line of the function", "The return type"], correct: 1, explanation: "The recursive case is where the function calls itself, passing a simpler version of the problem to move toward the base case." }
    ]
  },
  // ============ LECTURE 13 ============
  {
    id: 13, unit: 1, title: "Function Declarations vs Expressions",
    clo: "CLO04", difficulty: "Intermediate", readTime: "8 min",
    theory: "<h3>Function Declaration</h3><p>A function declaration defines a named function using the <code>function</code> keyword. It is hoisted completely, meaning you can call it before the line where it appears in your code.</p><h3>Function Expression</h3><p>A function expression creates a function and assigns it to a variable. The function can be named or anonymous. Function expressions are <strong>not hoisted</strong> — you cannot call them before the assignment.</p><h3>Named vs Anonymous</h3><p>In a function expression, you can include a name or leave it anonymous. Named expressions are useful for recursion and better error stack traces. Anonymous functions are common in callbacks.</p><div class='analogy-box'><strong>Key Difference:</strong> Function declarations are like registering a company name before opening — it is recognized immediately. Function expressions are like opening a pop-up shop — it only exists once you set it up at that location.</div>",
    examples: [
      { title: "Declaration vs Expression", code: "// Function Declaration — hoisted\nconsole.log(add(2, 3)); // 5 — works before declaration!\nfunction add(a, b) {\n  return a + b;\n}\n\n// Function Expression — NOT hoisted\ntry {\n  console.log(multiply(2, 3)); // Error!\n} catch(e) {\n  console.log('Error:', e.message);\n}\nconst multiply = function(a, b) {\n  return a * b;\n};\nconsole.log(multiply(2, 3)); // 6" },
      { title: "Anonymous vs named expressions", code: "// Anonymous function expression\nconst greet = function(name) {\n  return 'Hello, ' + name;\n};\n\n// Named function expression\nconst factorial = function fact(n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1); // can call itself by name\n};\n\nconsole.log(greet('Pranav'));   // Hello, Pranav\nconsole.log(factorial(5));     // 120" }
    ],
    quickRef: [
      { syntax: "function name() {}", desc: "Declaration — hoisted, callable anywhere" },
      { syntax: "const fn = function() {}", desc: "Expression — not hoisted" },
      { syntax: "const fn = function name() {}", desc: "Named expression — useful for recursion" }
    ],
    miniQuiz: [
      { q: "Can you call a function declaration before it appears in code?", options: ["Yes", "No", "Only with var", "Only in strict mode"], correct: 0, explanation: "Function declarations are fully hoisted — they can be called before they appear in your code." },
      { q: "What is a function expression?", options: ["A function with the function keyword at start of line", "A function assigned to a variable", "A function that returns an expression", "A mathematical expression in a function"], correct: 1, explanation: "A function expression creates a function and assigns it to a variable using const, let, or var." },
      { q: "Are function expressions hoisted?", options: ["Yes, fully", "Yes, but the value is undefined", "No, they are not hoisted", "Only if named"], correct: 2, explanation: "Function expressions are not hoisted. Using const/let, you get a ReferenceError if you call them before the declaration line." }
    ]
  },
  // ============ LECTURE 14 ============
  {
    id: 14, unit: 1, title: "Arrow Functions",
    clo: "CLO04", difficulty: "Intermediate", readTime: "9 min",
    theory: "<h3>Arrow Function Syntax (ES6)</h3><p>Arrow functions provide a shorter syntax for writing functions using the <code>=></code> arrow. They are always anonymous and are commonly used for callbacks and short functions.</p><h3>Syntax Variations</h3><ul><li><strong>Multiple parameters:</strong> <code>(a, b) => a + b</code></li><li><strong>Single parameter (no parens needed):</strong> <code>x => x * 2</code></li><li><strong>No parameters:</strong> <code>() => console.log('hi')</code></li><li><strong>Multi-line body (needs braces and return):</strong> <code>(a, b) => { const sum = a + b; return sum; }</code></li></ul><h3>Implicit Return</h3><p>If the arrow function body is a single expression (no curly braces), the result is automatically returned. This is called implicit return.</p><h3>Lexical <code>this</code></h3><p>The most important difference: arrow functions do not have their own <code>this</code>. They inherit <code>this</code> from the surrounding scope (lexical this). This makes them ideal for callbacks inside methods, but unsuitable as object methods themselves.</p><div class='analogy-box'><strong>Analogy:</strong> Regular functions are like employees with their own office (their own this). Arrow functions are like remote workers who use their home office (the parent's this).</div>",
    examples: [
      { title: "Arrow function syntax", code: "// Regular function\nconst add = function(a, b) {\n  return a + b;\n};\n\n// Arrow function (concise)\nconst addArrow = (a, b) => a + b;\n\n// Single parameter — no parentheses needed\nconst double = x => x * 2;\n\n// No parameters\nconst sayHi = () => 'Hello!';\n\nconsole.log(addArrow(5, 3)); // 8\nconsole.log(double(7));      // 14\nconsole.log(sayHi());        // Hello!" },
      { title: "Lexical this in arrow functions", code: "const timer = {\n  seconds: 0,\n  // Regular function has its own 'this'\n  startRegular: function() {\n    const self = this; // must save reference\n    setTimeout(function() {\n      self.seconds++;\n      console.log('Regular:', self.seconds);\n    }, 100);\n  },\n  // Arrow inherits 'this' from parent\n  startArrow: function() {\n    setTimeout(() => {\n      this.seconds++;\n      console.log('Arrow:', this.seconds);\n    }, 200);\n  }\n};\ntimer.startRegular();\ntimer.startArrow();" }
    ],
    quickRef: [
      { syntax: "(a, b) => a + b", desc: "Arrow with implicit return" },
      { syntax: "x => x * 2", desc: "Single param, no parens needed" },
      { syntax: "() => { ... }", desc: "No params, explicit body" },
      { syntax: "Lexical this", desc: "Arrow inherits this from parent scope" }
    ],
    miniQuiz: [
      { q: "What is implicit return in arrow functions?", options: ["Using the return keyword", "Automatic return when body is a single expression without braces", "Returning undefined", "Returning the last variable"], correct: 1, explanation: "When an arrow function has no curly braces and just a single expression, that expression's result is automatically returned." },
      { q: "Do arrow functions have their own `this`?", options: ["Yes", "No — they inherit from the parent scope", "Only in strict mode", "Only when using bind()"], correct: 1, explanation: "Arrow functions do not have their own this — they use the this value from the enclosing lexical scope." },
      { q: "Which is correct arrow function syntax for no parameters?", options: ["=> 'hello'", "() => 'hello'", "_ => 'hello'", "Both B and C work"], correct: 3, explanation: "() => 'hello' is the standard syntax. _ => 'hello' also works (using _ as a throwaway parameter), though () is more common." }
    ]
  },
  // ============ LECTURE 15 ============
  {
    id: 15, unit: 1, title: "Scope — Global, Function, Block",
    clo: "CLO04", difficulty: "Intermediate", readTime: "9 min",
    theory: "<h3>Scope Chain</h3><p>When JavaScript looks up a variable, it starts in the current scope and moves outward through parent scopes until it finds the variable or reaches the global scope. This is called the scope chain.</p><h3>Global Scope</h3><p>Variables declared at the top level (outside any function or block) are globally scoped. They are accessible everywhere but can cause naming conflicts and are considered bad practice for large programs.</p><h3>Function Scope</h3><p>Each function creates its own scope. Variables declared with <code>var</code>, <code>let</code>, or <code>const</code> inside a function are not accessible outside it.</p><h3>Block Scope (let and const)</h3><p>A block is any code within <code>{}</code> — if statements, loops, etc. Variables declared with <code>let</code> and <code>const</code> are confined to their block. <code>var</code> ignores block boundaries.</p><h3>Defining Scope of let and const</h3><p><code>let</code> and <code>const</code> follow identical scoping rules (block scope). The difference is that <code>let</code> allows reassignment while <code>const</code> does not. Both sit in a Temporal Dead Zone (TDZ) from the start of the block until the declaration is reached.</p><div class='analogy-box'><strong>Analogy:</strong> Scope is like rooms in a building. You can see everything in your room (local scope) and the lobby (global scope), but you cannot see into someone else's room. Block scope is like a closet inside your room — things inside the closet are hidden even from the rest of the room (when using let/const).</div>",
    examples: [
      { title: "Scope chain in action", code: "const global = 'I am global';\n\nfunction outer() {\n  const outerVar = 'I am outer';\n\n  function inner() {\n    const innerVar = 'I am inner';\n    console.log(innerVar);  // own scope\n    console.log(outerVar);  // parent scope\n    console.log(global);    // global scope\n  }\n  inner();\n  // console.log(innerVar); // Error!\n}\nouter();" },
      { title: "var vs let in loops", code: "// var — shares the same variable across iterations\nfor (var i = 0; i < 3; i++) {\n  setTimeout(function() {\n    console.log('var i:', i); // all print 3!\n  }, 100);\n}\n\n// let — each iteration gets its own variable\nfor (let j = 0; j < 3; j++) {\n  setTimeout(function() {\n    console.log('let j:', j); // prints 0, 1, 2\n  }, 200);\n}" }
    ],
    quickRef: [
      { syntax: "Scope chain", desc: "JS searches current → parent → global for variables" },
      { syntax: "Global scope", desc: "Top-level; accessible everywhere" },
      { syntax: "Function scope", desc: "var, let, const are local to the function" },
      { syntax: "Block scope", desc: "let and const are local to the {} block" }
    ],
    miniQuiz: [
      { q: "What is the scope chain?", options: ["A linked list data structure", "JavaScript's way of searching for variables from inner to outer scopes", "A chain of function calls", "The order in which scripts load"], correct: 1, explanation: "The scope chain is how JS resolves variable lookups — it starts in the current scope and moves outward through each parent scope to the global scope." },
      { q: "Why does `var i` in a loop with setTimeout print the same value?", options: ["setTimeout is broken", "var is function-scoped, so all iterations share the same i", "var creates a new copy each time", "It's a JavaScript bug"], correct: 1, explanation: "var is function-scoped, not block-scoped. All iterations of the loop share the same variable i, which is 3 by the time the timeouts run." },
      { q: "What is the Temporal Dead Zone?", options: ["A scope where no variables exist", "The period between block start and let/const declaration where the variable cannot be accessed", "A time delay in JavaScript", "Global scope without variables"], correct: 1, explanation: "The TDZ is the zone from the start of a block until a let or const declaration is encountered. Accessing the variable in this zone throws a ReferenceError." }
    ]
  },
  // ============ LECTURE 16 ============
  {
    id: 16, unit: 1, title: "Closures",
    clo: "CLO04", difficulty: "Advanced", readTime: "12 min",
    theory: "<h3>What Is a Closure?</h3><p>A closure is a function that remembers and can access variables from its outer (enclosing) scope, even after the outer function has finished executing. This is one of the most powerful concepts in JavaScript.</p><h3>How Closures Work</h3><p>When a function is created inside another function, the inner function forms a closure. It captures a reference to the outer function's variables. Even after the outer function returns, the inner function still has access to those variables.</p><div class='analogy-box'><strong>Analogy:</strong> A closure is like a backpack. When you leave school (outer function finishes), you still carry your backpack (the variables) with you. The backpack does not disappear just because you left school.</div><h3>Why Closures Are Useful</h3><ul><li><strong>Data privacy:</strong> Create private variables that cannot be accessed directly from outside.</li><li><strong>State persistence:</strong> Remember values between function calls without global variables.</li><li><strong>Function factories:</strong> Create specialized functions from general templates.</li><li><strong>Callbacks:</strong> Event handlers and setTimeout callbacks that access outer data.</li></ul><h3>Common Pitfall: Closures in Loops</h3><p>When using <code>var</code> in loops, all closures share the same variable. Use <code>let</code> to create a new variable per iteration, or use an IIFE (Immediately Invoked Function Expression).</p>",
    examples: [
      { title: "Basic closure", code: "function createGreeter(greeting) {\n  // This inner function is a closure\n  return function(name) {\n    console.log(greeting + ', ' + name + '!');\n  };\n}\n\nconst hello = createGreeter('Hello');\nconst hi = createGreeter('Hi');\n\nhello('Pranav'); // Hello, Pranav!\nhi('Riya');      // Hi, Riya!\n// greeting is still accessible even though createGreeter finished" },
      { title: "Closure for private counter", code: "function createCounter() {\n  let count = 0; // private variable\n\n  return {\n    increment: function() { count++; return count; },\n    decrement: function() { count--; return count; },\n    getCount: function() { return count; }\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.decrement()); // 1\nconsole.log(counter.getCount());  // 1\n// console.log(count); // Error! count is private" }
    ],
    quickRef: [
      { syntax: "Closure", desc: "Function that retains access to its outer scope's variables" },
      { syntax: "Data privacy", desc: "Use closures to create private variables" },
      { syntax: "Factory function", desc: "Returns a customized function using closures" }
    ],
    miniQuiz: [
      { q: "What is a closure?", options: ["A function that calls itself", "A function that remembers variables from its outer scope", "A way to close a browser tab", "A method to end a loop"], correct: 1, explanation: "A closure is a function that retains access to variables from its enclosing scope, even after the outer function has finished executing." },
      { q: "Why are closures useful?", options: ["They make code run faster", "They allow data privacy and state persistence", "They prevent all errors", "They replace all loops"], correct: 1, explanation: "Closures enable data privacy (private variables), state persistence between function calls, and function factories." },
      { q: "What happens to outer variables when the outer function returns?", options: ["They are deleted", "They persist if referenced by an inner function (closure)", "They become global", "They become undefined"], correct: 1, explanation: "If an inner function (closure) references outer variables, those variables persist in memory even after the outer function returns." }
    ]
  },
  // ============ LECTURE 17 ============
  {
    id: 17, unit: 1, title: "Higher-Order Functions — map, filter",
    clo: "CLO05", difficulty: "Intermediate", readTime: "10 min",
    theory: "<h3>What Are Higher-Order Functions?</h3><p>A higher-order function is a function that either takes another function as an argument, or returns a function. Array methods like <code>map</code>, <code>filter</code>, and <code>reduce</code> are the most common higher-order functions in JavaScript.</p><h3>Array.map()</h3><p><code>map()</code> creates a new array by transforming each element of the original array. The callback function receives each element and returns the transformed value. The original array is not modified.</p><h3>Array.filter()</h3><p><code>filter()</code> creates a new array containing only the elements that pass a test (return <code>true</code> from the callback). Elements that return <code>false</code> are excluded.</p><div class='analogy-box'><strong>Analogy:</strong> <code>map()</code> is like a factory assembly line — each item goes through a transformation station and comes out changed. <code>filter()</code> is like a bouncer at a club — only items that meet the criteria get in; the rest are turned away.</div>",
    examples: [
      { title: "map() — transform array elements", code: "const numbers = [1, 2, 3, 4, 5];\n\n// Double each number\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// Create array of strings\nconst labels = numbers.map(n => 'Item ' + n);\nconsole.log(labels); // ['Item 1', 'Item 2', ...]\n\n// Original is unchanged\nconsole.log(numbers); // [1, 2, 3, 4, 5]" },
      { title: "filter() — keep matching elements", code: "const scores = [85, 42, 93, 67, 71, 55, 98];\n\n// Keep only passing scores (>= 60)\nconst passing = scores.filter(score => score >= 60);\nconsole.log(passing); // [85, 93, 67, 71, 98]\n\n// Keep even numbers\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens); // [2, 4, 6, 8]\n\n// Filter objects\nconst students = [\n  { name: 'Pranav', grade: 'A' },\n  { name: 'Riya', grade: 'B' },\n  { name: 'Arjun', grade: 'A' }\n];\nconst topStudents = students.filter(s => s.grade === 'A');\nconsole.log(topStudents);\n// [{ name: 'Pranav', grade: 'A' }, { name: 'Arjun', grade: 'A' }]" }
    ],
    quickRef: [
      { syntax: "arr.map(fn)", desc: "Transform each element, return new array" },
      { syntax: "arr.filter(fn)", desc: "Keep elements where fn returns true" },
      { syntax: "Higher-order function", desc: "A function that takes or returns another function" }
    ],
    miniQuiz: [
      { q: "Does map() modify the original array?", options: ["Yes", "No — it returns a new array", "Only if you reassign it", "It depends on the callback"], correct: 1, explanation: "map() always returns a new array with transformed elements. The original array is never modified." },
      { q: "What does filter() return?", options: ["A single value", "A boolean", "A new array with elements that pass the test", "The original array, modified"], correct: 2, explanation: "filter() returns a new array containing only the elements for which the callback function returned true." },
      { q: "What makes a function 'higher-order'?", options: ["It is defined at the top of the file", "It takes or returns another function", "It uses recursion", "It has more than 3 parameters"], correct: 1, explanation: "A higher-order function is one that either accepts a function as an argument or returns a function as its result." }
    ]
  },
  // ============ LECTURE 18 ============
  {
    id: 18, unit: 1, title: "Higher-Order Functions — reduce, sort",
    clo: "CLO05", difficulty: "Intermediate", readTime: "11 min",
    theory: "<h3>Array.reduce()</h3><p><code>reduce()</code> processes an array and reduces it to a single value. It takes a callback with two main parameters: the <strong>accumulator</strong> (running result) and the <strong>current element</strong>. You also provide an initial value for the accumulator.</p><h3>How reduce Works</h3><p>On each iteration, the callback receives the accumulator (previous result) and the current element. It returns the new accumulator value. After all elements are processed, the final accumulator is returned.</p><h3>Array.sort()</h3><p><code>sort()</code> sorts the elements of an array <strong>in place</strong> (mutates the original). By default, it sorts elements as strings (alphabetically). For numbers, you must provide a comparator function.</p><h3>Custom Comparator</h3><p>The comparator function receives two elements (a, b). Return a negative number to sort a before b, positive to sort b before a, and 0 if they are equal.</p><div class='analogy-box'><strong>Analogy:</strong> <code>reduce()</code> is like a snowball rolling downhill — it starts small (initial value) and accumulates more snow (data) with each step. <code>sort()</code> is like arranging books on a shelf — by default alphabetically, but you can choose your own ordering rule.</div>",
    examples: [
      { title: "reduce() — accumulate to a single value", code: "const numbers = [1, 2, 3, 4, 5];\n\n// Sum all numbers\nconst sum = numbers.reduce((acc, cur) => acc + cur, 0);\nconsole.log(sum); // 15\n\n// Find maximum value\nconst max = numbers.reduce((acc, cur) => cur > acc ? cur : acc, numbers[0]);\nconsole.log(max); // 5\n\n// Count occurrences\nconst fruits = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];\nconst counts = fruits.reduce((acc, fruit) => {\n  acc[fruit] = (acc[fruit] || 0) + 1;\n  return acc;\n}, {});\nconsole.log(counts); // { apple: 3, banana: 2, cherry: 1 }" },
      { title: "sort() — default and custom", code: "// Default sort (alphabetical, as strings)\nconst names = ['Charlie', 'Alice', 'Bob'];\nnames.sort();\nconsole.log(names); // ['Alice', 'Bob', 'Charlie']\n\n// Numeric sort — MUST use comparator!\nconst nums = [10, 5, 40, 25, 1];\nnums.sort((a, b) => a - b); // ascending\nconsole.log(nums); // [1, 5, 10, 25, 40]\n\nnums.sort((a, b) => b - a); // descending\nconsole.log(nums); // [40, 25, 10, 5, 1]\n\n// Sort objects by property\nconst students = [\n  { name: 'Pranav', score: 85 },\n  { name: 'Riya', score: 92 },\n  { name: 'Arjun', score: 78 }\n];\nstudents.sort((a, b) => b.score - a.score);\nconsole.log(students[0].name); // Riya (highest score)" }
    ],
    quickRef: [
      { syntax: "arr.reduce((acc, cur) => ..., init)", desc: "Reduce array to single value" },
      { syntax: "arr.sort()", desc: "Sort alphabetically (mutates array)" },
      { syntax: "arr.sort((a,b) => a - b)", desc: "Sort numbers ascending" },
      { syntax: "arr.sort((a,b) => b - a)", desc: "Sort numbers descending" }
    ],
    miniQuiz: [
      { q: "What does reduce() return?", options: ["An array", "An object always", "A single accumulated value", "A boolean"], correct: 2, explanation: "reduce() processes all elements and returns a single accumulated value — it could be a number, string, object, or any type." },
      { q: "Why does [10, 5, 1].sort() give [1, 10, 5]?", options: ["It is broken", "Default sort converts to strings, and '10' comes before '5' alphabetically", "It sorts by number of digits", "It is random"], correct: 1, explanation: "Default sort() converts elements to strings. The string '10' starts with '1', which comes before '5' alphabetically." },
      { q: "Does sort() modify the original array?", options: ["Yes — it sorts in place", "No — it returns a new array", "Only with a comparator", "Only for strings"], correct: 0, explanation: "sort() modifies the original array in place (mutates it) and also returns the sorted array." }
    ]
  },
  // ============ LECTURE 19 ============
  {
    id: 19, unit: 2, title: "Array Destructuring",
    clo: "CLO06", difficulty: "Intermediate", readTime: "8 min",
    theory: "<h3>What Is Destructuring?</h3><p>Destructuring is an ES6 syntax that lets you unpack values from arrays or properties from objects into individual variables. It makes your code cleaner and more readable.</p><h3>Array Destructuring</h3><p>Instead of accessing array elements by index, you can extract them directly into named variables using square bracket syntax on the left side of an assignment.</p><h3>Skipping Elements</h3><p>You can skip elements by leaving empty commas. This is useful when you only need certain positions.</p><h3>Rest Pattern in Destructuring</h3><p>Use <code>...</code> to collect remaining elements into a new array.</p><h3>Default Values</h3><p>You can provide default values that are used when the corresponding element is <code>undefined</code>.</p><h3>Swapping Variables</h3><p>Destructuring provides an elegant way to swap two variables without a temporary variable.</p><div class='analogy-box'><strong>Analogy:</strong> Destructuring is like opening a gift box and immediately labeling each item. Instead of saying \"the first thing in the box,\" you give it a name right away.</div>",
    examples: [
      { title: "Basic array destructuring", code: "const colors = ['red', 'green', 'blue', 'yellow'];\n\n// Without destructuring\nconst first = colors[0];\nconst second = colors[1];\n\n// With destructuring\nconst [a, b, c, d] = colors;\nconsole.log(a); // red\nconsole.log(b); // green\nconsole.log(c); // blue\n\n// Skip elements\nconst [, , third] = colors;\nconsole.log(third); // blue\n\n// Rest pattern\nconst [head, ...rest] = colors;\nconsole.log(head); // red\nconsole.log(rest); // ['green', 'blue', 'yellow']" },
      { title: "Default values and swapping", code: "// Default values\nconst [x = 10, y = 20, z = 30] = [1, 2];\nconsole.log(x); // 1\nconsole.log(y); // 2\nconsole.log(z); // 30 (default used)\n\n// Swapping variables\nlet p = 'hello';\nlet q = 'world';\n[p, q] = [q, p];\nconsole.log(p); // world\nconsole.log(q); // hello\n\n// Destructuring from function return\nfunction getCoords() {\n  return [10, 20];\n}\nconst [lat, lng] = getCoords();\nconsole.log(lat, lng); // 10 20" }
    ],
    quickRef: [
      { syntax: "const [a, b] = arr", desc: "Extract first two elements into variables" },
      { syntax: "const [, , c] = arr", desc: "Skip elements with empty commas" },
      { syntax: "const [first, ...rest] = arr", desc: "First element + rest in array" },
      { syntax: "[a, b] = [b, a]", desc: "Swap two variables" }
    ],
    miniQuiz: [
      { q: "What does `const [a, , b] = [1, 2, 3]` assign to b?", options: ["2", "3", "undefined", "Error"], correct: 1, explanation: "The empty comma skips the second element (2), so b gets the third element (3)." },
      { q: "How do you swap variables a and b using destructuring?", options: ["swap(a, b)", "[a, b] = [b, a]", "a = b; b = a", "const temp = a; a = b; b = temp"], correct: 1, explanation: "[a, b] = [b, a] uses destructuring assignment to swap the values of a and b in a single line." },
      { q: "What does the rest pattern (...) do in destructuring?", options: ["Collects remaining elements into an array", "Removes elements", "Spreads the array", "Creates a copy"], correct: 0, explanation: "The rest pattern (...variableName) collects all remaining undestructured elements into a new array." }
    ]
  },
  // ============ LECTURE 20 ============
  {
    id: 20, unit: 2, title: "Object Destructuring",
    clo: "CLO06", difficulty: "Intermediate", readTime: "9 min",
    theory: "<h3>Object Destructuring</h3><p>Object destructuring extracts properties from an object into variables. Unlike array destructuring (position-based), object destructuring is <strong>name-based</strong> — the variable names must match the property names.</p><h3>Renaming Variables</h3><p>You can rename a destructured property using the <code>propertyName: newName</code> syntax. This is especially useful when property names conflict with existing variables.</p><h3>Default Values</h3><p>Provide a default value using <code>=</code> after the variable name. It is used when the property is <code>undefined</code> or missing.</p><h3>Nested Destructuring</h3><p>You can destructure deeply nested objects by mirroring the object's structure in the destructuring pattern.</p><h3>Function Parameter Destructuring</h3><p>You can destructure objects directly in function parameters. This is very common and makes function calls more readable.</p>",
    examples: [
      { title: "Object destructuring with rename and default", code: "const student = {\n  name: 'Pranav',\n  age: 20,\n  course: 'FE-1',\n  university: 'Chitkara'\n};\n\n// Basic destructuring\nconst { name, age, course } = student;\nconsole.log(name);   // Pranav\nconsole.log(course); // FE-1\n\n// Rename variables\nconst { name: studentName, age: studentAge } = student;\nconsole.log(studentName); // Pranav\n\n// Default values\nconst { gpa = 'N/A', name: n } = student;\nconsole.log(gpa); // N/A (property doesn't exist)" },
      { title: "Nested and parameter destructuring", code: "// Nested destructuring\nconst user = {\n  id: 1,\n  profile: {\n    firstName: 'Pranav',\n    address: { city: 'Chandigarh', state: 'Punjab' }\n  }\n};\nconst { profile: { firstName, address: { city } } } = user;\nconsole.log(firstName); // Pranav\nconsole.log(city);      // Chandigarh\n\n// Function parameter destructuring\nfunction printUser({ name, age, course = 'Unknown' }) {\n  console.log(`${name}, ${age}, ${course}`);\n}\nprintUser({ name: 'Pranav', age: 20, course: 'FE-1' });\n// Pranav, 20, FE-1" }
    ],
    quickRef: [
      { syntax: "const { a, b } = obj", desc: "Extract properties into variables" },
      { syntax: "const { a: x } = obj", desc: "Extract and rename to x" },
      { syntax: "const { a = 10 } = obj", desc: "Default value if property is undefined" },
      { syntax: "function f({ a, b }) {}", desc: "Destructure in function params" }
    ],
    miniQuiz: [
      { q: "How do you rename a property during destructuring?", options: ["const { name = newName } = obj", "const { name: newName } = obj", "const { newName(name) } = obj", "const { name as newName } = obj"], correct: 1, explanation: "Use colon syntax: { propertyName: newVariableName } to rename during destructuring." },
      { q: "Is object destructuring position-based or name-based?", options: ["Position-based", "Name-based", "Both", "Neither"], correct: 1, explanation: "Object destructuring is name-based — the variable names must match the property names in the object." },
      { q: "What happens if a destructured property doesn't exist?", options: ["Error is thrown", "It is null", "It is undefined (or uses default if provided)", "The object is modified"], correct: 2, explanation: "If the property doesn't exist, the variable is undefined. If a default value is provided, that default is used instead." }
    ]
  },
  // ============ LECTURE 21 ============
  {
    id: 21, unit: 2, title: "Shallow Copy vs Deep Copy",
    clo: "CLO06", difficulty: "Intermediate", readTime: "10 min",
    theory: "<h3>Why Copying Matters</h3><p>Since objects and arrays are reference types, assigning one to another just copies the reference, not the data. Both variables then point to the same object in memory. Changing one affects the other.</p><h3>Shallow Copy</h3><p>A shallow copy creates a new object/array and copies the top-level properties. However, nested objects are still shared by reference. Methods include:</p><ul><li><code>Object.assign({}, obj)</code></li><li>Spread operator: <code>{...obj}</code> or <code>[...arr]</code></li><li><code>Array.from(arr)</code> or <code>arr.slice()</code></li></ul><h3>Deep Copy</h3><p>A deep copy creates a completely independent copy — all nested objects are also copied. The simplest method is <code>JSON.parse(JSON.stringify(obj))</code>, though it has limitations (loses functions, undefined, Date objects become strings).</p><p>Modern JS provides <code>structuredClone(obj)</code> for a proper deep copy.</p><div class='analogy-box'><strong>Analogy:</strong> A shallow copy is like photocopying the first page of a book but keeping sticky notes that point to the original chapters. A deep copy is like reprinting the entire book — everything is independent.</div>",
    examples: [
      { title: "Reference vs shallow vs deep copy", code: "// Reference copy (no copy at all!)\nconst original = { name: 'Pranav', scores: [90, 85] };\nconst ref = original;\nref.name = 'Changed';\nconsole.log(original.name); // Changed! (same object)\n\n// Shallow copy with spread\nconst shallow = { ...original };\nshallow.name = 'Shallow';\nconsole.log(original.name); // Changed (name is top-level, OK)\nshallow.scores.push(70);\nconsole.log(original.scores); // [90, 85, 70] — nested is shared!\n\n// Deep copy with JSON\nconst deep = JSON.parse(JSON.stringify(original));\ndeep.scores.push(100);\nconsole.log(original.scores.length); // 3 (not affected)\nconsole.log(deep.scores.length);     // 4" },
      { title: "Array copying methods", code: "const arr = [1, 2, [3, 4]];\n\n// Spread (shallow)\nconst spreadCopy = [...arr];\nspreadCopy[0] = 99;\nconsole.log(arr[0]); // 1 (top-level OK)\nspreadCopy[2].push(5);\nconsole.log(arr[2]); // [3, 4, 5] — nested shared!\n\n// slice (shallow)\nconst sliceCopy = arr.slice();\nconsole.log(sliceCopy); // [1, 2, [3, 4, 5]]\n\n// structuredClone (deep copy, modern)\nconst deepCopy = structuredClone(arr);\ndeepCopy[2].push(99);\nconsole.log(arr[2].length); // still 3" }
    ],
    quickRef: [
      { syntax: "{...obj}", desc: "Shallow copy an object (spread)" },
      { syntax: "[...arr]", desc: "Shallow copy an array (spread)" },
      { syntax: "JSON.parse(JSON.stringify(obj))", desc: "Deep copy (with limitations)" },
      { syntax: "structuredClone(obj)", desc: "Modern deep copy (full support)" }
    ],
    miniQuiz: [
      { q: "What is a shallow copy?", options: ["A copy that only copies the reference", "A copy that duplicates top-level properties but shares nested references", "A complete independent copy", "A copy that only works with arrays"], correct: 1, explanation: "A shallow copy creates a new object with copies of top-level properties, but nested objects/arrays are still shared by reference." },
      { q: "What is a limitation of JSON.parse(JSON.stringify())?", options: ["It is slow", "It cannot copy strings", "It loses functions, undefined, and special types", "It only works with arrays"], correct: 2, explanation: "JSON stringify/parse drops functions, undefined values, Symbol keys, and converts Dates to strings. It also cannot handle circular references." },
      { q: "What does structuredClone() do?", options: ["Shallow copy", "Deep copy with full support", "Clones the DOM", "Copies CSS styles"], correct: 1, explanation: "structuredClone() creates a proper deep copy of an object, handling nested structures, Dates, Maps, Sets, and more." }
    ]
  },
  // ============ LECTURE 22 ============
  {
    id: 22, unit: 2, title: "JSON — stringify and parse",
    clo: "CLO06", difficulty: "Beginner", readTime: "8 min",
    theory: "<h3>What Is JSON?</h3><p>JSON (JavaScript Object Notation) is a lightweight text format for storing and exchanging data. It looks like a JavaScript object but is actually a string. JSON is the most common format for sending data between a web server and a browser.</p><h3>JSON Rules</h3><ul><li>Keys must be strings in double quotes</li><li>Values can be: strings, numbers, booleans, null, arrays, or objects</li><li>No functions, undefined, comments, or trailing commas allowed</li></ul><h3>JSON.stringify()</h3><p>Converts a JavaScript object or value into a JSON string. Useful for storing data in localStorage, sending data to a server, or logging complex objects.</p><h3>JSON.parse()</h3><p>Converts a JSON string back into a JavaScript object. This is the reverse of stringify. If the string is not valid JSON, it throws a SyntaxError.</p><div class='analogy-box'><strong>Analogy:</strong> <code>stringify()</code> is like packing a suitcase — you organize your items (data) into a standard format for travel (string). <code>parse()</code> is like unpacking — you take items out of the suitcase and put them back where they belong (object).</div>",
    examples: [
      { title: "JSON.stringify() and JSON.parse()", code: "const student = {\n  name: 'Pranav',\n  age: 20,\n  courses: ['FE-1', 'DSA'],\n  active: true\n};\n\n// Convert to JSON string\nconst jsonStr = JSON.stringify(student);\nconsole.log(jsonStr);\n// '{\"name\":\"Pranav\",\"age\":20,\"courses\":[\"FE-1\",\"DSA\"],\"active\":true}'\nconsole.log(typeof jsonStr); // string\n\n// Convert back to object\nconst parsed = JSON.parse(jsonStr);\nconsole.log(parsed.name);    // Pranav\nconsole.log(parsed.courses); // ['FE-1', 'DSA']\nconsole.log(typeof parsed);  // object" },
      { title: "localStorage with JSON", code: "// Saving to localStorage\nconst settings = { theme: 'dark', fontSize: 16 };\nlocalStorage.setItem('settings', JSON.stringify(settings));\n\n// Reading from localStorage\nconst saved = localStorage.getItem('settings');\nconst parsed = JSON.parse(saved);\nconsole.log(parsed.theme);    // dark\nconsole.log(parsed.fontSize); // 16\n\n// Pretty-print JSON\nconst pretty = JSON.stringify(settings, null, 2);\nconsole.log(pretty);\n// {\n//   \"theme\": \"dark\",\n//   \"fontSize\": 16\n// }" }
    ],
    quickRef: [
      { syntax: "JSON.stringify(obj)", desc: "Object → JSON string" },
      { syntax: "JSON.parse(str)", desc: "JSON string → Object" },
      { syntax: "JSON.stringify(obj, null, 2)", desc: "Pretty-print with 2-space indent" }
    ],
    miniQuiz: [
      { q: "What type does JSON.stringify() return?", options: ["Object", "Array", "String", "Number"], correct: 2, explanation: "JSON.stringify() always returns a string — a text representation of the JavaScript value." },
      { q: "What happens if you JSON.parse() an invalid string?", options: ["Returns null", "Returns undefined", "Throws SyntaxError", "Returns empty object"], correct: 2, explanation: "If the string is not valid JSON, JSON.parse() throws a SyntaxError exception." },
      { q: "Which values are NOT allowed in JSON?", options: ["Numbers and strings", "Arrays and objects", "Functions and undefined", "Booleans and null"], correct: 2, explanation: "JSON does not support functions, undefined, Symbol, or comments. Only strings, numbers, booleans, null, arrays, and objects are valid." }
    ]
  },
  // ============ LECTURE 23 ============
  {
    id: 23, unit: 2, title: "DOM — Tree Structure & Selectors",
    clo: "CLO07", difficulty: "Intermediate", readTime: "10 min",
    theory: "<h3>What Is the DOM?</h3><p>The Document Object Model (DOM) is a tree-like representation of an HTML page that JavaScript can interact with. Every HTML element becomes a node in the DOM tree. JavaScript can read, change, add, or delete any element on the page through the DOM.</p><h3>DOM Tree Structure</h3><p>The tree starts with the <code>document</code> object at the root. Below it is the <code>html</code> element, which has <code>head</code> and <code>body</code> as children. Each HTML element is a node, and elements inside other elements are child nodes.</p><h3>Selecting Elements</h3><ul><li><code>document.querySelector(selector)</code> — Returns the first element matching the CSS selector</li><li><code>document.querySelectorAll(selector)</code> — Returns all matching elements as a NodeList</li><li><code>document.getElementById(id)</code> — Returns the element with that ID</li><li><code>document.getElementsByClassName(class)</code> — Returns a live HTMLCollection</li><li><code>document.getElementsByTagName(tag)</code> — Returns elements by tag name</li></ul><div class='analogy-box'><strong>Analogy:</strong> The DOM is like a family tree. The <code>document</code> is the ancestor, <code>html</code> is the root parent, and each element is a family member. <code>querySelector</code> is like searching the family tree for a specific relative by description.</div>",
    examples: [
      { title: "Selecting elements", code: "// querySelector — CSS selector, returns first match\nconst heading = document.querySelector('h1');\nconst card = document.querySelector('.glass-card');\nconst nav = document.querySelector('#sidebar');\n\n// querySelectorAll — returns ALL matches (NodeList)\nconst allCards = document.querySelectorAll('.glass-card');\nconsole.log(allCards.length); // number of cards\n\n// Loop through NodeList\nallCards.forEach(function(card) {\n  console.log(card.textContent);\n});\n\n// getElementById\nconst hero = document.getElementById('hero');\nconsole.log(hero);" },
      { title: "DOM tree traversal", code: "// Parent, children, siblings\nconst list = document.querySelector('ul');\n\nconsole.log(list.parentElement);     // parent of <ul>\nconsole.log(list.children);          // HTMLCollection of <li> elements\nconsole.log(list.firstElementChild); // first <li>\nconsole.log(list.lastElementChild);  // last <li>\n\n// Sibling navigation\nconst item = document.querySelector('li');\nconsole.log(item.nextElementSibling);     // next <li>\nconsole.log(item.previousElementSibling); // previous <li>" }
    ],
    quickRef: [
      { syntax: "document.querySelector('.class')", desc: "Select first element matching CSS selector" },
      { syntax: "document.querySelectorAll('div')", desc: "Select all matching elements" },
      { syntax: "document.getElementById('id')", desc: "Select element by ID" },
      { syntax: "element.parentElement", desc: "Get parent node" },
      { syntax: "element.children", desc: "Get child elements" }
    ],
    miniQuiz: [
      { q: "What does querySelector return?", options: ["All matching elements", "The first matching element", "A string", "An array of IDs"], correct: 1, explanation: "querySelector returns the first element that matches the CSS selector. Use querySelectorAll for all matches." },
      { q: "What is the DOM?", options: ["A JavaScript library", "A tree representation of an HTML page that JS can manipulate", "A database", "A CSS framework"], correct: 1, explanation: "The DOM (Document Object Model) is a tree-like representation of the HTML page. JavaScript uses it to read and modify page content." },
      { q: "What does querySelectorAll return?", options: ["An Array", "A NodeList", "A single element", "A string"], correct: 1, explanation: "querySelectorAll returns a NodeList — an array-like collection of all elements matching the selector." }
    ]
  },
  // ============ LECTURE 24 ============
  {
    id: 24, unit: 2, title: "DOM — Reading & Writing Content",
    clo: "CLO07", difficulty: "Intermediate", readTime: "9 min",
    theory: "<h3>Reading Content</h3><ul><li><code>element.innerHTML</code> — Gets/sets the HTML content inside an element (includes tags)</li><li><code>element.textContent</code> — Gets/sets only the text content (ignores HTML tags)</li><li><code>element.innerText</code> — Similar to textContent but respects CSS visibility</li></ul><h3>Writing Content</h3><p>You can set these properties to update the page dynamically. Setting <code>innerHTML</code> can render HTML tags, while <code>textContent</code> treats everything as plain text (safer against XSS attacks).</p><h3>Working with Attributes</h3><ul><li><code>element.getAttribute('name')</code> — Read an attribute</li><li><code>element.setAttribute('name', 'value')</code> — Set an attribute</li><li><code>element.removeAttribute('name')</code> — Remove an attribute</li><li><code>element.hasAttribute('name')</code> — Check if attribute exists</li></ul><h3>Changing CSS</h3><ul><li><code>element.style.property = 'value'</code> — Set inline CSS (camelCase property names)</li><li><code>element.classList.add('class')</code> — Add a CSS class</li><li><code>element.classList.remove('class')</code> — Remove a CSS class</li><li><code>element.classList.toggle('class')</code> — Toggle a class on/off</li></ul>",
    examples: [
      { title: "Reading and writing content", code: "// Assume: <div id=\"demo\"><strong>Hello</strong> World</div>\nconst el = document.getElementById('demo');\n\n// innerHTML includes HTML tags\nconsole.log(el.innerHTML); // '<strong>Hello</strong> World'\n\n// textContent is plain text only\nconsole.log(el.textContent); // 'Hello World'\n\n// Update content\nel.textContent = 'Updated text!';\nel.innerHTML = '<em>Updated</em> with HTML!';\n\n// Attributes\nconst link = document.querySelector('a');\nconsole.log(link.getAttribute('href'));\nlink.setAttribute('target', '_blank');" },
      { title: "Changing CSS via JavaScript", code: "const box = document.querySelector('.glass-card');\n\n// Inline styles (camelCase)\nbox.style.backgroundColor = 'rgba(79, 195, 247, 0.1)';\nbox.style.borderRadius = '16px';\nbox.style.padding = '24px';\n\n// classList methods (preferred over inline)\nbox.classList.add('fade-in');\nbox.classList.remove('hidden');\nbox.classList.toggle('active');\nconsole.log(box.classList.contains('fade-in')); // true" }
    ],
    quickRef: [
      { syntax: "el.innerHTML", desc: "Get/set HTML content (renders tags)" },
      { syntax: "el.textContent", desc: "Get/set text only (safe, no HTML)" },
      { syntax: "el.style.color = 'red'", desc: "Set inline CSS property" },
      { syntax: "el.classList.add('x')", desc: "Add a CSS class" },
      { syntax: "el.classList.toggle('x')", desc: "Toggle a CSS class on/off" }
    ],
    miniQuiz: [
      { q: "What is the difference between innerHTML and textContent?", options: ["They are the same", "innerHTML includes HTML tags; textContent is plain text", "textContent includes HTML tags; innerHTML is plain text", "innerHTML is faster"], correct: 1, explanation: "innerHTML gets/sets content including HTML tags. textContent gets/sets only plain text, treating any HTML as literal text." },
      { q: "How do you toggle a CSS class on an element?", options: ["element.class = 'name'", "element.classList.toggle('name')", "element.style.class = 'name'", "element.toggleClass('name')"], correct: 1, explanation: "classList.toggle() adds the class if it's missing, or removes it if it's present." },
      { q: "Why is textContent safer than innerHTML?", options: ["It is faster", "It prevents XSS attacks by not rendering HTML", "It uses less memory", "It works with all browsers"], correct: 1, explanation: "textContent treats input as plain text, so malicious HTML/scripts cannot be injected and executed. innerHTML renders HTML, which could include harmful scripts." }
    ]
  }
];
