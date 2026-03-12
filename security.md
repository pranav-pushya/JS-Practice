# JSLab Security Documentation

## Protections In Place

### Code Playground Sandboxing
User code runs inside an **iframe with `sandbox="allow-scripts"`** (no `allow-same-origin`).
- ✅ Cannot access parent window's `localStorage`
- ✅ Cannot read or modify parent DOM
- ✅ Cannot access cookies
- ✅ 5-second execution timeout kills infinite loops

### XSS Prevention
- All localStorage-sourced strings are sanitized with `escapeHtml()` before `innerHTML` insertion
- Git terminal simulator uses `textContent` (never `innerHTML`) for all output
- Code examples in tutorials use `escapeHtml()` for syntax display
- Snippet names are escaped before rendering

### Prototype Pollution Guard
- `saveSnippet()` rejects dangerous keys: `__proto__`, `constructor`, `prototype`

### localStorage Safety
- All reads use `try/catch` around `JSON.parse`
- Data arrays are capped (20 activities, 50 scores) to prevent quota exhaustion
- Storage writes silently fail on quota exceeded

---

## Accepted Risks (No Backend)

| Risk | Reason Accepted |
|------|-----------------|
| Client-side quiz scoring | No backend to validate — scores in localStorage can be manually edited |
| No CSP header | Cannot set HTTP headers without a server; CSP meta tag can be added |
| Lecture theory uses raw HTML | Content is hardcoded in JS files we control, not user-generated |
| localStorage is same-origin | Any JS on same origin can access it — inherent to Web Storage API |
| CDN SRI hashes | Should be added; generate from exact CDN URLs before deployment |

---

## How to Report a Vulnerability

This is a personal learning project, but if you find a security issue:

1. Open a GitHub Issue with the label `security`
2. Or contact: pranav.pushya@chitkara.edu.in
3. Include: file name, line number, proof of concept, and suggested fix

---

## Console Audit Command

Paste in browser console to check for injected malicious data:

```javascript
(function() {
  var DANGEROUS = /<script|javascript:|onerror=|onload=|onclick=|<img|<iframe|<svg|eval\(|document\.|window\./i;
  var keys = Object.keys(localStorage);
  var issues = 0;
  keys.forEach(function(k) {
    if (DANGEROUS.test(localStorage.getItem(k))) {
      console.warn('⚠️ Suspicious: "' + k + '"');
      issues++;
    }
  });
  console.log(issues ? '🔴 ' + issues + ' suspicious entries' : '✅ Clean (' + keys.length + ' keys)');
})();
```
