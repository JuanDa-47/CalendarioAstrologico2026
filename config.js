// ============================================
// CONFIGURACIÓN DE PAGO
// ============================================
// Elige una de las siguientes opciones y reemplaza el link con el tuyo

const CONFIG_PAGO = {
    // OPCIÓN 1: GUMROAD (Recomendado - Más fácil)
    // 1. Crea una cuenta en gumroad.com
    // 2. Sube tu PDF como producto
    // 3. Copia el link de compra directa
    // 4. Pégalo aquí:
    tipo: 'gumroad', // 'gumroad', 'stripe', 'paypal', 'hotmart', 'custom'
    link: 'https://astrologiaholistica.gumroad.com/l/odcak', // REEMPLAZA CON TU LINK
    
    // OPCIÓN 2: STRIPE PAYMENT LINKS
    // 1. Crea cuenta en stripe.com
    // 2. Ve a Products > Payment Links
    // 3. Crea un Payment Link para tu producto
    // 4. Copia el link y pégalo aquí
    // tipo: 'stripe',
    // link: 'https://buy.stripe.com/tu-link',
    
    // OPCIÓN 3: PAYPAL
    // 1. Crea un botón de pago en paypal.com/buttons
    // 2. O usa PayPal.me: paypal.me/tu-usuario/10
    // tipo: 'paypal',
    // link: 'https://www.paypal.me/luhers66',
    
    // OPCIÓN 4: HOTMART
    // 1. Crea cuenta en hotmart.com
    // 2. Crea tu producto digital
    // 3. Copia el link de checkout
    // tipo: 'hotmart',
    // link: 'https://pay.hotmart.com/tu-link',
    
    // OPCIÓN 5: LINK PERSONALIZADO
    // Si ya tienes tu propia plataforma de pago
    // tipo: 'custom',
    // link: 'https://tu-sitio.com/checkout',
};

// ============================================
// FUNCIÓN PARA REDIRIGIR AL PAGO
// ============================================
function irAlPago() {
    // Abre en la misma ventana (recomendado para mejor conversión)
    window.location.href = CONFIG_PAGO.link;
    
    // O si prefieres abrir en nueva pestaña, descomenta esta línea:
    // window.open(CONFIG_PAGO.link, '_blank');
}

