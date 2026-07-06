import { Ventas, VentasLibros } from "./general.models.js";

/*
id
nombre_usuario
fecha
precio_total

id
id_venta
id_libro
cantidad
precio_unitario
*/
const crearNuevaVenta = async (nombreUsuario, precioTotal, libros) => {
    const nuevaVenta = await Ventas.create({
        nombre_usuario: nombreUsuario,
        precio_total: precioTotal,
        fecha: new Date()
    });

    for (const libro of libros) {
        //console.log("Precio unitario:", libro.precio)
        //const precioUnitario = libro.precio;
        await VentasLibros.create({
            id_venta: nuevaVenta.id,
            id_libro: libro.id,
            cantidad: libro.cantidad,
            precio_unitario: libro.precio
        });
    }
    return nuevaVenta.id;
}

export default {
    crearNuevaVenta
}