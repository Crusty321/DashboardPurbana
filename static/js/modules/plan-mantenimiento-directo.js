document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 8. GRÁFICOS DEL PLAN DE MANTENIMIENTO
    // ==========================================
    const mtoGlobalCtx = document.getElementById('mtoGlobalChart')?.getContext('2d');
    if (mtoGlobalCtx) {
        new Chart(mtoGlobalCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mantenimientos', 'Pendientes'],
                datasets: [{
                    data: [27, 277],
                    backgroundColor: ['#27ae60', '#e1e8ed'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '70%'
            }
        });
    }

    const mtoProgresoCtx = document.getElementById('mtoProgresoMensualChart')?.getContext('2d');
    if (mtoProgresoCtx) {
        new Chart(mtoProgresoCtx, {
            type: 'line',
            data: {
                labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Equipos (Avance Real)',
                    data: [6, 18, 27, null, null, null],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Equipos (Meta Proyectada)',
                    data: [6, 18, 30, 42, 47, 50],
                    borderColor: '#bdc3c7',
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 50 }
                }
            }
        });
    }

    // ==========================================
    // Lógica del Mapa Radial de Protocolos
    // ==========================================
    const protocolData = {
        1: {
            title: "1. Recepción y Escalamiento",
            icon: "fa-sitemap",
            color: "#7f8c8d",
            desc: "Define el flujo inicial de atención a usuarios, categorización de incidentes y rutas de escalamiento hacia especialistas TI de nivel 2 y 3.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Registro:</strong> Ingreso del ticket en sistema con categorización inicial.</li>",
                "<li style='margin-bottom: 8px;'><strong>Priorización:</strong> Asignación de niveles de urgencia e impacto.</li>",
                "<li><strong>Escalamiento:</strong> Derivación automática según la matriz de especialidad.</li>"
            ]
        },
        2: {
            title: "2. Soporte Remoto y Sitio",
            icon: "fa-suitcase-medical",
            color: "#3498db",
            desc: "Establece los lineamientos técnicos y de etiqueta para la atención de fallas de hardware y software, tanto vía remota como en presencia física.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Diagnóstico Remoto:</strong> Uso de herramientas de conexión cifrada (AnyDesk/TeamViewer).</li>",
                "<li style='margin-bottom: 8px;'><strong>Intervención:</strong> Resolución en primera línea o agendamiento de visita.</li>",
                "<li><strong>Cierre en sitio:</strong> Verificación física con firma de usuario final.</li>"
            ]
        },
        3: {
            title: "3. Mantenimiento Preventivo",
            icon: "fa-screwdriver-wrench",
            color: "#2ecc71",
            desc: "El mantenimiento preventivo garantiza la operatividad y prolonga la vida útil de los activos tecnológicos de Primavera Urbana, reduciendo los riesgos de fallos imprevistos. Este protocolo abarca limpieza física, depuración de software, revisión de conexiones y actualizaciones de seguridad.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Planificación:</strong> Seguimiento del cronograma mensual (3 equipos semanales).</li>",
                "<li style='margin-bottom: 8px;'><strong>Ejecución:</strong> Aplicación de las 5 fases estandarizadas (Diagnóstico, Documental, Hardware, Software, Pruebas).</li>",
                "<li><strong>Cierre:</strong> Firma de actas de conformidad y actualización obligatoria de Hojas de Vida de los equipos.</li>"
            ]
        },
        4: {
            title: "4. Gestión de Respaldos",
            icon: "fa-database",
            color: "#9b59b6",
            desc: "Garantiza la integridad y disponibilidad de la información crítica del negocio a través de políticas automatizadas de copias de seguridad.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Periodicidad:</strong> Respaldos incrementales diarios y completos semanales.</li>",
                "<li style='margin-bottom: 8px;'><strong>Almacenamiento:</strong> Regla 3-2-1 con copias en la nube y repositorio local offline.</li>",
                "<li><strong>Restauración:</strong> Pruebas trimestrales de recuperación de datos (Disaster Recovery Test).</li>"
            ]
        },
        5: {
            title: "5. Conectividad y Redes",
            icon: "fa-network-wired",
            color: "#e67e22",
            desc: "Políticas para el mantenimiento del cableado estructurado, configuración de switches, routers y asignación segura de IPs en la red corporativa.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Monitoreo:</strong> Revisión constante de latencia y disponibilidad de enlaces.</li>",
                "<li style='margin-bottom: 8px;'><strong>Mantenimiento:</strong> Limpieza de gabinetes y peinado de racks (semestral).</li>",
                "<li><strong>Seguridad de Red:</strong> Segmentación mediante VLANs y control de acceso MAC.</li>"
            ]
        },
        6: {
            title: "6. Ciberseguridad",
            icon: "fa-shield-halved",
            color: "#e74c3c",
            desc: "Lineamientos obligatorios para la protección de endpoints, políticas de contraseñas, firewall y prevención de intrusiones a nivel organizacional.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Prevención:</strong> Actualización de firmas de EDR/Antivirus y escaneo profundo.</li>",
                "<li style='margin-bottom: 8px;'><strong>Accesos:</strong> Auditoría de permisos y MFA (Autenticación Multifactor).</li>",
                "<li><strong>Respuesta:</strong> Protocolo de aislamiento de red ante sospecha de malware.</li>"
            ]
        },
        7: {
            title: "7. Disaster Recovery",
            icon: "fa-house-crack",
            color: "#d35400",
            desc: "Plan de acción detallado para la rápida restauración de los servicios de TI tras eventos catastróficos, fallas masivas de energía o ataques graves.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Activación:</strong> Declaración de emergencia y pase a servidores de contingencia.</li>",
                "<li style='margin-bottom: 8px;'><strong>RTO / RPO:</strong> Tiempos de recuperación definidos y objetivos de pérdida de datos.</li>",
                "<li><strong>Comunicación:</strong> Cadena de notificaciones a gerencia y usuarios afectados.</li>"
            ]
        },
        8: {
            title: "8. Gestión de Cambios",
            icon: "fa-diagram-project",
            color: "#1abc9c",
            desc: "Procedimiento para autorizar, documentar y ejecutar modificaciones en la infraestructura tecnológica sin interrumpir la operación normal.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Propuesta:</strong> Análisis de impacto, ventana de mantenimiento y riesgos.</li>",
                "<li style='margin-bottom: 8px;'><strong>Aprobación:</strong> Revisión por el comité de cambios TI (CAB).</li>",
                "<li><strong>Rollback:</strong> Plan de retorno inmediato en caso de falla durante la implementación.</li>"
            ]
        },
        9: {
            title: "9. Control de Activos",
            icon: "fa-boxes-stacked",
            color: "#34495e",
            desc: "Normativa para la recepción, asignación, traslado y baja de equipos informáticos, garantizando un inventario siempre actualizado.",
            list: [
                "<li style='margin-bottom: 8px;'><strong>Asignación:</strong> Entrega de equipos con firma de acta de responsabilidad.</li>",
                "<li style='margin-bottom: 8px;'><strong>Trazabilidad:</strong> Uso de etiquetas de código de barras y software de inventario.</li>",
                "<li><strong>Baja Técnica:</strong> Proceso de descarte seguro, borrado de disco y disposición final.</li>"
            ]
        }
    };

    const nodos = document.querySelectorAll('.nodo-periferico');
    const panel = document.getElementById('protocol-detail-panel');
    const panelTitle = document.getElementById('panel-title');
    const panelIcon = document.getElementById('panel-icon');
    const panelDesc = document.getElementById('panel-desc');
    const panelList = document.getElementById('panel-list');

    if (nodos.length > 0 && panel) {
        nodos.forEach(nodo => {
            nodo.addEventListener('click', function() {
                // Quitar clase selected de todos
                nodos.forEach(n => n.classList.remove('selected'));
                
                // Agregar clase selected al actual
                this.classList.add('selected');
                
                const id = this.getAttribute('data-id');
                const data = protocolData[id];
                
                if (data) {
                    // Animación suave (fade-out/in)
                    panel.style.opacity = '0.4';
                    
                    setTimeout(() => {
                        // Actualizar borde superior
                        panel.style.borderTopColor = data.color;
                        
                        // Actualizar encabezado
                        panelTitle.textContent = data.title;
                        panelIcon.className = `fa-solid ${data.icon}`;
                        panelIcon.style.color = data.color;
                        
                        // Actualizar descripción
                        panelDesc.textContent = data.desc;
                        
                        // Actualizar lista
                        panelList.innerHTML = data.list.join('');
                        
                        panel.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

});