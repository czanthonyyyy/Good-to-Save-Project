// Enhanced Authentication & Session Management for Good to Save
// Requires Firebase Auth, Firestore, Storage, and firebaseConfig.js

(function() {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  // Store user session data
  function storeSession(user, profile) {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || '',
      ...profile
    };
    sessionStorage.setItem('gts_user', JSON.stringify(sessionData));
    localStorage.setItem('gts_user', JSON.stringify(sessionData));
  }

  // Clear session data
  function clearSession() {
    sessionStorage.removeItem('gts_user');
    localStorage.removeItem('gts_user');
  }

  // Retrieve session data
  function getSession() {
    return JSON.parse(sessionStorage.getItem('gts_user') || localStorage.getItem('gts_user') || 'null');
  }

  // Listen for auth state changes
  auth.onAuthStateChanged(async function(user) {
    if (user) {
      try {
        const doc = await db.collection('users').doc(user.uid).get();
        const profile = doc.exists ? doc.data() : {};
        storeSession(user, profile);
        // Optionally, redirect to profile page if on login page
        if (window.location.pathname.includes('log in form.html')) {
          window.location.href = '/public/pages/profile.html';
        }
      } catch (e) {
        clearSession();
      }
    } else {
      clearSession();
      // Optionally, redirect to login if not authenticated
      if (!window.location.pathname.includes('log in form.html')) {
        window.location.href = '/public/pages/log in form.html';
      }
    }
  });

  // Secure logout
  window.gtsLogout = async function() {
    try {
      await auth.signOut();
      clearSession();
      window.location.href = '/public/pages/log in form.html';
    } catch (e) {
      alert('Logout failed: ' + (e.message || 'Unknown error'));
    }
  };

  // Real-time profile sync
  function subscribeProfileRealtime() {
    const session = getSession();
    if (!session || !session.uid) return;
    db.collection('users').doc(session.uid).onSnapshot(function(doc) {
      if (doc.exists) {
        const user = auth.currentUser;
        const profile = doc.data();
        storeSession(user, profile);
        // Optionally, update UI elements (e.g., avatar, name) here
        // Example: updateAvatar(profile.photoURL);
      }
    });
  }

  // Call on page load
  subscribeProfileRealtime();

  // Expose session helpers globally if needed
  window.gtsGetSession = getSession;

  // Auto-refresh tokens if needed (Firebase handles this by default)
})(); 