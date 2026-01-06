// ============================================
// CONFIGURACIÓN DE PAGO
// ============================================

const CONFIG_PAGO = {
    // OPCIÓN 1: GUMROAD (Recomendado - Más fácil)
    // 1. Crea una cuenta en gumroad.com
    // 2. Sube tu PDF como producto
    // 3. Copia el link de compra directa
    // 4. Pégalo aquí:
    tipo: 'gumroad', // 'gumroad', 'stripe', 'paypal', 'hotmart', 'custom'
    link: 'https://astrologiaholistica.gumroad.com/l/odcak', // REEMPLAZA CON TU LINK
    
    //PAYPAL
    // tipo: 'paypal',
    // link: 'https://www.paypal.me/luhers66',
    
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


