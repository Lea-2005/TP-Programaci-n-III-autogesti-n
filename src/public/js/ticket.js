// ===== FUNCIONALIDAD BÁSICA PARA EL TICKET =====
function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    return [];
}

function obtenerNombreUsuario() {
    return localStorage.getItem("nombre_usuario");
}

function cargarTicket() {
    const carrito = obtenerCarrito();
    const nombreUsuario = obtenerNombreUsuario();
    const tbody = document.getElementById("tabla-ticket-info");
    const totalSpan = document.getElementById("total-general");
    const fechaSpan = document.getElementById("fecha-hora");
    
    const ahora = new Date();
    fechaSpan.textContent = ahora.toLocaleString();

    document.getElementById("nombre-cliente").textContent = nombreUsuario;

    let total = 0;
    let plantillaHTML = "";
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        plantillaHTML += `
            <tr>
                <td>${item.titulo}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });
    tbody.innerHTML = plantillaHTML;
    totalSpan.textContent = total.toFixed(2);
}

async function registrarVentas () {
    const carrito = obtenerCarrito();
    const nombreUsuario = obtenerNombreUsuario();
    const precio_total = carrito.reduce((suma, libro) => suma + libro.precio * libro.cantidad, 0);

    try {
        const respuesta = await fetch("/api/ventas/", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                nombre_usuario: nombreUsuario,
                libros: carrito.map(libro => ({ 
                    id: libro.id,
                    cantidad: libro.cantidad,
                    precio: libro.precio
                })),
                precio_total: precio_total
            })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) throw new Error(data.error);
        
        console.log("Venta registrada:", data);
    } catch (error) {
        console.error("Error al registrar la venta:", error);
    }   
}

async function salir() {
    try {
        await registrarVentas();
    } catch (error) {
        console.error("Error al estar saliendo de la pantalla de ticket", error);
    }

    // Limpia el localStorage (carrito y nombre de usuario)
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombre_usuario");
    // Redirige a la pantalla de bienvenida (el flujo se reinicia)
    window.location.href = "/bienvenida";
}


// ===== FUNCIÓN PARA DESCARGAR PDF =====
function descargarPDF() {
    registrarVentas();

    const carrito = obtenerCarrito();
    const fechaActual = new Date().toLocaleString();
    const nombreUsuario = obtenerNombreUsuario();

    // ----- CONFIGURACIÓN -----
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const margin = 10;
    let y = margin;

    // ----- ENCABEZADO DEL TICKET -----
    doc.setFontSize(20);
    doc.text("Librería", margin + 50, y); // Siendo: `doc.text(texto, posicion x, posicion y);`
    y += 6;
    
    doc.setFontSize(14);
    doc.text("¡Gracias por comprar en nuestra página!", margin + 18, y);
    y += 6;
    
    // ----- INFORMACIÓN -----
    doc.line(margin, y, 140, y); // Siendo: `doc.line(posicion x inicial, posicion y inicial, posicion x final, posicion y final);`
    y += 8;
    
    doc.setFontSize(10);
    doc.text(`* Fecha: ${fechaActual}`, margin, y);
    y += 5;
    
    doc.text(`* Cliente: ${nombreUsuario}`, margin, y);
    y += 6;

    doc.line(margin, y, 140, y);
    y += 8;
    
    // ----- PRODUCTOS -----
    doc.setFontSize(14);
    doc.text("ARTICULOS", margin, y);
    y += 6;

    doc.line(margin, y, 140, y);
    y += 8;

    doc.setFontSize(9);
    let total = 0;

    doc.text("Nombre del producto", margin, y);
    doc.text("Cantidad", 50, y);
    doc.text("Precio unitario", 70, y);
    doc.text("Subtotal", 100, y);
    y += 1;

    doc.line(margin, y, 40, y);
    doc.line(50, y, 63, y);
    doc.line(70, y, 90, y);
    doc.line(100, y, 112, y);
    y += 8;

    carrito.forEach(item => {
        const nombreProducto = item.titulo.length > 22 ? item.titulo.substring(0, 22) + '...' : item.titulo; // Esto para evitar que los nombres largos solapen con los siguientes datos.
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        doc.text(`${nombreProducto}`, margin, y);
        doc.text(`${item.cantidad}`, 60, y);
        doc.text(`$${item.precio}`, 70, y);
        doc.text(`$${subtotal}`, 100, y);
        y += 5;
    });

    // ----- TOTAL -----
    doc.line(margin, y, 140, y);
    y += 8;

    doc.setFontSize(14);
    doc.text("TOTAL COMPRA:", margin, y);
    doc.setFontSize(16);
    doc.text(`$${total}`, 60, y);
    y += 8;

    doc.save(`ticket-${Date.now()}.pdf`);

    // -----------------------------------------------------
    // Limpia el localStorage (carrito y nombre de usuario)
    localStorage.removeItem("carrito");
    localStorage.removeItem("nombre_usuario");
    // Redirige a la pantalla de bienvenida (el flujo se reinicia)
    window.location.href = "/bienvenida";
}

// ===== VALIDACIÓN DEL NOMBRE =====
function validarSesion() {
    const nombre = localStorage.getItem("nombre_usuario");

    if (!nombre) {
        window.location.href = "/bienvenida";
        return false;
    }

    return true;
}

// ===== EVENTOS =====
document.addEventListener("DOMContentLoaded", () => {
    if (!validarSesion()) return;

    cargarTicket();
    
    document.getElementById("btn-salir").addEventListener("click", salir);
    document.getElementById("btn-descargar-pdf").addEventListener("click", descargarPDF);
});
