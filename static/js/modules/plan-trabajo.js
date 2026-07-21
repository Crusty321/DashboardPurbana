document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 2. NAVEGACIÓN DEL MAPA CONCEPTUAL
    // ==========================================
    const nodosMapa = document.querySelectorAll('.nodo-secundario');
    const btnVolverList = document.querySelectorAll('.btn-volver');
    const subVistas = document.querySelectorAll('.sub-vista');

    nodosMapa.forEach(nodo => {
        nodo.addEventListener('click', () => {
            const targetId = nodo.getAttribute('data-target');
            subVistas.forEach(vista => vista.classList.remove('active-sub-vista'));
            document.getElementById(targetId).classList.add('active-sub-vista');
        });
    });

    btnVolverList.forEach(btn => {
        btn.addEventListener('click', () => {
            subVistas.forEach(vista => vista.classList.remove('active-sub-vista'));
            document.getElementById('vista-mapa').classList.add('active-sub-vista');
        });
    });

    // ==========================================
    // 3. LOGICA ACORDEÓN (Tabla inventario inicial)
    // ==========================================
    const btnVerTodo = document.getElementById('btn-ver-todo');
    const filasInventario = document.getElementById('filas-inventario');

    if(btnVerTodo && filasInventario) {
        btnVerTodo.addEventListener('click', () => {
            filasInventario.classList.toggle('mostrar');
            if(filasInventario.classList.contains('mostrar')) {
                btnVerTodo.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ocultar Inventario Completo';
            } else {
                btnVerTodo.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Ver Inventario Completo (69 Equipos)';
            }
        });
    }

    // ==========================================
    // LÓGICA MODAL DOCUMENTO MARCO
    // ==========================================
    const btnVerMarco = document.getElementById('btnVerMarco');
    const modalDocumentoMarco = document.getElementById('modalDocumentoMarco');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const contenidoModalMarco = document.getElementById('contenidoModalMarco');
    const templateMarco = document.getElementById('templateMarco');

    if (btnVerMarco && modalDocumentoMarco && btnCloseModal && contenidoModalMarco && templateMarco) {
        btnVerMarco.addEventListener('click', () => {
            contenidoModalMarco.innerHTML = templateMarco.innerHTML;
            modalDocumentoMarco.style.display = 'block';
        });

        const cerrarModal = () => {
            modalDocumentoMarco.style.display = 'none';
        };

        btnCloseModal.addEventListener('click', cerrarModal);

        window.addEventListener('click', (event) => {
            if (event.target === modalDocumentoMarco) {
                cerrarModal();
            }
        });
    }

});
});