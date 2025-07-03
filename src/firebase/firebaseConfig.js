// Configuración de Firebase para el navegador
const firebaseConfig = {
  apiKey: "AIzaSyBycR7Uvj-jOTCQY2k944pYFvsnvPtXsaw",
  authDomain: "expo-project-e9725.firebaseapp.com",
  projectId: "expo-project-e9725",
  storageBucket: "expo-project-e9725.appspot.com",
  messagingSenderId: "1066097953797",
  appId: "1:1066097953797:web:9b49b177288270f90d206c",
  measurementId: "G-STKXMVVGZJ"
};

// Inicializar Firebase solo si no está inicializado
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}