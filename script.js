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
    const revealElements = document.querySelectorAll('.content-wrapper, .cards-grid, .checklist, .autora-content, .manifiesto, .descripcion-box, .comentarios-grid');
    
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
// PARALLAX SUAVE EN HERO (Desactivado para evitar problemas)
// ============================================
// Parallax desactivado para evitar que el hero se oculte al hacer scroll

// ============================================
// TRACKING DE EVENTOS Y REDIRECCIÓN AL PAGO
// ============================================
document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Tracking para analytics
        const timestamp = new Date().toISOString();
        const clickData = {
            timestamp: timestamp,
            button: 'Agregar al carrito',
            product: 'Calendario Astrológico 2026',
            price: 15,
            currency: 'USD'
        };
        
        // Guardar en localStorage para analytics
        let clicks = JSON.parse(localStorage.getItem('cart_clicks') || '[]');
        clicks.push(clickData);
        localStorage.setItem('cart_clicks', JSON.stringify(clicks));
        
        // Log en consola
        console.log('CTA clicked:', clickData);
        console.log('Total clicks:', clicks.length);
        
        // Facebook Pixel (si lo tienes configurado)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: 'Calendario Astrológico 2026',
                content_category: 'Producto Digital',
                value: 15,
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
// FUNCIÓN PARA VER ESTADÍSTICAS DE CLICKS
// ============================================
// Ejecuta esto en la consola del navegador para ver las estadísticas:
// verEstadisticasClicks()
function verEstadisticasClicks() {
    const clicks = JSON.parse(localStorage.getItem('cart_clicks') || '[]');
    console.log('=== ESTADÍSTICAS DE CLICKS ===');
    console.log('Total de clicks:', clicks.length);
    console.log('Todos los clicks:', clicks);
    
    // Agrupar por fecha
    const porFecha = {};
    clicks.forEach(click => {
        const fecha = click.timestamp.split('T')[0];
        porFecha[fecha] = (porFecha[fecha] || 0) + 1;
    });
    console.log('Clicks por fecha:', porFecha);
    
    return clicks;
}

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
// STICKY OFFER BAR CON COUNTDOWN
// ============================================
let countdownMinutes = 15;
let countdownSeconds = 0;
let countdownInterval = null;
let offerExpired = false;

function startCountdown() {
    const timerElement = document.getElementById('countdownTimer');
    const oldPriceElement = document.getElementById('oldPrice');
    const newPriceElement = document.getElementById('newPrice');
    const finalPriceElement = document.getElementById('finalPrice');
    const countdownContainer = document.getElementById('countdownContainer');
    const priceContainer = document.getElementById('floatingPriceContainer');
    
    if (!timerElement) return;

    countdownInterval = setInterval(() => {
        if (countdownSeconds === 0) {
            if (countdownMinutes === 0) {
                // Countdown terminado - cambiar precio
                clearInterval(countdownInterval);
                expireOffer();
                return;
            } else {
                countdownMinutes--;
                countdownSeconds = 59;
            }
        } else {
            countdownSeconds--;
        }

        // Formatear tiempo
        const minutes = countdownMinutes.toString().padStart(2, '0');
        const seconds = countdownSeconds.toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;

        // Agregar clase warning cuando quedan menos de 5 minutos
        if (countdownMinutes < 5) {
            timerElement.classList.add('warning');
        } else {
            timerElement.classList.remove('warning');
        }
    }, 1000);
}

function expireOffer() {
    offerExpired = true;
    const oldPriceElement = document.getElementById('oldPrice');
    const newPriceElement = document.getElementById('newPrice');
    const finalPriceElement = document.getElementById('finalPrice');
    const countdownContainer = document.getElementById('countdownContainer');
    const priceContainer = document.getElementById('floatingPriceContainer');
    
    if (!oldPriceElement || !newPriceElement || !finalPriceElement) return;

    // Ocultar countdown
    if (countdownContainer) {
        countdownContainer.style.display = 'none';
    }

    // Agregar clase para animación
    priceContainer.classList.add('price-expired');

    // Mover $15 a la posición de $25 (tachado)
    oldPriceElement.textContent = '$15';
    oldPriceElement.classList.add('price-moved');
    
    // Ocultar $15 original
    newPriceElement.style.display = 'none';
    
    // Mostrar $25 como precio final
    finalPriceElement.style.display = 'block';
    finalPriceElement.classList.add('price-final-visible');
}

function showStickyBar() {
    const floatingSidebar = document.getElementById('floatingOfferSidebar');
    const closeBtn = document.getElementById('closeSidebarBtn');
    
    if (!floatingSidebar) {
        console.error('floatingOfferSidebar no encontrado');
        return;
    }

    // Verificar si el usuario ya cerró el sidebar (localStorage)
    const sidebarClosed = localStorage.getItem('sidebarClosed');
    if (sidebarClosed === 'true') {
        floatingSidebar.classList.add('hidden');
        return;
    }

    // Asegurar que el sidebar no tenga la clase hidden inicialmente
    floatingSidebar.classList.remove('hidden');

    // Función para mostrar/ocultar según scroll
    function handleScroll() {
        if (floatingSidebar.classList.contains('hidden')) return;
        
        if (window.scrollY > 200) {
            floatingSidebar.classList.add('visible');
        } else {
            floatingSidebar.classList.remove('visible');
        }
    }

    // Mostrar después de hacer scroll 200px
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificar scroll inicial después de un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
        handleScroll();
    }, 100);

    // Funcionalidad del botón cerrar
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            floatingSidebar.classList.remove('visible');
            floatingSidebar.classList.add('hidden');
            // Guardar en localStorage para recordar la preferencia
            localStorage.setItem('sidebarClosed', 'true');
        });
    }
}

// ============================================
// CONTADOR DE DÍAS EN RESEÑAS
// ============================================
function updateReviewDates() {
    const reviewDates = document.querySelectorAll('.review-date[data-date-attr]');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
    
    reviewDates.forEach(dateElement => {
        const dateString = dateElement.getAttribute('data-date-attr');
        if (!dateString) return;
        
        // Parsear fecha (formato: YYYY-MM-DD)
        const reviewDate = new Date(dateString);
        reviewDate.setHours(0, 0, 0, 0);
        
        // Calcular diferencia en días
        const diffTime = today - reviewDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Formatear texto según los días
        let dateText;
        if (diffDays === 0) {
            dateText = 'Hoy';
        } else if (diffDays === 1) {
            dateText = 'Hace 1 día';
        } else if (diffDays < 7) {
            dateText = `Hace ${diffDays} días`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            dateText = weeks === 1 ? 'Hace 1 semana' : `Hace ${weeks} semanas`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            dateText = months === 1 ? 'Hace 1 mes' : `Hace ${months} meses`;
        } else {
            const years = Math.floor(diffDays / 365);
            dateText = years === 1 ? 'Hace 1 año' : `Hace ${years} años`;
        }
        
        // Actualizar el texto
        dateElement.textContent = dateText;
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    showStickyBar();
    updateReviewDates();
    
    // Actualizar las fechas de las reseñas cada día (cada 24 horas)
    setInterval(updateReviewDates, 24 * 60 * 60 * 1000);
});

// ============================================
// PREVENIR FLASH DE CONTENIDO SIN ESTILOS (FOUT)
// ============================================
document.documentElement.classList.add('js-enabled');
