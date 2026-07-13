/**
 * Countdown Timers
 * Wedding Date: August 27, 2026 at 9:00 PM (UTC+3)
 * Henna Night:  August 26, 2026 at 8:00 PM (UTC+3)
 */

const Countdown = {
  weddingDate: new Date('2026-08-27T21:00:00+03:00'),
  hennaDate: new Date('2026-08-26T20:00:00+03:00'),
  interval: null,

  init() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  },

  update() {
    const now = new Date();

    this.updateTimer(now, this.weddingDate, {
      days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds'
    });

    this.updateTimer(now, this.hennaDate, {
      days: 'henna-days', hours: 'henna-hours', minutes: 'henna-minutes', seconds: 'henna-seconds'
    });
  },

  updateTimer(now, targetDate, ids) {
    const diff = targetDate - now;

    if (diff <= 0) {
      this.setValues(0, 0, 0, 0, ids);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.setValues(days, hours, minutes, seconds, ids);
  },

  setValues(days, hours, minutes, seconds, ids) {
    const els = {
      days: document.getElementById(ids.days),
      hours: document.getElementById(ids.hours),
      minutes: document.getElementById(ids.minutes),
      seconds: document.getElementById(ids.seconds)
    };

    if (els.days) els.days.textContent = String(days).padStart(2, '0');
    if (els.hours) els.hours.textContent = String(hours).padStart(2, '0');
    if (els.minutes) els.minutes.textContent = String(minutes).padStart(2, '0');
    if (els.seconds) els.seconds.textContent = String(seconds).padStart(2, '0');
  }
};

document.addEventListener('DOMContentLoaded', () => Countdown.init());
