document.addEventListener('DOMContentLoaded', () => {

    
    // ==========================================
    // 1. NAVEGACIÓN GENERAL (Pestañas del Menú)
    // ==========================================
    // Navigación adaptada para múltiples archivos HTML
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetTab = trigger.getAttribute('data-tab');
            if (targetTab === 'resumen') {
                window.location.href = 'index.html';
            } else if (targetTab) {
                window.location.href = targetTab + '.html';
            }
        });
    });

});