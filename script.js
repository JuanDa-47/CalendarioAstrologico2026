// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Aplicar animación a elementos
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.content-wrapper, .cards-grid, .checklist, .autora-content, .garantia-box, .manifiesto, .descripcion-box');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ============================================
// FAQ ACCORDEON
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');
        
        pregunta.addEventListener('click', () => {
            // Cerrar otros items si están abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            item.classList.toggle('active');
        });
    });
});

// ============================================
// PARALLAX SUAVE EN HERO
// ============================================
let lastScroll = 0;
const hero = document.querySelector('.hero-producto');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < hero.offsetHeight && scrolled >= 0) {
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    }, { passive: true });
}

// ============================================
// TRACKING DE EVENTOS Y REDIRECCIÓN AL PAGO
// ============================================
document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Tracking para analytics (opcional)
        console.log('CTA clicked: Agregar al carrito');
        
        // Google Analytics (si lo tienes configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'add_to_cart', {
                'event_category': 'ecommerce',
                'event_label': 'Calendario Astrológico 2026',
                'value': 10,
                'currency': 'USD'
            });
        }
        
        // Facebook Pixel (si lo tienes configurado)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: 'Calendario Astrológico 2026',
                content_category: 'Producto Digital',
                value: 10,
                currency: 'USD'
            });
        }
        
        // Redirigir al pago usando la función de config.js
        if (typeof irAlPago === 'function') {
            irAlPago();
        } else {
            // Fallback si config.js no está cargado
            alert('Por favor, configura tu link de pago en el archivo config.js');
            console.error('Configuración de pago no encontrada. Revisa config.js');
        }
    });
});

// ============================================
// EFECTO DE GLOW EN CARDS AL HOVER
// ============================================
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// ============================================
// PREVENIR FLASH DE CONTENIDO SIN ESTILOS (FOUT)
// ============================================
document.documentElement.classList.add('js-enabled');
