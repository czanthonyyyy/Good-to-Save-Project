// UI update functions for Good to Save profile system
// Requires gtsGetSession() from auth.js

function updateHeaderProfile() {
  const userArea = document.getElementById('user-area');
  if (!userArea) return;
  userArea.innerHTML = `<a href="public/pages/log in form.html" title="sign-up" class="button button-primary cta">Sign Up</a>`;
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
