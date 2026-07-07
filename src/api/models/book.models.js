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
        attributes: ["id", "titulo", "genero", "imagen", "precio"],
        where: { activo: true }
    });
    return libro;
}

// ====== MODELOS DEL ADMINISTRADOR ======
const seleccionarTodosLosLibros = async () => {
    const libros = await Libros.findAll({
        attributes: ["id", "titulo", "genero", "imagen", "precio", "activo"]
    });
    return libros;
}

const seleccionarLibroPorId = async (id) => {
    const libro = await Libros.findByPk(id, {
        attributes: ["id", "titulo", "genero", "imagen", "precio", "activo"]
    });
    return libro;
}

const insertarNuevoLibro = async (titulo, genero, imagen, precio) => {
    const libroNuevo = await Libros.create({ titulo, genero, imagen, precio });
    return libroNuevo.id;
}

const editarLibro = async (id, titulo, genero, imagen, precio, activo) => {
    const [libroEditado] = await Libros.update(
        { titulo, genero, imagen, precio, activo },
        { where: { id } }
    );
    return libroEditado;
}

const alternarEstadoLibro = async (id, activo) => {
    const [libroAlternado] = await Libros.update(
        { activo },
        { where: { id } },
    );
    return libroAlternado;
}

export default {
    // CLIENTE:
    seleccionarLibrosActivos,
    seleccionarLibroActivoPorId,
    // ADMIN:
    seleccionarTodosLosLibros,
    seleccionarLibroPorId,
    insertarNuevoLibro,
    editarLibro,
    alternarEstadoLibro
};
