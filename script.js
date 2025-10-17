// HUELLITA SOLIDARIA 🐾 - script.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("💚 Bienvenido a Huellita Solidaria");

  const cartCount = document.getElementById('cart-count');
  let apoyos = parseInt(localStorage.getItem('apoyos')) || 0;
  cartCount.textContent = `(${apoyos})`;

  function apoyarCampaña(nombre) {
    apoyos++;
    localStorage.setItem('apoyos', apoyos);
    cartCount.textContent = `(${apoyos})`;
    alert(`🐾 ¡Gracias por apoyar la campaña "${nombre}"!`);
  }

  const subscribeBtn = document.getElementById('subscribe-btn');
  const emailInput = document.getElementById('newsletter-email');

  subscribeBtn?.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Por favor ingresa un correo electrónico 📨");
      return;
    }
    let lista = JSON.parse(localStorage.getItem('suscriptores')) || [];
    lista.push(email);
    localStorage.setItem('suscriptores', JSON.stringify(lista));
    alert(`💚 Gracias por unirte, ${email}!`);
    emailInput.value = '';
  });

  const loginBtn = document.querySelector('.fa-user');
  const authText = document.getElementById('auth-text');

  let logged = localStorage.getItem('logged') === 'true';
  actualizarLogin();

  loginBtn?.addEventListener('click', () => {
    if (logged) {
      logged = false;
      localStorage.setItem('logged', false);
      alert("Has cerrado sesión 💤");
    } else {
      const usuario = prompt("Ingresa tu nombre para iniciar sesión 🐕");
      if (usuario) {
        logged = true;
        localStorage.setItem('logged', true);
        localStorage.setItem('usuario', usuario);
        alert(`Bienvenido, ${usuario}! 🐾`);
      }
    }
    actualizarLogin();
  });

  function actualizarLogin() {
    const usuario = localStorage.getItem('usuario');
    authText.textContent = logged ? usuario || 'Voluntario' : 'Mi cuenta';
  }
});
