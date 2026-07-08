import sequelize from "../database/sequelize.js";
import { Ventas, VentasLibros, Libros } from "./general.models.js";

const crearNuevaVenta = async (nombreUsuario, precioTotal, libros) => {
    const nuevaVenta = await Ventas.create({
        nombre_usuario: nombreUsuario,
        precio_total: precioTotal,
        fecha: new Date()
    });

    for (const libro of libros) {
        await VentasLibros.create({
            id_venta: nuevaVenta.id,
            id_libro: libro.id,
            cantidad: libro.cantidad,
            precio_unitario: libro.precio
        });
    }
    return nuevaVenta.id;
}

const obtenerTodasLasVentas = async () => {
    const ventas = await Ventas.findAll({
        include: [{
            model: Libros,
            through: {
                attributes: ["cantidad", "precio_unitario"]
            }
        }],
        order: [["fecha", "DESC"]]
    });
    return ventas;
}

const calcularPromedioPrecio = async () => {
    const promedioPrecio = await Ventas.findOne({
        attributes: [[sequelize.fn(
            "AVG",
            sequelize.col("precio_total")
        ), "promedio"
    ]], raw: true
    });
    return promedioPrecio;
}

const obtenerEstadisticasNuevas = async () => {
    const totalVentas = await Ventas.count();
    const totalLibrosVendidos = await VentasLibros.sum("cantidad");
    const promedioPrecio = await calcularPromedioPrecio();

    const totalLibrosActivos = await Libros.count({ 
        where: { activo: true } 
    });

    const totalLibrosInactivos = await Libros.count({ 
        where: { activo: false } 
    });

    return {
        totalVentas,
        totalLibrosVendidos: totalLibrosVendidos || 0,
        promedioPrecio: promedioPrecio ? parseFloat(promedioPrecio.promedio) : 0,
        totalLibrosActivos,
        totalLibrosInactivos
    };
};

const obtenerTopLibrosVendidosNuevos = async () => {
    const topLibros = await VentasLibros.findAll({
        attributes: [
            "id_libro",
            [sequelize.fn(
                "SUM", 
                sequelize.col("cantidad")
            ), "total_vendido"],
            [sequelize.fn(
                "SUM",
                sequelize.literal("cantidad * precio_unitario")
            ), "ingreso_total"]
        ],
        include: [{
            model: Libros,
            as: "Libro",
            attributes: ["id", "titulo", "genero", "precio"]
        }],
        group: ["id_libro", "Libro.id", "Libro.titulo", "Libro.genero", "Libro.precio"],
        order: [[sequelize.literal("total_vendido"), "DESC"]],
        limit: 10,
        raws: false
    });
    return topLibros;
};

const obtenerTopVentasCarasNuevas = async () => {
    const topVentas = await Ventas.findAll({
        attributes: ["id", "nombre_usuario", "fecha", "precio_total"],
        include: [{
            model: Libros
        }]
    });
    return topVentas;
}

export default {
    crearNuevaVenta,
    obtenerEstadisticasNuevas,
    obtenerTopLibrosVendidosNuevos,
    obtenerTopVentasCarasNuevas,
    obtenerTodasLasVentas
}