// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esto sirve para ver cuando todos los elementos estén cargados
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    // Le da la función al botón de quitar
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrega funcionalidad al botón sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Le pone función al botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agrega funcionalidad al botón Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agrega funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

// Cuando le das comprar, elimina todos los elementos del carrito y se oculta
function pagarClicked() {
    // Redirige a la página de métodos de pago
    window.location.href = 'paymenthmethod.html';
}

// Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

// Función que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agrega la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregamos la funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agrega la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();
}

// Aumenta en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Resta en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimina el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    // Actualiza el total del carrito
    actualizarTotalCarrito();

    // La siguiente función controla si hay elementos en el carrito
    // Si no hay elimino el carrito
    ocultarCarrito();
}

// Función que controla si hay elementos en el carrito. Si no hay oculta el carrito.
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Actualiza el total de Carrito
function actualizarTotalCarrito() {
    // Selecciona el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    // Recorre cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        // Quita el símbolo de peso y convierte el precio a número flotante
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace(',', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseFloat(cantidadItem.value);
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    // Muestra el total con dos decimales siempre
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toFixed(2);
}

// --- INICIO: Sistema de avatar y dashboard de usuario ---
// Asegúrate de que los scripts de Firebase y firebaseConfig.js estén cargados antes de este script
(function() {
  // DEBUG: Log de inicio
  console.log('[AuthAvatar] Inicializando sistema de avatar y dashboard...');
  // Observer pattern para auth state
  const listeners = [];
  let authState = { status: 'INIT', user: null, error: null };
  function notify() { listeners.forEach(fn => fn(authState)); }
  function subscribe(fn) { listeners.push(fn); fn(authState); return () => { const idx = listeners.indexOf(fn); if (idx > -1) listeners.splice(idx, 1); }; }
  function sanitizeURL(url) { return url ? url.replace(/"/g, '&quot;') : ''; }

  function getInitials(name, email) {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase();
    if (email) return email[0].toUpperCase();
    return '?';
  }

  function renderAvatar(user) {
    let avatarHTML = '';
    if (user.photoURL) {
      avatarHTML = `<img src="${sanitizeURL(user.photoURL)}" alt="Avatar" class="user-avatar-img" />`;
    } else if (user.displayName || user.name) {
      const initials = getInitials(user.displayName || user.name, user.email);
      avatarHTML = `<span class="user-avatar-initials">${initials}</span>`;
    } else {
      avatarHTML = `<span class="user-avatar-default">?</span>`;
    }
    return `<button id="user-avatar-btn" aria-label="Open dashboard" class="user-avatar-btn">${avatarHTML}<span class="user-avatar-status online" aria-label="Online"></span></button>`;
  }

  function renderDashboard(user) {
    return `
      <div class="user-dashboard-modal" id="user-dashboard-modal" role="dialog" aria-modal="true">
        <div class="dashboard-content">
          <header>
            <span class="dashboard-avatar">${user.profilePicUrl ? `<img src="${sanitizeURL(user.profilePicUrl)}" alt="Avatar" />` : (user.photoURL ? `<img src="${sanitizeURL(user.photoURL)}" alt="Avatar" />` : `<span>${getInitials(user.displayName || user.name, user.email)}</span>`)}</span>
            <span class="dashboard-name">${user.displayName || user.name || user.email}</span>
            <span class="dashboard-email">${user.email}</span>
            <button id="dashboard-close" aria-label="Close">&times;</button>
          </header>
          <nav>
            <button data-tab="profile" class="dashboard-tab-btn">Profile</button>
            <button data-tab="settings" class="dashboard-tab-btn">Settings</button>
            <button data-tab="activity" class="dashboard-tab-btn">Activity</button>
          </nav>
          <main id="dashboard-main"></main>
          <footer>
            <button id="logout-btn" class="logout-btn">Logout</button>
          </footer>
        </div>
      </div>
    `;
  }

  function showDashboard(user) {
    let modal = document.getElementById('user-dashboard-modal');
    if (modal) modal.remove();
    document.body.insertAdjacentHTML('beforeend', renderDashboard(user));
    modal = document.getElementById('user-dashboard-modal');
    const main = modal.querySelector('#dashboard-main');
    const closeBtn = modal.querySelector('#dashboard-close');
    const logoutBtn = modal.querySelector('#logout-btn');
    const tabBtns = modal.querySelectorAll('.dashboard-tab-btn');
    function renderTab(tab) {
      switch(tab) {
        case 'profile':
          return `<div style="max-height: 350px; overflow-y: auto;"><h3>Profile</h3>
            <p><strong>Name:</strong> ${user.displayName || user.name || ''}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Bio:</strong> ${user.bio || ''}</p>
            <p><strong>Phone:</strong> ${user.phone || ''}</p>
            <p><strong>Date of Birth:</strong> ${user.dob || ''}</p>
            <p><strong>Location:</strong> ${user.location || ''}</p>
            <p><strong>Gender:</strong> ${user.gender || ''}</p>
            <p><strong>Occupation:</strong> ${user.occupation || ''}</p>
            <p><strong>Social:</strong> ${user.social ? `<a href='${sanitizeURL(user.social)}' target='_blank'>${user.social}</a>` : ''}</p>
            <p><strong>Interests:</strong> ${(user.interests && user.interests.length) ? user.interests.join(', ') : ''}</p>
          </div>`;
        case 'settings':
          return `<div><h3>Settings</h3><p>Preferencias y notificaciones próximamente.</p></div>`;
        case 'activity':
          return `<div><h3>Activity</h3><p>Historial de actividad próximamente.</p></div>`;
        default:
          return '';
      }
    }
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        main.innerHTML = renderTab(btn.dataset.tab);
      };
    });
    // Default tab
    tabBtns[0].click();
    closeBtn.onclick = () => modal.remove();
    logoutBtn.onclick = () => { firebase.auth().signOut(); modal.remove(); };
    // Accesibilidad: cerrar con ESC
    modal.onkeydown = (e) => { if (e.key === 'Escape') modal.remove(); };
    modal.focus();
  }

  // Suscripción al estado de auth para el header
  document.addEventListener('DOMContentLoaded', function() {
    const userArea = document.getElementById('user-area');
    if (!userArea) {
      console.error('[AuthAvatar] No se encontró el elemento #user-area en el DOM.');
      const fallback = document.createElement('div');
      fallback.textContent = 'Error: No se encontró el área de usuario.';
      fallback.style.color = 'red';
      document.body.prepend(fallback);
      return;
    }
    subscribe(state => {
      console.log('[AuthAvatar] Estado de autenticación:', state);
      if (state.status === 'AUTHENTICATED' && state.user) {
        userArea.innerHTML = renderAvatar(state.user);
        const btn = document.getElementById('user-avatar-btn');
        if (btn) btn.onclick = () => showDashboard(state.user);
      } else if (state.status === 'LOADING' || state.status === 'INIT') {
        userArea.innerHTML = '<span class="user-avatar-loading">Loading...</span>';
      } else if (state.status === 'ERROR') {
        userArea.innerHTML = `<span style='color:red;'>Error: ${state.error}</span>`;
      } else {
        userArea.innerHTML = `<a href="public/pages/log in form.html" title="sign-up" class="button button-primary cta">Sign Up</a>`;
      }
    });
  });

  // Listener de Firebase Auth
  if (typeof firebase !== 'undefined') {
    try {
      firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            const profile = doc.exists ? doc.data() : {};
            authState = { status: 'AUTHENTICATED', user: { ...user, ...profile }, error: null };
          } catch (e) {
            authState = { status: 'ERROR', user: null, error: e.message };
          }
        } else {
          authState = { status: 'UNAUTHENTICATED', user: null, error: null };
        }
        notify();
      });
    } catch (e) {
      console.error('[AuthAvatar] Error inicializando Firebase Auth:', e);
      authState = { status: 'ERROR', user: null, error: e.message };
      notify();
    }
  } else {
    console.error('[AuthAvatar] Firebase no está definido.');
    authState = { status: 'ERROR', user: null, error: 'Firebase no está definido.' };
    notify();
  }
})();
// --- FIN: Sistema de avatar y dashboard de usuario ---

// --- Enhanced Registration Logic for New Profile Fields ---
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;
  const signupErrorMessage = document.getElementById('signup-error-message');

  // Helper: Validate interests
  function validateInterests(str) {
    if (!str) return true;
    return str.split(',').every(s => s.trim().length >= 2 && s.trim().length <= 30);
  }

  // Helper: Validate file
  function validateProfilePic(file) {
    if (!file) return true;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return validTypes.includes(file.type) && file.size <= 2 * 1024 * 1024;
  }

  // Helper: Sanitize text
  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let isValid = true;
    signupErrorMessage.style.display = 'none';
    signupErrorMessage.textContent = '';
    const fields = {
      firstname: document.getElementById('signup-firstname'),
      lastname: document.getElementById('signup-lastname'),
      email: document.getElementById('signup-email'),
      password: document.getElementById('signup-password'),
      phone: document.getElementById('signup-phone'),
      dob: document.getElementById('signup-dob'),
      bio: document.getElementById('signup-bio'),
      location: document.getElementById('signup-location'),
      gender: document.getElementById('signup-gender'),
      occupation: document.getElementById('signup-occupation'),
      social: document.getElementById('signup-social'),
      interests: document.getElementById('signup-interests'),
      profilepic: document.getElementById('signup-profilepic')
    };
    // Validate required fields
    Object.keys(fields).forEach(key => {
      const input = fields[key];
      if (!input) return;
      const parent = input.parentElement;
      const errorMessage = parent.querySelector('.validation-message');
      let valid = true;
      if (input.required && !input.value) {
        parent.classList.add('error');
        errorMessage.textContent = `Please enter your ${input.getAttribute('aria-label')}`;
        valid = false;
      } else if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
        parent.classList.add('error');
        errorMessage.textContent = `Please enter a valid ${input.getAttribute('aria-label')}`;
        valid = false;
      } else if (key === 'interests' && !validateInterests(input.value)) {
        parent.classList.add('error');
        errorMessage.textContent = 'Each interest must be 2-30 chars.';
        valid = false;
      } else if (key === 'bio' && input.value.length > 300) {
        parent.classList.add('error');
        errorMessage.textContent = 'Bio must be less than 300 characters.';
        valid = false;
      } else if (key === 'profilepic' && input.files.length > 0 && !validateProfilePic(input.files[0])) {
        parent.classList.add('error');
        errorMessage.textContent = 'Invalid image file (JPG/PNG/WebP, max 2MB).';
        valid = false;
      } else {
        parent.classList.remove('error');
        parent.classList.add('success');
      }
      if (!valid) isValid = false;
    });
    if (!isValid) return;
    // Prepare data
    const firstName = sanitize(fields.firstname.value.trim());
    const lastName = sanitize(fields.lastname.value.trim());
    const email = fields.email.value.trim();
    const password = fields.password.value;
    const phone = fields.phone.value.trim();
    const dob = fields.dob.value;
    const bio = sanitize(fields.bio.value.trim());
    const location = sanitize(fields.location.value.trim());
    const gender = fields.gender.value;
    const occupation = sanitize(fields.occupation.value.trim());
    const social = fields.social.value.trim();
    const interests = fields.interests.value.split(',').map(s => sanitize(s.trim())).filter(Boolean);
    const profilePicFile = fields.profilepic.files[0];
    const displayName = `${firstName} ${lastName}`;
    const submitButton = signupForm.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    try {
      // Create user in Firebase Auth
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.updateProfile({ displayName });
      // Upload profile picture if present
      let photoURL = '';
      if (profilePicFile) {
        const storageRef = firebase.storage().ref(`profile_pictures/${user.uid}/profile.jpg`);
        await storageRef.put(profilePicFile);
        photoURL = await storageRef.getDownloadURL();
        await user.updateProfile({ photoURL });
      }
      // Store user profile in Firestore
      await firebase.firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        displayName,
        email,
        phone,
        dob,
        bio,
        location,
        gender,
        occupation,
        social,
        interests,
        photoURL,
        createdAt: new Date(),
        preferences: {},
      });
      setTimeout(() => {
        submitButton.classList.remove('loading');
        window.location.href = '/index.html';
      }, 800);
    } catch (error) {
      submitButton.classList.remove('loading');
      let message = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          message = 'The email address is not valid.';
          break;
        case 'auth/weak-password':
          message = 'The password is too weak. It must be at least 8 characters.';
          break;
        default:
          message = error.message || 'An error occurred while signing up. Please try again.';
      }
      signupErrorMessage.textContent = message;
      signupErrorMessage.style.display = 'block';
    }
  });
});

// --- Paginación del catálogo ---
document.addEventListener('DOMContentLoaded', function() {
    const itemsPorPagina = 6;
    const items = Array.from(document.querySelectorAll('.contenedor-items .item'));
    const totalPaginas = Math.ceil(items.length / itemsPorPagina);
    let paginaActual = 1;

    function mostrarPagina(pagina) {
        paginaActual = pagina;
        items.forEach((item, idx) => {
            item.style.display = (idx >= (pagina-1)*itemsPorPagina && idx < pagina*itemsPorPagina) ? '' : 'none';
        });
        // Actualizar botones activos
        document.querySelectorAll('.catalog-pagination .page-num').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.page) === pagina);
        });
        // Deshabilitar flechas si corresponde
        document.getElementById('prev-page').disabled = (pagina === 1);
        document.getElementById('next-page').disabled = (pagina === totalPaginas);
    }

    // Listeners para los botones de página
    document.querySelectorAll('.catalog-pagination .page-num').forEach(btn => {
        btn.addEventListener('click', function() {
            mostrarPagina(parseInt(this.dataset.page));
        });
    });
    document.getElementById('prev-page').addEventListener('click', function() {
        if (paginaActual > 1) mostrarPagina(paginaActual - 1);
    });
    document.getElementById('next-page').addEventListener('click', function() {
        if (paginaActual < totalPaginas) mostrarPagina(paginaActual + 1);
    });

    // Inicializar mostrando la primera página
    mostrarPagina(1);
});
