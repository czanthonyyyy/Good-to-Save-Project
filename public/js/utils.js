// Input sanitization and validation utilities for Good to Save

// Sanitize text to prevent XSS
function sanitizeText(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Sanitize URL (basic)
function sanitizeURL(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:' ? url : '';
  } catch {
    return '';
  }
}

// Validate image file (type and size)
function validateImageFile(file) {
  if (!file) return true;
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type) && file.size <= 2 * 1024 * 1024;
}

// Export for use in other scripts
window.gtsSanitizeText = sanitizeText;
window.gtsSanitizeURL = sanitizeURL;
window.gtsValidateImageFile = validateImageFile; 