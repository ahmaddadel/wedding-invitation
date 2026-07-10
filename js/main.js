/**
 * Main Application — Navigation, utilities, premium features
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavigation();
  initScrollProgress();
  initBackToTop();
  initThemeToggle();
  initEnvelope();
  initInvitationActions();
  initQRCode();
});

/* Loading Screen */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.setAttribute('aria-hidden', 'true');
    }, 1200);
  });
}

/* Navigation */
function initNavigation() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const closeMenu = () => {
    menu?.classList.remove('active');
    toggle?.classList.remove('active');
    overlay.classList.remove('active');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  const onScroll = debounce(() => {
    header?.classList.toggle('scrolled', window.scrollY > 50);

    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, 50);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Scroll Progress Bar */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    bar.setAttribute('aria-valuenow', Math.round(progress));
  }, { passive: true });
}

/* Back to Top */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Dark Mode Toggle */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('wedding-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(toggle, true);
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('wedding-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('wedding-theme', 'dark');
    }
    updateThemeIcon(toggle, !isDark);
  });
}

function updateThemeIcon(toggle, isDark) {
  const icon = toggle.querySelector('i');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

/* Envelope Animation */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const btn = document.getElementById('btn-view-invitation');
  let opened = false;

  const openEnvelope = () => {
    if (opened) return;
    opened = true;
    envelope?.classList.add('open');
    btn?.classList.add('visible');

    setTimeout(() => {
      document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  envelope?.addEventListener('click', openEnvelope);
  envelope?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  btn?.addEventListener('click', () => {
    if (!opened) openEnvelope();
    else document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* Invitation Actions */
function initInvitationActions() {
  document.getElementById('btn-copy-link')?.addEventListener('click', copyInvitationLink);
  document.getElementById('btn-share')?.addEventListener('click', shareInvitation);
  document.getElementById('btn-add-calendar')?.addEventListener('click', addToCalendar);
  document.getElementById('btn-download')?.addEventListener('click', downloadInvitation);
  document.getElementById('btn-copy-address')?.addEventListener('click', copyAddress);
}

function copyInvitationLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast(LanguageManager.t('toastCopied'));
  }).catch(() => fallbackCopy(window.location.href));
}

function copyAddress() {
  const text = WEDDING_LOCATION.mapsUrl;
  navigator.clipboard.writeText(text).then(() => {
    showToast(LanguageManager.t('toastCopied'));
  }).catch(() => fallbackCopy(text));
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast(LanguageManager.t('toastCopied'));
}

async function shareInvitation() {
  const shareData = {
    title: LanguageManager.t('shareTitle'),
    text: LanguageManager.t('shareText'),
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast(LanguageManager.t('toastShared'));
    } catch (err) {
      if (err.name !== 'AbortError') copyInvitationLink();
    }
  } else {
    copyInvitationLink();
  }
}

function addToCalendar() {
  const title = LanguageManager.t('calendarTitle');
  const description = LanguageManager.t('calendarDesc');
  const location = LanguageManager.t('venueName') + ' - ' + WEDDING_LOCATION.mapsUrl;
  const start = '20260827T180000';
  const end = '20260828T003000';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//AR',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding-invitation.ics';
  a.click();
  URL.revokeObjectURL(url);
  showToast(LanguageManager.t('toastCalendar'));
}

function downloadInvitation() {
  const card = document.getElementById('download-card');
  if (!card || typeof html2canvas === 'undefined') {
    showToast(LanguageManager.t('toastDownload'));
    return;
  }

  html2canvas(card, { scale: 2, backgroundColor: '#F8F3EE' }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'wedding-invitation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(LanguageManager.t('toastDownload'));
  }).catch(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F8F3EE';
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = '#B88888';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText(LanguageManager.t('coupleNames'), 300, 180);
    ctx.font = '20px serif';
    ctx.fillStyle = '#6B6B6B';
    ctx.fillText(LanguageManager.t('weddingDate'), 300, 240);
    ctx.fillText(LanguageManager.t('venueName'), 300, 280);

    const link = document.createElement('a');
    link.download = 'wedding-invitation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(LanguageManager.t('toastDownload'));
  });
}

/* QR Code */
function initQRCode() {
  const canvas = document.getElementById('qr-canvas');
  if (!canvas || typeof qrcode === 'undefined') return;

  try {
    const qr = qrcode(0, 'M');
    qr.addData(WEDDING_LOCATION.mapsUrl);
    qr.make();

    const ctx = canvas.getContext('2d');
    const size = 150;
    const cellSize = size / qr.getModuleCount();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        ctx.fillStyle = qr.isDark(row, col) ? '#3D3D3D' : '#FFFFFF';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  } catch (e) {
    console.warn('QR code generation failed:', e);
  }
}

/* Toast Notification */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* Debounce Utility */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
