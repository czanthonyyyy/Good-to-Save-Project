const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Obtener los formularios de Sign In y Sign Up
  const signInForm = document.querySelector('.sign-in-container form');
  const signUpForm = document.querySelector('.sign-up-container form');

  // Añadir un evento de submit a cada formulario
  signInForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    window.location.href = 'index.html'; // Redirigir a index.html
  });

  signUpForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    window.location.href = 'index.html'; // Redirigir a index.html
  });
});