document.addEventListener('DOMContentLoaded', () => {
    console.log("💚 Huellita Solidaria - Navegación por Vistas Activa");

    // ===================================================
    // LÓGICA DE VISTAS/FRAMES
    // ===================================================

    const sections = document.querySelectorAll('.main-content .section');
    const menuLinks = document.querySelectorAll('.navbar .menu a, .donaciones a, .btn'); // Incluye el enlace Donar y botones generales

    // Función para mostrar solo el frame activo
    function showActiveFrame(targetId) {
        // 1. Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.remove('active-frame');
        });

        // 2. Mostrar la sección destino
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-frame');
            
            // 3. Forzar el scroll a la parte superior de la sección activa
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // 4. Actualizar la URL 
            history.pushState(null, null, `#${targetId}`);
        }
    }

    // Inicializar la vista al cargar la página: Iniciar en 'sobre-nosotros'
    const initialHash = window.location.hash.substring(1) || 'sobre-nosotros';
    showActiveFrame(initialHash);


    // Escucha de clics en el menú y enlaces de navegación
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            
            // Obtener el ID de destino (ej: 'servicios' de '#servicios')
            const href = link.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return; // Ignorar enlaces externos o vacíos

            e.preventDefault();
            const targetId = href.substring(1); 
            
            showActiveFrame(targetId);

            // Cerrar menú móvil después de hacer clic
            const menu = document.querySelector('.navbar .menu');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });

    // ===================================================
    // LÓGICA DE CARRUSEL, MENÚ MÓVIL Y LOGIN
    // ===================================================

    // Lógica del Carrusel (Mantener si existe el HTML)
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        let currentSlide = 0;
        const totalSlides = 3; // Asumiendo 3 slides
        const slideWidth = 100 / totalSlides;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`; 
        }
        // Desactivado para no interferir con la navegación por frames inicial
        // setInterval(nextSlide, 5000); 
    }
    
    // Toggle para el menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.navbar .menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Lógica de Login
    const authText = document.getElementById('auth-text');
    const loginBtn = document.querySelector('.fa-user');

    let logged = localStorage.getItem('logged') === 'true';
    actualizarLogin();

    loginBtn?.addEventListener('click', () => {
        if (logged) {
            logged = false;
            localStorage.setItem('logged', false);
            alert("Has cerrado sesión");
        } else {
            const usuario = prompt("Ingresa tu nombre para iniciar sesión");
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

