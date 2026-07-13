/**
 * Wedding Wishes — shared via Firebase Firestore (visible to all visitors)
 */

const Wishes = {
  db: null,
  unsubscribe: null,
  isSubmitting: false,
  retryTimeout: null,
  retryDelay: 3000, // ms — doubles on each failure, capped at 30s

  init() {
    this.bindWishForm();
    this.initFirebase();
  },

  initFirebase() {
    if (!FirebaseService.init()) {
      this.showSetupMessage();
      return;
    }

    this.db = FirebaseService.getDb();
    this.listenForWishes();
  },

  listenForWishes() {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    // Cancel any existing listener before creating a new one
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    this.showLoading();

    this.unsubscribe = this.db
      .collection('wishes')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          // Reset retry delay on success
          this.retryDelay = 3000;
          clearTimeout(this.retryTimeout);

          this.hideLoading();
          const wishes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          this.renderAllWishes(wishes);
        },
        (err) => {
          console.error('Wishes listener failed:', err);
          this.hideLoading();
          this.showError();

          // Auto-retry with exponential backoff (max 30s)
          clearTimeout(this.retryTimeout);
          this.retryTimeout = setTimeout(() => {
            this.retryDelay = Math.min(this.retryDelay * 2, 30000);
            this.listenForWishes();
          }, this.retryDelay);
        }
      );
  },

  bindWishForm() {
    const form = document.getElementById('wish-form');
    const textarea = document.getElementById('wish-text');
    const counter = document.getElementById('wish-char-count');

    textarea?.addEventListener('input', () => {
      if (counter) counter.textContent = textarea.value.length;
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitWish(form, textarea, counter);
    });
  },

  async submitWish(form, textarea, counter) {
    if (this.isSubmitting) return;

    const name = document.getElementById('wish-name')?.value.trim();
    const text = textarea?.value.trim();

    if (!name || !text) return;

    if (!this.db) {
      showToast(LanguageManager.t('wishesNotConfigured'));
      return;
    }

    this.isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      await this.db.collection('wishes').add({
        name,
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      showToast(LanguageManager.t('toastWish'));
    } catch (err) {
      console.error('Wish submit failed:', err);
      showToast(LanguageManager.t('toastError'));
    } finally {
      // Always clear the form and re-enable the button,
      // whether the submit succeeded or failed
      form.reset();
      if (counter) counter.textContent = '0';
      this.isSubmitting = false;
      if (submitBtn) submitBtn.disabled = false;
    }
  },

  renderAllWishes(wishes) {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (wishes.length === 0) {
      grid.innerHTML = `<p class="no-wishes" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;">${LanguageManager.t('noWishes')}</p>`;
      return;
    }

    wishes.forEach(wish => this.renderWish(wish));
  },

  renderWish(wish) {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'wish-card glass-card';
    card.innerHTML = `
      <p class="wish-author">${this.escapeHtml(wish.name)}</p>
      <p class="wish-text">${this.escapeHtml(wish.text)}</p>
      <p class="wish-date">${this.formatDate(wish.createdAt)}</p>
    `;

    grid.appendChild(card);
  },

  showLoading() {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;
    grid.innerHTML = `<p class="wishes-loading" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;">${LanguageManager.t('wishesLoading')}</p>`;
  },

  hideLoading() {
    const loading = document.querySelector('.wishes-loading');
    if (loading) loading.remove();
  },

  showSetupMessage() {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;
    grid.innerHTML = `<p class="wishes-setup" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;padding:20px;">${LanguageManager.t('wishesNotConfigured')}</p>`;
  },

  showError() {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;
    grid.innerHTML = `<p class="wishes-error" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;">${LanguageManager.t('wishesError')}</p>`;
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  formatDate(timestamp) {
    if (!timestamp) return '';

    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    const lang = LanguageManager.currentLang;
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Wishes.init());

document.addEventListener('languageChanged', () => {
  const grid = document.getElementById('wishes-grid');
  if (!grid) return;

  const setup = grid.querySelector('.wishes-setup');
  const loading = grid.querySelector('.wishes-loading');
  const error = grid.querySelector('.wishes-error');
  const empty = grid.querySelector('.no-wishes');

  if (setup) setup.textContent = LanguageManager.t('wishesNotConfigured');
  if (loading) loading.textContent = LanguageManager.t('wishesLoading');
  if (error) error.textContent = LanguageManager.t('wishesError');
  if (empty) empty.textContent = LanguageManager.t('noWishes');
});
