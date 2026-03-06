(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. INJECT CSS
  ───────────────────────────────────────── */
  var css = `
    #iph-topbar {
      background: #060E1A;
      border-bottom: 1px solid rgba(197,164,78,0.2);
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      transition: box-shadow 0.3s ease;
      font-family: 'Instrument Sans', 'DM Sans', sans-serif;
    }
    #iph-topbar.scrolled { box-shadow: 0 4px 30px rgba(0,0,0,0.5); }

    #iph-topbar-inner {
      max-width: 1400px; margin: 0 auto; padding: 0 40px;
      display: flex; justify-content: space-between; align-items: center; height: 64px;
    }

    /* ── Brand ── */
    #iph-brand-group { display: flex; align-items: center; gap: 10px; }
    #iph-wordmark {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 22px; color: #C5A44E; letter-spacing: 1px;
      line-height: 1; white-space: nowrap; text-decoration: none;
    }
    #iph-wordmark:hover { color: #E8D48B; }
    #iph-brand-divider { color: rgba(255,255,255,0.2); font-size: 14px; }
    #iph-maha {
      font-size: 11px; font-weight: 500; letter-spacing: 0.5px;
      color: rgba(255,255,255,0.45); white-space: nowrap; text-decoration: none;
    }
    #iph-maha:hover { color: rgba(255,255,255,0.75); }

    /* ── Nav items ── */
    #iph-nav { display: flex; align-items: center; gap: 4px; }
    .iph-nav-item {
      padding: 20px 14px; font-size: 11px; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      color: rgba(255,255,255,0.6); text-decoration: none;
      position: relative; transition: color 0.3s; white-space: nowrap;
      display: inline-flex; align-items: center;
    }
    .iph-nav-item:hover { color: #C5A44E; }
    .iph-nav-item::after {
      content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 0; height: 2px; background: #C5A44E; transition: width 0.3s;
    }
    .iph-nav-item:hover::after { width: 60%; }

    /* ── Dropdown ── */
    .iph-dropdown { position: relative; display: inline-flex; align-items: center; }
    .iph-dropdown-toggle { display: inline-flex; align-items: center; gap: 5px; cursor: default; }
    .iph-caret { font-size: 8px; opacity: 0.5; transition: transform 0.25s, opacity 0.25s; line-height: 1; }
    .iph-dropdown:hover .iph-caret { transform: rotate(180deg); opacity: 1; }

    .iph-dropdown-menu {
      display: none; position: absolute; top: 100%; left: 0;
      background: #0B1628; border: 1px solid rgba(197,164,78,0.15);
      border-top: none; border-radius: 0 0 8px 8px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      min-width: 240px; z-index: 10000; overflow: visible;
      padding: 4px 0;
    }
    /* padding buffer keeps menu open while moving mouse down */
    .iph-dropdown::after {
      content: ''; position: absolute; top: 100%; left: 0; right: 0; height: 8px;
    }
    .iph-dropdown:hover .iph-dropdown-menu { display: block; }

    .iph-dropdown-menu a {
      display: block; padding: 12px 20px;
      font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
      color: rgba(255,255,255,0.5); text-decoration: none;
      border-bottom: 1px solid rgba(197,164,78,0.06); transition: all 0.2s; white-space: nowrap;
    }
    .iph-dropdown-menu a:last-child { border-bottom: none; }
    .iph-dropdown-menu a:hover { color: #C5A44E; background: rgba(197,164,78,0.05); padding-left: 26px; }

    /* ── Sub-dropdown (Aegis → Sentinel) ── */
    .iph-sub-dropdown { position: relative; }
    .iph-sub-dropdown-menu {
      display: none; position: absolute; top: 0; left: 100%;
      background: #0B1628; border: 1px solid rgba(197,164,78,0.15);
      border-radius: 0 8px 8px 0; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      min-width: 220px; z-index: 10001; padding: 4px 0;
    }
    .iph-sub-dropdown:hover .iph-sub-dropdown-menu { display: block; }
    .iph-sub-dropdown > a::after { content: ' ›'; opacity: 0.5; }

    /* ── Section label ── */
    .iph-sub-label {
      display: block; padding: 10px 20px 6px;
      font-size: 9px; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;
      color: rgba(197,164,78,0.4); pointer-events: none;
    }

    /* ── Invest CTA ── */
    #iph-cta {
      display: inline-flex; align-items: center; margin-left: 8px; padding: 8px 18px;
      background: #C5A44E; color: #060E1A; font-size: 10px; font-weight: 700;
      letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none;
      border-radius: 4px; transition: all 0.3s; white-space: nowrap;
      animation: iph-pulse-cta 2.4s ease-in-out infinite;
    }
    #iph-cta:hover { background: #E8D48B; transform: translateY(-1px); animation: none; }
    @keyframes iph-pulse-cta {
      0%, 100% { box-shadow: 0 0 0 0 rgba(197,164,78,0.5); }
      50%       { box-shadow: 0 0 0 7px rgba(197,164,78,0); }
    }

    /* ── Mobile toggle ── */
    #iph-toggle {
      display: none; background: none; border: none;
      width: 32px; height: 32px; cursor: pointer; position: relative; flex-shrink: 0;
    }
    #iph-toggle span {
      display: block; width: 22px; height: 2px; background: #C5A44E;
      position: absolute; left: 5px; transition: all 0.3s;
    }
    #iph-toggle span:nth-child(1) { top: 8px; }
    #iph-toggle span:nth-child(2) { top: 15px; }
    #iph-toggle span:nth-child(3) { top: 22px; }

    /* ── Mobile open state ── */
    @media (max-width: 1100px) {
      #iph-topbar-inner { padding: 0 20px; }
      #iph-nav { display: none; }
      #iph-toggle { display: flex; align-items: center; justify-content: center; }

      #iph-nav.open {
        display: flex; flex-direction: column; align-items: flex-start;
        position: absolute; top: 64px; left: 0; right: 0;
        background: #060E1A; border-bottom: 1px solid rgba(197,164,78,0.2);
        padding: 12px 0; max-height: calc(100vh - 64px); overflow-y: auto;
      }
      #iph-nav.open .iph-nav-item { padding: 13px 24px; width: 100%; }
      #iph-nav.open .iph-dropdown { width: 100%; flex-direction: column; align-items: flex-start; }
      #iph-nav.open .iph-dropdown-menu {
        display: none; position: static; box-shadow: none;
        border: none; border-radius: 0; min-width: 100%;
        background: rgba(197,164,78,0.04);
        border-top: 1px solid rgba(197,164,78,0.08);
      }
      #iph-nav.open .iph-dropdown.mob-open .iph-dropdown-menu { display: block; }
      #iph-nav.open .iph-sub-dropdown-menu {
        position: static; border: none; border-radius: 0;
        box-shadow: none; display: none;
      }
      #iph-nav.open .iph-sub-dropdown.mob-open .iph-sub-dropdown-menu { display: block; }
      #iph-nav.open .iph-dropdown-menu a { padding: 11px 40px; }
      #iph-nav.open .iph-sub-dropdown-menu a { padding: 11px 56px; }
      #iph-cta { margin: 8px 24px 16px; }
      .iph-dropdown::after { display: none; }
    }

    /* ── Body offset so content isn't hidden under fixed nav ── */
    body { padding-top: 64px !important; }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─────────────────────────────────────────
     2. INJECT HTML
  ───────────────────────────────────────── */
  var html = `
    <div id="iph-topbar">
      <div id="iph-topbar-inner">

        <!-- Brand -->
        <div id="iph-brand-group">
          <a id="iph-wordmark" href="index.html">InPursuit Health</a>
          <span id="iph-brand-divider">|</span>
          <a id="iph-maha" href="maha.html">MAHA Policy Accelerant</a>
        </div>

        <!-- Nav -->
        <nav id="iph-nav">

          <!-- TETRA dropdown -->
          <div class="iph-dropdown">
            <span class="iph-nav-item iph-dropdown-toggle">
              TETRA <span class="iph-caret">▼</span>
            </span>
            <div class="iph-dropdown-menu">
              <a href="tetra.html">TETRA™ — Infrastructure</a>
              <a href="tetra-ex.html">TETRA Ex™ — Health Exchange</a>
              <a href="tetra-conductor.html">TETRA Conductor™ — AI Orchestration</a>
              <!-- Aegis with Sentinel sub-dropdown -->
              <div class="iph-sub-dropdown">
                <a href="tetra-aegis.html">TETRA Aegis™ — AI Governance</a>
                <div class="iph-sub-dropdown-menu">
                  <a href="tetra-aegis.html#sentinel">TETRA Sentinel™ — Threat Hunting</a>
                </div>
              </div>
            </div>
          </div>

          <!-- For You -->
          <a class="iph-nav-item" href="for-you.html">For You</a>

          <!-- For VBC Providers dropdown -->
          <div class="iph-dropdown">
            <span class="iph-nav-item iph-dropdown-toggle">
              For VBC Providers <span class="iph-caret">▼</span>
            </span>
            <div class="iph-dropdown-menu">
              <span class="iph-sub-label">CMS Value-Based Models</span>
              <a href="access.html">CMS ACCESS Model</a>
              <a href="mssp.html">MSSP ACO</a>
              <a href="lead.html">LEAD Model</a>
              <a href="team.html">TEAM Model</a>
            </div>
          </div>

          <!-- Veterans First -->
          <a class="iph-nav-item" href="veterans-first.html">Veterans First</a>

          <!-- Invest CTA -->
          <a id="iph-cta" href="investor.html">Invest</a>

        </nav>

        <!-- Mobile hamburger -->
        <button id="iph-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>

      </div>
    </div>
  `;

  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  var topbar = wrapper.firstElementChild;
  document.body.insertBefore(topbar, document.body.firstChild);

  /* ─────────────────────────────────────────
     3. SCROLL SHADOW
  ───────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ─────────────────────────────────────────
     4. MOBILE TOGGLE
  ───────────────────────────────────────── */
  var toggle = document.getElementById('iph-toggle');
  var nav    = document.getElementById('iph-nav');

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  /* Mobile: tap dropdown toggles open/close */
  var dropdowns = nav.querySelectorAll('.iph-dropdown');
  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('.iph-dropdown-toggle');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      if (!nav.classList.contains('open')) return; /* desktop — ignore */
      dd.classList.toggle('mob-open');
    });
  });

  /* Mobile: Aegis/Sentinel sub-dropdown */
  var subDropdowns = nav.querySelectorAll('.iph-sub-dropdown');
  subDropdowns.forEach(function (sd) {
    var link = sd.querySelector('a');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return; /* desktop — follow link */
      var menu = sd.querySelector('.iph-sub-dropdown-menu');
      if (!menu) return;
      e.preventDefault();
      sd.classList.toggle('mob-open');
    });
  });

  /* Close nav on outside click */
  document.addEventListener('click', function (e) {
    if (!topbar.contains(e.target)) {
      nav.classList.remove('open');
      dropdowns.forEach(function (dd) { dd.classList.remove('mob-open'); });
      subDropdowns.forEach(function (sd) { sd.classList.remove('mob-open'); });
    }
  });

  /* ─────────────────────────────────────────
     5. ACTIVE PAGE HIGHLIGHT
  ───────────────────────────────────────── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('#')[0];
    if (href === page) {
      a.style.color = '#C5A44E';
    }
  });

})();
