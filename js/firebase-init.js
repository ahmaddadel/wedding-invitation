/**
 * Firebase initialization — app, Firestore, Analytics
 */

const FirebaseService = {
  db: null,
  initialized: false,

  init() {
    if (!FIREBASE_ENABLED || typeof firebase === 'undefined') {
      return false;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }

      this.db = firebase.firestore();

      if (typeof firebase.analytics === 'function') {
        firebase.analytics();
      }

      this.initialized = true;
      return true;
    } catch (err) {
      console.error('Firebase init failed:', err);
      return false;
    }
  },

  getDb() {
    if (!this.initialized) this.init();
    return this.db;
  }
};
