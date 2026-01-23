// Leaf2Root Member Tools JavaScript
// Subscription Management with Stripe Integration

class SubscriptionManager {
    constructor() {
          this.isSubscribed = false;
          this.init();
    }
    init() {
          this.checkSubscription();
          this.setupEventListeners();
    }
    checkSubscription() {
          // Check sessionStorage for active subscription
      const subData = sessionStorage.getItem('leaf2root_subscription');
          if (subData) {
                  const data = JSON.parse(subData);
                  if (data.active && new Date(data.expires) > new Date()) {
                            this.isSubscribed = true;
                            this.unlockContent();
                  }
          }
          this.updateUI();
    }
    unlockContent() {
          document.querySelectorAll('.app-card.locked').forEach(card => {
                  card.classList.remove('locked');
          });
          const paywall = document.getElementById('paywall-overlay');
          if (paywall) paywall.style.display = 'none';
    }
    updateUI() {
          const subscribeButtons = document.querySelectorAll('.btn-subscribe, .btn-unlock');
          subscribeButtons.forEach(btn => {
                  if (this.isSubscribed) {
                            btn.textContent = 'Subscribed ✓';
                            btn.style.pointerEvents = 'none';
                  }
          });
    }
    setupEventListeners() {
          document.querySelectorAll('[href="#subscribe"]').forEach(btn => {
                  btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.initiateCheckout();
                  });
          });
    }
    async initiateCheckout() {
          // Stripe Checkout integration - replace with your actual keys
      const STRIPE_PRICE_ID = 'price_YOUR_PRICE_ID';
          alert('Stripe checkout would open here. Configure your Stripe keys in the code.');
          // For demo, simulate subscription
      sessionStorage.setItem('leaf2root_subscription', JSON.stringify({
              active: true, expires: new Date(Date.now() + 30*24*60*60*1000).toISOString()
      }));
          this.isSubscribed = true;
          this.unlockContent();
          this.updateUI();
    }
}

// Search and Filter functionality
class SearchFilter {
    constructor() {
          this.activeFilters = { modality: [], issue: [] };
          this.init();
    }
    init() {
          this.setupSearch();
          this.setupFilters();
    }
    setupSearch() {
          const searchInput = document.getElementById('app-search');
          if (searchInput) {
                  searchInput.addEventListener('input', () => this.filterApps());
          }
    }
    setupFilters() {
          document.querySelectorAll('.filter-tag').forEach(tag => {
                  tag.addEventListener('click', () => {
                            const type = tag.dataset.filterType;
                            const value = tag.dataset.filterValue;
                            tag.classList.toggle('active');
                            if (tag.classList.contains('active')) {
                                        this.activeFilters[type].push(value);
                            } else {
                                        this.activeFilters[type] = this.activeFilters[type].filter(v => v !== value);
                            }
                            this.filterApps();
                  });
          });
          const clearBtn = document.getElementById('clear-filters');
          if (clearBtn) {
                  clearBtn.addEventListener('click', () => this.clearFilters());
          }
    }
    filterApps() {
          const searchTerm = document.getElementById('app-search')?.value.toLowerCase() || '';
          const cards = document.querySelectorAll('.app-card');
          let visibleCount = 0;
          cards.forEach(card => {
                  const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                  const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                  const tags = Array.from(card.querySelectorAll('.app-tag')).map(t => t.textContent);
                  const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm);
                  const matchesModality = this.activeFilters.modality.length === 0 || 
                            this.activeFilters.modality.some(f => tags.includes(f));
                  const matchesIssue = this.activeFilters.issue.length === 0 || 
                            this.activeFilters.issue.some(f => tags.includes(f));
                  if (matchesSearch && matchesModality && matchesIssue) {
                            card.style.display = '';
                            visibleCount++;
                  } else {
                            card.style.display = 'none';
                  }
          });
          const counter = document.getElementById('results-count');
          if (counter) counter.textContent = `${visibleCount} apps found`;
    }
    clearFilters() {
          this.activeFilters = { modality: [], issue: [] };
          document.querySelectorAll('.filter-tag.active').forEach(t => t.classList.remove('active'));
          document.getElementById('app-search').value = '';
          this.filterApps();
    }
}

// PWA Install prompt
class PWAInstaller {
    constructor() {
          this.deferredPrompt = null;
          this.init();
    }
    init() {
          window.addEventListener('beforeinstallprompt', (e) => {
                  e.preventDefault();
                  this.deferredPrompt = e;
                  const btn = document.getElementById('install-pwa-btn');
                  if (btn) btn.style.display = 'block';
          });
          const installBtn = document.getElementById('install-pwa-btn');
          if (installBtn) {
                  installBtn.addEventListener('click', () => this.install());
          }
          this.setupDeviceToggle();
    }
    setupDeviceToggle() {
          const toggleBtns = document.querySelectorAll('.device-toggle button');
          toggleBtns.forEach(btn => {
                  btn.addEventListener('click', () => {
                            toggleBtns.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            document.querySelectorAll('.install-steps').forEach(s => s.classList.remove('active'));
                            document.getElementById(`install-${btn.dataset.device}`)?.classList.add('active');
                  });
          });
          // Show iOS by default
      toggleBtns[0]?.click();
    }
    async install() {
          if (this.deferredPrompt) {
                  this.deferredPrompt.prompt();
                  const result = await this.deferredPrompt.userChoice;
                  this.deferredPrompt = null;
          }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.subscriptionManager = new SubscriptionManager();
    window.searchFilter = new SearchFilter();
    window.pwaInstaller = new PWAInstaller();
    // Update results count
                            const counter = document.getElementById('results-count');
    const cardCount = document.querySelectorAll('.app-card').length;
    if (counter) counter.textContent = `${cardCount} apps available`;
});
