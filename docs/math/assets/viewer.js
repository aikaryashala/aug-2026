// Shared viewer logic for all task pages.
// The markdown file is derived from the page's own filename: <name>.html -> <name>.md
// (override with <body data-md="...."> if ever needed).
// <body data-kind="worksheet|questions|answers"> drives wording and per-kind CSS.
(function(){
  const PAGE = location.pathname.split('/').pop() || 'page.html';
  const MD_FILE = document.body.dataset.md || PAGE.replace(/\.html?$/, '') + '.md';
  const KIND = document.body.dataset.kind || 'page';
  const statusEl = document.getElementById('status');
  const contentEl = document.getElementById('content');

  function showError(title, lines){
    statusEl.outerHTML =
      '<div class="errbox" role="alert"><h2>' + title + '</h2>' + lines.join('') + '</div>';
  }

  async function render(){
    if (!window.marked){
      showError('Markdown renderer didn’t load',
        ['<p>The marked.js library couldn’t be reached from the CDN. Check your internet connection and reload.</p>']);
      return;
    }
    marked.setOptions({ gfm:true, breaks:false });

    try{
      const res = await fetch(MD_FILE, { cache:'no-cache' });
      if(!res.ok) throw new Error('http-' + res.status);
      const md = await res.text();

      contentEl.innerHTML = marked.parse(md);

      // Highlight only blocks whose language is known; leave ASCII diagrams plain.
      contentEl.querySelectorAll('pre code').forEach(block => {
        const m = (block.className || '').match(/language-([\w-]+)/);
        const lang = m && m[1];
        if (lang && window.hljs && hljs.getLanguage(lang)){
          hljs.highlightElement(block);
        }
      });

      // Upgrade ```cells blocks into graph-paper cell rows (one symbol per cell).
      contentEl.querySelectorAll('pre code.language-cells').forEach(block => {
        const wrap = document.createElement('div');
        wrap.className = 'cells';
        block.textContent.replace(/\n$/, '').split('\n').forEach(line => {
          const row = document.createElement('div');
          row.className = 'cellrow';
          Array.from(line).forEach(ch => {
            const cell = document.createElement('span');
            cell.className = 'cell' + (ch === ' ' ? ' cell--space' : ch === '↵' ? ' cell--enter' : '');
            cell.textContent = ch === ' ' ? '·' : ch;
            row.appendChild(cell);
          });
          wrap.appendChild(row);
        });
        block.closest('pre').replaceWith(wrap);
      });

      // Upgrade ```graph blocks into an SVG graph sheet (fixed −10..10 grid, both axes).
      // One command per line: dots x y x y … | line x1 y1 x2 y2 … | curve x y x y …
      // An optional " | label" after any command puts a label near its last point.
      contentEl.querySelectorAll('pre code.language-graph').forEach(block => {
        const NS = 'http://www.w3.org/2000/svg';
        const U = 20, R = 10, M = 24;                     // px per unit, world range, margin
        const X = v => v * U, Y = v => -v * U;
        const PALETTE = ['#1F5FE0', '#C8791B', '#0E9F6E', '#9333EA', '#DC2626'];
        const svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', [-(R*U+M), -(R*U+M), 2*(R*U+M), 2*(R*U+M)].join(' '));
        svg.setAttribute('role', 'img');
        const el = attrs => {
          const n = document.createElementNS(NS, attrs.tag);
          for (const k in attrs) if (k !== 'tag') n.setAttribute(k, attrs[k]);
          svg.appendChild(n);
          return n;
        };
        // grid, axes, tick numbers
        for (let i = -R; i <= R; i++){
          el({tag:'line', x1:X(i), y1:Y(-R), x2:X(i), y2:Y(R), stroke:'#E3EAF5', 'stroke-width':1});
          el({tag:'line', x1:X(-R), y1:Y(i), x2:X(R), y2:Y(i), stroke:'#E3EAF5', 'stroke-width':1});
        }
        el({tag:'line', x1:X(-R)-8, y1:0, x2:X(R)+8, y2:0, stroke:'#7C8AA0', 'stroke-width':1.6});
        el({tag:'line', x1:0, y1:Y(R)-8, x2:0, y2:Y(-R)+8, stroke:'#7C8AA0', 'stroke-width':1.6});
        const tick = (x, y, text, anchor) => {
          const t = el({tag:'text', x, y, fill:'#8A96A8', 'font-size':10,
            'font-family':"'JetBrains Mono',monospace", 'text-anchor':anchor});
          t.textContent = text;
        };
        for (let i = -R; i <= R; i += 2){
          if (i === 0) continue;
          tick(X(i), 14, i, 'middle');
          tick(-6, Y(i) + 3.5, i, 'end');
        }
        tick(-5, 14, '0', 'end');
        tick(X(R) + 14, 4, 'x', 'start');
        tick(4, Y(R) - 12, 'y', 'start');
        // Catmull-Rom through the points, as cubic beziers (a smooth freehand join)
        const catmull = p => {
          if (p.length < 3) return 'M' + p.map(q => q.join(' ')).join(' L ');
          let d = 'M' + p[0].join(' ');
          for (let i = 0; i < p.length - 1; i++){
            const p0 = p[i-1] || p[i], p1 = p[i], p2 = p[i+1], p3 = p[i+2] || p2;
            const c1 = [p1[0] + (p2[0]-p0[0])/6, p1[1] + (p2[1]-p0[1])/6];
            const c2 = [p2[0] - (p3[0]-p1[0])/6, p2[1] - (p3[1]-p1[1])/6];
            d += 'C' + [c1, c2, p2].map(q => q.map(n => +n.toFixed(2)).join(' ')).join(',');
          }
          return d;
        };
        let ci = 0;
        const labels = [];
        block.textContent.trim().split('\n').forEach(raw => {
          const bar = raw.indexOf('|');
          const cmd = (bar < 0 ? raw : raw.slice(0, bar)).trim();
          const label = bar < 0 ? '' : raw.slice(bar + 1).trim();
          if (!cmd) return;
          const t = cmd.split(/\s+/);
          const nums = t.slice(1).map(Number);
          const pts = [];
          for (let i = 0; i + 1 < nums.length; i += 2)
            if (isFinite(nums[i]) && isFinite(nums[i+1])) pts.push([X(nums[i]), Y(nums[i+1])]);
          if (!pts.length) return;
          if (t[0] === 'dots'){
            pts.forEach(p => el({tag:'circle', cx:p[0], cy:p[1], r:4, fill:'#16202E'}));
            if (label) labels.push([pts[pts.length-1], '#16202E', label]);
          } else if (t[0] === 'line' || t[0] === 'curve'){
            const color = PALETTE[ci++ % PALETTE.length];
            el({tag:'path', fill:'none', stroke:color, 'stroke-width':2.6,
              'stroke-linecap':'round', 'stroke-linejoin':'round',
              d: t[0] === 'line' ? 'M' + pts.map(p => p.join(' ')).join(' L ') : catmull(pts)});
            if (label) labels.push([pts[pts.length-1], color, label]);
          }
        });
        labels.forEach(([p, color, text]) => {
          const end = p[0] > R*U/2;                       // near the right edge: hang left
          const t = el({tag:'text',
            x: end ? p[0] - 8 : p[0] + 8,
            y: p[1] < -R*U + 12 ? p[1] + 20 : p[1] - 9,
            fill:color, 'font-size':12.5, 'font-weight':600,
            'text-anchor': end ? 'end' : 'start',
            'paint-order':'stroke', stroke:'#FFFFFF', 'stroke-width':4,
            'font-family':"'IBM Plex Sans','Noto Sans Telugu',sans-serif"});
          t.textContent = text;
        });
        const wrap = document.createElement('div');
        wrap.className = 'graph';
        wrap.appendChild(svg);
        block.closest('pre').replaceWith(wrap);
      });

      // Upgrade ```sms blocks into phone-style message bubbles (wrapped, not scrolled).
      contentEl.querySelectorAll('pre code.language-sms').forEach(block => {
        const box = document.createElement('div');
        box.className = 'sms';
        const label = document.createElement('div');
        label.className = 'sms-label';
        label.textContent = 'sms';
        const bubble = document.createElement('div');
        bubble.className = 'sms-bubble';
        bubble.textContent = block.textContent.replace(/\n$/, '');
        box.appendChild(label);
        box.appendChild(bubble);
        block.closest('pre').replaceWith(box);
      });

      document.title = (contentEl.querySelector('h1')?.textContent || document.title).trim();
      statusEl.remove();
      contentEl.hidden = false;
      document.body.classList.add('ready');
    }catch(err){
      const isFile = location.protocol === 'file:';
      if (isFile){
        showError('Open this over a local server, not as a file',
          ['<p>Browsers block a page opened with <code>file://</code> from reading other local files, so the ' + KIND + ' can’t be fetched yet. Serve this folder over HTTP and reload:</p>',
           '<pre>cd path/to/this/folder\npython3 -m http.server 8000</pre>',
           '<p>Then open <code>http://localhost:8000/' + PAGE + '</code></p>']);
      } else {
        showError(KIND.charAt(0).toUpperCase() + KIND.slice(1) + ' file not found',
          ['<p>Couldn’t load <code>' + MD_FILE + '</code> next to this page. Keep both files in the same folder, then reload.</p>']);
      }
    }
  }

  render();
})();
