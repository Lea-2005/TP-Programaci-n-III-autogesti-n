import { Libros } from "./general.models.js";

// ====== MODELOS DEL CLIENTE ======
const seleccionarLibrosActivos = async () => {
    const librosActivos = await Libros.findAll({
        attributes: ["id", "titulo", "genero", "imagen", "precio"],
        where: { activo: true }
    });
    return librosActivos;
}

const seleccionarLibroActivoPorId = async (id) => {
    const libro = await Libros.findByPk(id, {
        where: { activo: true },
        attributes: ["id", "titulo", "genero", "imagen", "precio"]
    });
    return libro;
}

// ====== MODELOS DEL ADMINISTRADOR ======
const seleccionarTodosLosLibros = async () => {
    const libros = await Libros.findAll({
        attributes: ["id", "titulo", "genero", "imagen", "precio", "activo"]
    });
    return libros ? [libros] : [];
}

const insertarNuevoLibro = async (titulo, genero, imagen, precio) => {
    const libroNuevo = await Libros.create({ titulo, genero, imagen, precio });
    return libroNuevo.id;
}

const actualizarLibro = async (id, titulo, genero, imagen, precio, activo) => {
    const [libroActualizado] = await Libros.update(
        { titulo, genero, imagen, precio, activo },
        {
            where: { id }
        });
    return libroActualizado;
}

const alternarEstadoLibro = async (id, activo) => {
    const [libroAlternado] = await Libros.update(
        { activo },
        {
            where: { id }
        }
    );
    return libroAlternado;
}

export default {
    // CLIENTE:
    seleccionarLibrosActivos,
    seleccionarLibroActivoPorId,
    // ADMIN:
    seleccionarTodosLosLibros,
    insertarNuevoLibro,
    actualizarLibro,
    alternarEstadoLibro
};
