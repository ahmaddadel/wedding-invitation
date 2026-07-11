/**
 * Background Music Player
 */

const MusicPlayer = {
  audio: null,
  btn: null,
  isPlaying: false,

  init() {
    this.audio = document.getElementById('bg-music');
    this.btn = document.getElementById('music-btn');
    if (!this.audio || !this.btn) return;

    const savedState = localStorage.getItem('wedding-music-playing');
    if (savedState === 'true') {
      this.play();
    }

    this.btn.addEventListener('click', () => this.toggle());
    this.audio.addEventListener('ended', () => this.setPlaying(false));
  },

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  },

  play() {
    this.audio.play().then(() => {
      this.setPlaying(true);
      localStorage.setItem('wedding-music-playing', 'true');
    }).catch(() => {
      showToast(LanguageManager.t('toastError'));
    });
  },

  pause() {
    this.audio.pause();
    this.setPlaying(false);
    localStorage.setItem('wedding-music-playing', 'false');
  },

  setPlaying(playing) {
    this.isPlaying = playing;
    this.btn.classList.toggle('playing', playing);
    const icon = this.btn.querySelector('i');
    if (icon) {
      icon.className = playing ? 'fas fa-pause' : 'fas fa-music';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => MusicPlayer.init());
