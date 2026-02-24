/**
 * Leaf2Root Global Navigation
 * Drop this script on any page and add <div id="site-nav"></div> where you want the nav.
 * Usage: <script src="/assets/nav.js"></script>
 */
(function () {
  const CSS = `
    :root {
      --nav-cream: #FFFDF7;
      --nav-sage: #A8BF9E;
      --nav-soft-sage: #C8D5B9;
      --nav-rose: #D4A5A5;
      --nav-beige: #E8DFD0;
      --nav-brown: #9B8B7E;
      --nav-text: #4A4543;
      --nav-muted: #6B625C;
      --nav-highlight: #7FA870;
    }

    #l2r-nav {
      background: rgba(255, 253, 247, 0.97);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(155, 139, 126, 0.12);
      position: sticky;
      top: 0;
      z-index: 9999;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }

    #l2r-nav * { box-sizing: border-box; margin: 0; padding: 0; }

    .l2r-nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    /* Logo */
    .l2r-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      flex-shrink: 0;
    }
    .l2r-logo img { height: 36px; width: auto; }
    .l2r-logo-text {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--nav-text);
      letter-spacing: -0.3px;
    }
    .l2r-logo-text .g { color: var(--nav-sage); }
    .l2r-logo-text .t { color: var(--nav-soft-sage); }

    /* Top-level links */
    .l2r-links {
      display: flex;
      align-items: center;
      gap: 0;
      list-style: none;
    }

    .l2r-links > li {
      position: relative;
    }

    .l2r-links > li > a,
    .l2r-links > li > button {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.5rem 0.9rem;
      text-decoration: none;
      color: var(--nav-muted);
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 8px;
      transition: color 0.18s, background 0.18s;
      white-space: nowrap;
    }

    .l2r-links > li > a:hover,
    .l2r-links > li > button:hover,
    .l2r-links > li.open > button {
      color: var(--nav-text);
      background: rgba(168,191,158,0.1);
    }

    .l2r-links > li > button svg {
      transition: transform 0.2s;
    }
    .l2r-links > li.open > button svg {
      transform: rotate(180deg);
    }

    /* Log In button */
    .l2r-login {
      padding: 0.45rem 1.2rem !important;
      background: var(--nav-sage) !important;
      color: white !important;
      border-radius: 24px !important;
      font-weight: 600 !important;
      margin-left: 0.5rem;
      transition: background 0.2s, transform 0.15s !important;
    }
    .l2r-login:hover {
      background: var(--nav-highlight) !important;
      transform: translateY(-1px) !important;
    }

    /* Dropdown panels */
    .l2r-drop {
      position: absolute;
      top: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border: 1px solid rgba(155,139,126,0.12);
      border-radius: 14px;
      box-shadow: 0 8px 40px rgba(74,69,67,0.12), 0 2px 8px rgba(74,69,67,0.06);
      padding: 1.25rem;
      min-width: 220px;
      display: none;
      animation: l2r-fade-in 0.15s ease;
      z-index: 10000;
    }

    .l2r-links > li.open .l2r-drop {
      display: block;
    }

    @keyframes l2r-fade-in {
      from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* Mega panel */
    .l2r-mega {
      left: auto;
      right: -20px;
      transform: none;
      min-width: 640px;
      display: none;
      animation: l2r-fade-in-mega 0.15s ease;
    }
    .l2r-links > li.open .l2r-mega {
      display: flex;
      gap: 1.5rem;
    }
    @keyframes l2r-fade-in-mega {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .l2r-mega-col {
      flex: 1;
      min-width: 160px;
    }

    /* Drop section headers */
    .l2r-drop-head {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--nav-brown);
      padding: 0.2rem 0.4rem 0.5rem;
      margin-bottom: 0.2rem;
    }

    /* Featured / highlighted section */
    .l2r-drop-featured {
      background: linear-gradient(135deg, rgba(168,191,158,0.12), rgba(200,213,185,0.18));
      border-radius: 10px;
      padding: 0.75rem;
      margin-bottom: 0.75rem;
      border: 1px solid rgba(168,191,158,0.25);
    }
    .l2r-drop-featured .l2r-drop-head {
      color: var(--nav-highlight);
      padding-bottom: 0.4rem;
    }

    /* Drop items */
    .l2r-drop-item {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.38rem 0.45rem;
      border-radius: 7px;
      text-decoration: none;
      color: var(--nav-muted);
      font-size: 0.85rem;
      font-weight: 450;
      transition: background 0.15s, color 0.15s;
      line-height: 1.3;
    }

    .l2r-drop-item:hover {
      background: rgba(168,191,158,0.12);
      color: var(--nav-text);
    }

    .l2r-drop-item .icon {
      font-size: 0.95rem;
      flex-shrink: 0;
      width: 18px;
      text-align: center;
    }

    /* "View all" links at bottom of section */
    .l2r-drop-all {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      margin-top: 0.4rem;
      padding: 0.35rem 0.45rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--nav-sage);
      text-decoration: none;
      border-radius: 6px;
      transition: color 0.15s, background 0.15s;
    }
    .l2r-drop-all:hover {
      color: var(--nav-highlight);
      background: rgba(168,191,158,0.1);
    }

    /* Divider */
    .l2r-drop-div {
      height: 1px;
      background: rgba(155,139,126,0.1);
      margin: 0.65rem 0;
    }

    /* New badge */
    .l2r-badge {
      display: inline-block;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0.1rem 0.35rem;
      border-radius: 20px;
      background: var(--nav-rose);
      color: white;
      margin-left: 0.2rem;
      vertical-align: middle;
    }

    /* Hamburger */
    .l2r-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      border: none;
      background: none;
    }
    .l2r-hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--nav-text);
      border-radius: 2px;
      transition: all 0.3s;
    }

    /* Mobile menu */
    .l2r-mobile-menu {
      display: none;
      background: white;
      border-top: 1px solid rgba(155,139,126,0.1);
      padding: 1rem 1.5rem 1.5rem;
      max-height: calc(100vh - 64px);
      overflow-y: auto;
    }
    .l2r-mobile-menu.open {
      display: block;
    }

    .l2r-mobile-section { margin-bottom: 1.2rem; }
    .l2r-mobile-head {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--nav-brown);
      padding: 0.5rem 0 0.3rem;
      border-top: 1px solid rgba(155,139,126,0.1);
    }
    .l2r-mobile-item {
      display: block;
      padding: 0.5rem 0.25rem;
      text-decoration: none;
      color: var(--nav-muted);
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(155,139,126,0.05);
    }
    .l2r-mobile-item:hover { color: var(--nav-sage); }

    @media (max-width: 900px) {
      .l2r-links { display: none; }
      .l2r-hamburger { display: flex; }
    }
  `;

  const NAV_HTML = `
  <div id="l2r-nav">
    <div class="l2r-nav-inner">
      <!-- Logo -->
      <a href="/" class="l2r-logo">
        <img src="/assets/Logo for Leaf2Root transparent.png" alt="Leaf2Root" onerror="this.style.display='none'">
        <span class="l2r-logo-text"><span class="g">Leaf</span><span class="t">2</span>Root</span>
      </a>

      <!-- Desktop links -->
      <ul class="l2r-links">

        <!-- SHOP -->
        <li>
          <button aria-haspopup="true">
            Shop
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
          </button>
          <div class="l2r-drop l2r-mega">

            <!-- Our Products (highlighted) -->
            <div class="l2r-mega-col">
              <div class="l2r-drop-featured">
                <div class="l2r-drop-head">⭐ Our Products</div>
                <a class="l2r-drop-item" href="/innerchild/"><span class="icon">🌱</span> Healing The Child Within <span class="l2r-badge">New</span></a>
                <a class="l2r-drop-item" href="/products/ifs-workbook.html"><span class="icon">🔮</span> IFS Parts Work Workbook</a>
                <a class="l2r-drop-item" href="/products/cbt-workbook.html"><span class="icon">🧠</span> CBT Workbook</a>
                <a class="l2r-drop-item" href="/products/emdr-workbook.html"><span class="icon">💫</span> EMDR Workbook</a>
                <a class="l2r-drop-item" href="/products/dbt-workbook.html"><span class="icon">📘</span> DBT Skills Workbook</a>
                <a class="l2r-drop-item" href="/products/grounding-deck.html"><span class="icon">🃏</span> Grounding Deck</a>
                <a class="l2r-drop-item" href="/products/coping-skills-deck.html"><span class="icon">🌿</span> Coping Skills Deck</a>
                <a class="l2r-drop-all" href="/shop.html">View all products →</a>
              </div>
            </div>

            <!-- Affiliate Picks + Bundles -->
            <div class="l2r-mega-col">
              <div class="l2r-drop-head">Affiliate Picks</div>
              <a class="l2r-drop-item" href="/tools/therapy-card-decks.html"><span class="icon">🎴</span> Therapy Card Decks</a>
              <a class="l2r-drop-item" href="/tools/mindfulness-tools.html"><span class="icon">🧘</span> Mindfulness Tools</a>
              <a class="l2r-drop-item" href="/tools/sensory-tools.html"><span class="icon">🤲</span> Sensory & Fidget Tools</a>
              <a class="l2r-drop-item" href="/tools/coloring-books.html"><span class="icon">🎨</span> Therapeutic Coloring Books</a>
              <a class="l2r-drop-item" href="/tools/light-therapy.html"><span class="icon">💡</span> Light Therapy</a>

              <div class="l2r-drop-div"></div>
              <div class="l2r-drop-head">Bundles</div>
              <a class="l2r-drop-item" href="/products/clinician-bundle.html"><span class="icon">💼</span> Clinician Bundle</a>
              <a class="l2r-drop-item" href="/products/trauma-recovery.html"><span class="icon">🌀</span> Trauma Recovery Companion</a>
              <a class="l2r-drop-item" href="/products/kap-celestial.html"><span class="icon">✨</span> KAP Celestial Workbook</a>
              <a class="l2r-drop-all" href="/shop.html">Browse all →</a>
            </div>

          </div>
        </li>

        <!-- FREE RESOURCES -->
        <li>
          <button aria-haspopup="true">
            Free Resources
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
          </button>
          <div class="l2r-drop" style="min-width:240px;">
            <div class="l2r-drop-head">Downloads</div>
            <a class="l2r-drop-item" href="/resources.html"><span class="icon">📥</span> Free Resource Library</a>
            <a class="l2r-drop-item" href="/product-resources/"><span class="icon">📄</span> Worksheets & Handouts</a>
            <a class="l2r-drop-item" href="/product-resources/grounding-deck.html"><span class="icon">🌱</span> Grounding Deck Preview</a>

            <div class="l2r-drop-div"></div>
            <div class="l2r-drop-head">Quick Tools</div>
            <a class="l2r-drop-item" href="/quick-tools.html"><span class="icon">⚡</span> Quick Tools Hub</a>
            <a class="l2r-drop-item" href="/tools/"><span class="icon">🛠️</span> All Tools & Topics</a>
          </div>
        </li>

        <!-- APPS -->
        <li>
          <button aria-haspopup="true">
            Apps
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
          </button>
          <div class="l2r-drop" style="min-width:230px;">
            <div class="l2r-drop-head">Therapeutic Apps</div>
            <a class="l2r-drop-item" href="/apps/neuroflow.html"><span class="icon">🧠</span> NeuroFlow</a>
            <a class="l2r-drop-item" href="/apps/gentle-pause.html"><span class="icon">🌬️</span> Gentle Pause</a>
            <a class="l2r-drop-item" href="/apps/body-wise.html"><span class="icon">🫀</span> Body Wise</a>
            <a class="l2r-drop-item" href="/apps/ether-earth.html"><span class="icon">🌿</span> Ether & Earth</a>
            <a class="l2r-drop-item" href="/apps/just-this.html"><span class="icon">🎯</span> Just This</a>

            <div class="l2r-drop-div"></div>
            <div class="l2r-drop-head">Clinician Tools</div>
            <a class="l2r-drop-item" href="/apps/erp-session-builder.html"><span class="icon">📋</span> ERP Session Builder</a>
            <a class="l2r-drop-item" href="/apps/zensync.html"><span class="icon">⚡</span> ZenSync</a>
            <a class="l2r-drop-item" href="/apps/kap-companion.html"><span class="icon">🌌</span> KAP Companion</a>
            <a class="l2r-drop-item" href="/apps/flash-ui.html"><span class="icon">💫</span> Flash UI</a>
            <a class="l2r-drop-all" href="/apps/">View all apps →</a>
          </div>
        </li>

        <!-- LEARN -->
        <li>
          <button aria-haspopup="true">
            Learn
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
          </button>
          <div class="l2r-drop l2r-mega" style="min-width:600px;">

            <div class="l2r-mega-col">
              <div class="l2r-drop-head">Brain & Nervous System</div>
              <a class="l2r-drop-item" href="/tools/adhd-brain.html"><span class="icon">⚡</span> ADHD Brain</a>
              <a class="l2r-drop-item" href="/tools/anxiety-tools.html"><span class="icon">🌀</span> Anxiety</a>
              <a class="l2r-drop-item" href="/tools/ocd-brain.html"><span class="icon">🔁</span> OCD Brain</a>
              <a class="l2r-drop-item" href="/tools/brain-health.html"><span class="icon">🧠</span> Brain Health</a>
              <a class="l2r-drop-item" href="/tools/sleep-health.html"><span class="icon">🌙</span> Sleep Health</a>
              <a class="l2r-drop-item" href="/tools/constructed-emotions.html"><span class="icon">💭</span> Emotions & Constructs</a>

              <div class="l2r-drop-div"></div>
              <div class="l2r-drop-head">Healing Approaches</div>
              <a class="l2r-drop-item" href="/inner-child-hub/"><span class="icon">🌱</span> Inner Child Work</a>
              <a class="l2r-drop-item" href="/tools/inherited-trauma.html"><span class="icon">🧬</span> Inherited Trauma</a>
              <a class="l2r-drop-item" href="/tools/grieving-brain.html"><span class="icon">💙</span> Grief & Loss</a>
              <a class="l2r-drop-item" href="/tools/ice-facial-therapy.html"><span class="icon">❄️</span> Cold Facial Therapy</a>
            </div>

            <div class="l2r-mega-col">
              <div class="l2r-drop-head">Relationships & Self</div>
              <a class="l2r-drop-item" href="/tools/attachment-styles.html"><span class="icon">🔗</span> Attachment Styles</a>
              <a class="l2r-drop-item" href="/tools/couples-connection.html"><span class="icon">💑</span> Couples Connection</a>
              <a class="l2r-drop-item" href="/tools/social-anxiety.html"><span class="icon">👥</span> Social Anxiety</a>
              <a class="l2r-drop-item" href="/tools/designing-your-life.html"><span class="icon">🎯</span> Designing Your Life</a>

              <div class="l2r-drop-div"></div>
              <div class="l2r-drop-head">Wellness Tools</div>
              <a class="l2r-drop-item" href="/tools/mindfulness-tools.html"><span class="icon">🧘</span> Mindfulness</a>
              <a class="l2r-drop-item" href="/tools/sensory-tools.html"><span class="icon">🤲</span> Sensory Tools</a>
              <a class="l2r-drop-item" href="/tools/light-therapy.html"><span class="icon">💡</span> Light Therapy</a>
              <a class="l2r-drop-item" href="/tools/coloring-books.html"><span class="icon">🎨</span> Coloring Books</a>
              <a class="l2r-drop-all" href="/tools/">All topics →</a>
            </div>

          </div>
        </li>

        <!-- TRAININGS -->
        <li>
          <a href="/trainings/">Trainings</a>
        </li>

        <!-- About -->
        <li>
          <a href="/pages/about.html">About</a>
        </li>

        <!-- Log In -->
        <li>
          <a href="/login.html" class="l2r-login">Log In</a>
        </li>

      </ul>

      <!-- Hamburger -->
      <button class="l2r-hamburger" id="l2r-ham" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="l2r-mobile-menu" id="l2r-mobile">
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">⭐ Our Products</div>
        <a class="l2r-mobile-item" href="/innerchild/">🌱 Healing The Child Within (New)</a>
        <a class="l2r-mobile-item" href="/products/ifs-workbook.html">🔮 IFS Parts Work Workbook</a>
        <a class="l2r-mobile-item" href="/products/cbt-workbook.html">🧠 CBT Workbook</a>
        <a class="l2r-mobile-item" href="/products/emdr-workbook.html">💫 EMDR Workbook</a>
        <a class="l2r-mobile-item" href="/products/dbt-workbook.html">📘 DBT Skills Workbook</a>
        <a class="l2r-mobile-item" href="/products/grounding-deck.html">🃏 Grounding Deck</a>
        <a class="l2r-mobile-item" href="/products/clinician-bundle.html">💼 Clinician Bundle</a>
        <a class="l2r-mobile-item" href="/shop.html">→ All Products</a>
      </div>
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">Affiliate Picks</div>
        <a class="l2r-mobile-item" href="/tools/therapy-card-decks.html">🎴 Therapy Card Decks</a>
        <a class="l2r-mobile-item" href="/tools/mindfulness-tools.html">🧘 Mindfulness Tools</a>
        <a class="l2r-mobile-item" href="/tools/sensory-tools.html">🤲 Sensory Tools</a>
        <a class="l2r-mobile-item" href="/tools/coloring-books.html">🎨 Coloring Books</a>
      </div>
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">Free Resources</div>
        <a class="l2r-mobile-item" href="/resources.html">📥 Free Resource Library</a>
        <a class="l2r-mobile-item" href="/product-resources/">📄 Worksheets & Handouts</a>
        <a class="l2r-mobile-item" href="/quick-tools.html">⚡ Quick Tools</a>
      </div>
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">Apps</div>
        <a class="l2r-mobile-item" href="/apps/neuroflow.html">🧠 NeuroFlow</a>
        <a class="l2r-mobile-item" href="/apps/gentle-pause.html">🌬️ Gentle Pause</a>
        <a class="l2r-mobile-item" href="/apps/body-wise.html">🫀 Body Wise</a>
        <a class="l2r-mobile-item" href="/apps/erp-session-builder.html">📋 ERP Session Builder</a>
        <a class="l2r-mobile-item" href="/apps/">→ All Apps</a>
      </div>
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">Learn</div>
        <a class="l2r-mobile-item" href="/tools/adhd-brain.html">⚡ ADHD</a>
        <a class="l2r-mobile-item" href="/tools/anxiety-tools.html">🌀 Anxiety</a>
        <a class="l2r-mobile-item" href="/tools/attachment-styles.html">🔗 Attachment Styles</a>
        <a class="l2r-mobile-item" href="/tools/sleep-health.html">🌙 Sleep Health</a>
        <a class="l2r-mobile-item" href="/inner-child-hub/">🌱 Inner Child Work</a>
        <a class="l2r-mobile-item" href="/tools/">→ All Topics</a>
      </div>
      <div class="l2r-mobile-section">
        <div class="l2r-mobile-head">Account</div>
        <a class="l2r-mobile-item" href="/pages/about.html">About</a>
        <a class="l2r-mobile-item" href="/pages/contact.html">Contact</a>
        <a class="l2r-mobile-item" href="/login.html">Log In</a>
      </div>
    </div>
  </div>
  `;

  // ── Inject styles ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // ── Inject HTML ────────────────────────────────────────────────────
  const placeholder = document.getElementById('site-nav');
  if (placeholder) {
    placeholder.outerHTML = NAV_HTML;
  } else {
    // Prepend to body if no placeholder
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  }

  // ── Dropdown behavior ──────────────────────────────────────────────
  document.querySelectorAll('#l2r-nav .l2r-links > li').forEach(function (li) {
    const btn = li.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const wasOpen = li.classList.contains('open');
      // Close all
      document.querySelectorAll('#l2r-nav .l2r-links > li').forEach(function (x) {
        x.classList.remove('open');
      });
      if (!wasOpen) li.classList.add('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', function () {
    document.querySelectorAll('#l2r-nav .l2r-links > li').forEach(function (x) {
      x.classList.remove('open');
    });
  });

  // ── Hamburger ──────────────────────────────────────────────────────
  const ham = document.getElementById('l2r-ham');
  const mobile = document.getElementById('l2r-mobile');
  if (ham && mobile) {
    ham.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
  }
})();
