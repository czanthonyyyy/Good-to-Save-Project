// UI update functions for Good to Save profile system
// Requires gtsGetSession() from auth.js

function updateHeaderProfile() {
  const session = window.gtsGetSession ? window.gtsGetSession() : null;
  const userArea = document.getElementById('user-area');
  if (!userArea) return;
  if (session && session.displayName) {
    let avatarHTML = '';
    if (session.photoURL) {
      avatarHTML = `<img src="${session.photoURL}" alt="Avatar" class="user-avatar-img" />`;
    } else {
      avatarHTML = `<span class="user-avatar-default">${session.displayName[0]}</span>`;
    }
    userArea.innerHTML = `<button id="user-avatar-btn" aria-label="Open dashboard" class="user-avatar-btn">${avatarHTML}<span class="user-avatar-status online" aria-label="Online"></span></button>`;
    // Optionally, add event listeners for dashboard/modal
  } else {
    userArea.innerHTML = `<a href="public/pages/log in form.html" title="sign-up" class="button button-primary cta">Sign Up</a>`;
  }
}

// Listen for storage changes (real-time sync across tabs)
window.addEventListener('storage', function(e) {
  if (e.key === 'gts_user') {
    updateHeaderProfile();
  }
});

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateHeaderProfile);
} else {
  updateHeaderProfile();
}
