document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 5. PROCESAMIENTO DINÁMICO DE EXCEL (SheetJS)
    // ==========================================
    const excelUpload = document.getElementById('excel-upload');
    const tableHeader = document.querySelector('.table-header');
    const dataTable = document.querySelector('.data-table');
    const btnLimpiar = document.getElementById('btn-limpiar');
    let workbookData = {};
    let originalTableHTML = dataTable ? dataTable.innerHTML : '';

    if (excelUpload) {
        excelUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                workbookData = {};
                let sheetNames = workbook.SheetNames;

                sheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
                    workbookData[sheetName] = jsonData;
                });

                crearSelectorDeHojas(sheetNames);
                if(sheetNames.length > 0) {
                    renderizarTabla(sheetNames[0]);
                }
                
                if (btnLimpiar) btnLimpiar.style.display = 'inline-flex';
            };
            reader.readAsArrayBuffer(file);
        });
    }

    function crearSelectorDeHojas(sheetNames) {
        const oldSelector = document.getElementById('sheet-selector-container');
        if (oldSelector) oldSelector.remove();

        const container = document.createElement('div');
        container.id = 'sheet-selector-container';
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';

        const label = document.createElement('label');
        label.innerText = 'Seleccionar Categoría de Activo: ';
        label.style.fontWeight = 'bold';
        label.style.color = 'var(--primary-color)';
        label.style.marginRight = '10px';

        const select = document.createElement('select');
        select.id = 'sheet-selector';
        select.style.padding = '8px';
        select.style.borderRadius = '5px';
        select.style.border = '1px solid var(--border-color)';

        sheetNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.innerText = name;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            renderizarTabla(e.target.value);
        });

        container.appendChild(label);
        container.appendChild(select);
        
        if (tableHeader && dataTable) {
            tableHeader.parentNode.insertBefore(container, dataTable);
        }
    }

    function renderizarTabla(sheetName) {
        if (!dataTable) return;
        const data = workbookData[sheetName];
        if (!data || data.length === 0) {
            dataTable.innerHTML = '<tbody><tr><td colspan="100%" style="text-align:center;">No hay datos en esta hoja</td></tr></tbody>';
            return;
        }

        const columns = Object.keys(data[0]);

        let theadHtml = '<thead><tr>';
        columns.forEach(col => {
            theadHtml += `<th>${col}</th>`;
        });
        theadHtml += '</tr></thead>';

        let tbodyHtml = '<tbody>';
        data.forEach(row => {
            tbodyHtml += '<tr>';
            columns.forEach(col => {
                let cellValue = row[col];
                tbodyHtml += `<td>${cellValue !== undefined ? cellValue : ''}</td>`;
            });
            tbodyHtml += '</tr>';
        });
        tbodyHtml += '</tbody>';

        dataTable.innerHTML = theadHtml + tbodyHtml;
        if (btnVerTodo) btnVerTodo.style.display = 'none';
    }

    // ==========================================
    // 6. LÓGICA BOTÓN LIMPIAR TABLA EXCEL
    // ==========================================
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            if (excelUpload) excelUpload.value = '';
            if (dataTable) dataTable.innerHTML = originalTableHTML;
            
            btnLimpiar.style.display = 'none';
            
            const oldSelector = document.getElementById('sheet-selector-container');
            if (oldSelector) oldSelector.remove();
            
            if (btnVerTodo) btnVerTodo.style.display = 'block';
            if (filasInventario) filasInventario.classList.remove('mostrar');
        });
    }
});