// Profile Page Logic for Good to Save
// Requires Firebase Auth, Firestore, Storage, and firebaseConfig.js

(function() {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  // DOM Elements
  const avatarEl = document.getElementById('profile-avatar');
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const bioEl = document.getElementById('profile-bio');
  const details = {
    firstname: document.getElementById('profile-firstname'),
    lastname: document.getElementById('profile-lastname'),
    phone: document.getElementById('profile-phone'),
    dob: document.getElementById('profile-dob'),
    location: document.getElementById('profile-location'),
    gender: document.getElementById('profile-gender'),
    occupation: document.getElementById('profile-occupation'),
    social: document.getElementById('profile-social'),
    interests: document.getElementById('profile-interests'),
  };
  const editBtn = document.getElementById('edit-profile-btn');
  const editSection = document.getElementById('profile-edit-section');
  const editForm = document.getElementById('profile-edit-form');
  const editError = document.getElementById('edit-error-message');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const loadingEl = document.getElementById('profile-loading');

  let currentUser = null;
  let currentProfile = null;

  function showLoading(show) {
    loadingEl.style.display = show ? 'block' : 'none';
  }

  function renderProfile(user, profile) {
    // Avatar
    if (profile.photoURL) {
      avatarEl.innerHTML = `<img src="${profile.photoURL}" alt="Avatar" class="user-avatar-img" />`;
    } else {
      avatarEl.innerHTML = `<span class="user-avatar-default">${(profile.displayName||user.displayName||user.email||'?')[0]}</span>`;
    }
    // Name, Email, Bio
    nameEl.textContent = profile.displayName || user.displayName || 'No Name';
    emailEl.textContent = user.email;
    bioEl.textContent = profile.bio || '';
    // Details
    details.firstname.textContent = profile.firstName || '';
    details.lastname.textContent = profile.lastName || '';
    details.phone.textContent = profile.phone || '';
    details.dob.textContent = profile.dob || '';
    details.location.textContent = profile.location || '';
    details.gender.textContent = profile.gender || '';
    details.occupation.textContent = profile.occupation || '';
    details.social.textContent = profile.social || '';
    if (profile.social) {
      details.social.href = profile.social;
      details.social.style.display = '';
    } else {
      details.social.href = '#';
      details.social.style.display = 'none';
    }
    details.interests.textContent = (profile.interests && profile.interests.length) ? profile.interests.join(', ') : '';
  }

  function fillEditForm(profile) {
    editForm['edit-firstname'].value = profile.firstName || '';
    editForm['edit-lastname'].value = profile.lastName || '';
    editForm['edit-phone'].value = profile.phone || '';
    editForm['edit-dob'].value = profile.dob || '';
    editForm['edit-bio'].value = profile.bio || '';
    editForm['edit-location'].value = profile.location || '';
    editForm['edit-gender'].value = profile.gender || '';
    editForm['edit-occupation'].value = profile.occupation || '';
    editForm['edit-social'].value = profile.social || '';
    editForm['edit-interests'].value = (profile.interests && profile.interests.length) ? profile.interests.join(', ') : '';
  }

  function validateEditForm() {
    let valid = true;
    editError.style.display = 'none';
    editError.textContent = '';
    // Validate required fields
    const firstName = editForm['edit-firstname'].value.trim();
    const lastName = editForm['edit-lastname'].value.trim();
    if (!/^[a-zA-Z]{2,30}$/.test(firstName)) {
      valid = false;
      editError.textContent = 'First name must be 2-30 alphabetic characters.';
    } else if (!/^[a-zA-Z]{2,30}$/.test(lastName)) {
      valid = false;
      editError.textContent = 'Last name must be 2-30 alphabetic characters.';
    } else if (editForm['edit-phone'].value && !/^\+?[0-9]{10,15}$/.test(editForm['edit-phone'].value)) {
      valid = false;
      editError.textContent = 'Phone must be 10-15 digits.';
    } else if (editForm['edit-bio'].value.length > 300) {
      valid = false;
      editError.textContent = 'Bio must be less than 300 characters.';
    } else if (editForm['edit-location'].value && !/^[a-zA-Z\s]{2,50}$/.test(editForm['edit-location'].value)) {
      valid = false;
      editError.textContent = 'Location must be 2-50 alphabetic characters.';
    } else if (editForm['edit-occupation'].value && !/^[a-zA-Z\s]{2,50}$/.test(editForm['edit-occupation'].value)) {
      valid = false;
      editError.textContent = 'Occupation must be 2-50 alphabetic characters.';
    } else if (editForm['edit-social'].value && !/^https?:\/\/.+/.test(editForm['edit-social'].value)) {
      valid = false;
      editError.textContent = 'Social media link must be a valid URL.';
    } else if (editForm['edit-interests'].value && !editForm['edit-interests'].value.split(',').every(s => s.trim().length >= 2 && s.trim().length <= 30)) {
      valid = false;
      editError.textContent = 'Each interest must be 2-30 chars.';
    } else if (editForm['edit-profilepic'].files[0]) {
      const file = editForm['edit-profilepic'].files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        valid = false;
        editError.textContent = 'Profile picture must be JPG/PNG/WebP and max 2MB.';
      }
    }
    if (!valid) editError.style.display = 'block';
    return valid;
  }

  // Replace inline sanitize and file validation with utils.js functions
  // Use window.gtsSanitizeText, window.gtsSanitizeURL, window.gtsValidateImageFile

  // Fetch and render profile
  function loadProfile() {
    showLoading(true);
    auth.onAuthStateChanged(async function(user) {
      if (!user) {
        window.location.href = 'log in form.html';
        return;
      }
      currentUser = user;
      try {
        const doc = await db.collection('users').doc(user.uid).get();
        currentProfile = doc.exists ? doc.data() : {};
        renderProfile(user, currentProfile);
        showLoading(false);
      } catch (e) {
        showLoading(false);
        nameEl.textContent = 'Error loading profile';
        emailEl.textContent = '';
        bioEl.textContent = '';
      }
    });
  }

  // Edit profile
  editBtn.addEventListener('click', function() {
    fillEditForm(currentProfile || {});
    editSection.style.display = 'block';
    editBtn.style.display = 'none';
  });
  cancelEditBtn.addEventListener('click', function() {
    editSection.style.display = 'none';
    editBtn.style.display = '';
    editError.style.display = 'none';
  });

  editForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!validateEditForm()) return;
    editError.style.display = 'none';
    editError.textContent = '';
    const firstName = window.gtsSanitizeText(editForm['edit-firstname'].value.trim());
    const lastName = window.gtsSanitizeText(editForm['edit-lastname'].value.trim());
    const phone = editForm['edit-phone'].value.trim();
    const dob = editForm['edit-dob'].value;
    const bio = window.gtsSanitizeText(editForm['edit-bio'].value.trim());
    const location = window.gtsSanitizeText(editForm['edit-location'].value.trim());
    const gender = editForm['edit-gender'].value;
    const occupation = window.gtsSanitizeText(editForm['edit-occupation'].value.trim());
    const social = window.gtsSanitizeURL(editForm['edit-social'].value.trim());
    const interests = editForm['edit-interests'].value.split(',').map(s => window.gtsSanitizeText(s.trim())).filter(Boolean);
    const profilePicFile = editForm['edit-profilepic'].files[0];
    const displayName = `${firstName} ${lastName}`;
    let photoURL = currentProfile.photoURL || '';
    try {
      // Upload new profile picture if present
      if (profilePicFile) {
        // Delete old image if exists
        if (photoURL) {
          try { await storage.refFromURL(photoURL).delete(); } catch (e) {}
        }
        const storageRef = storage.ref(`profile_pictures/${currentUser.uid}/profile.jpg`);
        await storageRef.put(profilePicFile);
        photoURL = await storageRef.getDownloadURL();
        await currentUser.updateProfile({ photoURL });
      }
      // Update Auth displayName
      await currentUser.updateProfile({ displayName });
      // Update Firestore profile
      await db.collection('users').doc(currentUser.uid).update({
        firstName,
        lastName,
        displayName,
        phone,
        dob,
        bio,
        location,
        gender,
        occupation,
        social,
        interests,
        photoURL
      });
      // Refresh UI
      currentProfile = Object.assign(currentProfile, {
        firstName, lastName, displayName, phone, dob, bio, location, gender, occupation, social, interests, photoURL
      });
      renderProfile(currentUser, currentProfile);
      editSection.style.display = 'none';
      editBtn.style.display = '';
    } catch (err) {
      editError.textContent = err.message || 'Error updating profile.';
      editError.style.display = 'block';
    }
  });

  // Real-time updates
  function subscribeRealtime() {
    auth.onAuthStateChanged(function(user) {
      if (!user) return;
      db.collection('users').doc(user.uid).onSnapshot(function(doc) {
        if (doc.exists) {
          currentProfile = doc.data();
          renderProfile(user, currentProfile);
        }
      });
    });
  }

  // Initial load
  loadProfile();
  subscribeRealtime();
})(); 