/**
 * Wedding Wishes
 */

const Wishes = {
  init() {
    this.bindWishForm();
    this.loadWishes();
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

      const name = document.getElementById('wish-name')?.value.trim();
      const text = textarea?.value.trim();

      if (!name || !text) return;

      const wish = {
        name,
        text,
        date: new Date().toISOString()
      };

      this.saveWish(wish);
      this.renderWish(wish, true);
      form.reset();
      if (counter) counter.textContent = '0';
      showToast(LanguageManager.t('toastWish'));
    });
  },

  saveWish(wish) {
    const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
    wishes.unshift(wish);
    localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
  },

  loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    if (wishes.length === 0) {
      grid.innerHTML = `<p class="no-wishes" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;">${LanguageManager.t('noWishes')}</p>`;
      return;
    }

    wishes.forEach(wish => this.renderWish(wish, false));
  },

  renderWish(wish, prepend) {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    const noWishes = grid.querySelector('.no-wishes');
    if (noWishes) noWishes.remove();

    const card = document.createElement('div');
    card.className = 'wish-card glass-card';
    card.innerHTML = `
      <p class="wish-author">${this.escapeHtml(wish.name)}</p>
      <p class="wish-text">${this.escapeHtml(wish.text)}</p>
      <p class="wish-date">${this.formatDate(wish.date)}</p>
    `;

    if (prepend) {
      grid.prepend(card);
    } else {
      grid.appendChild(card);
    }
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  formatDate(iso) {
    const date = new Date(iso);
    const lang = LanguageManager.currentLang;
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Wishes.init());

document.addEventListener('languageChanged', () => {
  const grid = document.getElementById('wishes-grid');
  if (grid && grid.children.length === 0) {
    grid.innerHTML = `<p class="no-wishes" style="text-align:center;color:var(--color-text-muted);grid-column:1/-1;">${LanguageManager.t('noWishes')}</p>`;
  }
});
