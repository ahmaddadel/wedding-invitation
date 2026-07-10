/**
 * Countdown Timer
 * Wedding Date: August 27, 2026 at 6:00 PM (Riyadh UTC+3)
 */

const Countdown = {
  weddingDate: new Date('2026-08-27T18:00:00+03:00'),
  interval: null,

  init() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  },

  update() {
    const now = new Date();
    const diff = this.weddingDate - now;

    if (diff <= 0) {
      this.setValues(0, 0, 0, 0);
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.setValues(days, hours, minutes, seconds);
  },

  setValues(days, hours, minutes, seconds) {
    const els = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };

    if (els.days) els.days.textContent = String(days).padStart(2, '0');
    if (els.hours) els.hours.textContent = String(hours).padStart(2, '0');
    if (els.minutes) els.minutes.textContent = String(minutes).padStart(2, '0');
    if (els.seconds) els.seconds.textContent = String(seconds).padStart(2, '0');
  }
};

document.addEventListener('DOMContentLoaded', () => Countdown.init());
