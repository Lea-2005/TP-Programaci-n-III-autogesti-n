import connection from "../database/ddbb.js";

const seleccionarLibrosActivos = () => {
    const sql = `
        SELECT id, titulo, genero, imagen, precio
        FROM libros
        WHERE activo = 1
    `;
    return connection.query(sql);
};

const seleccionarLibroActivoPorId = (id) => {
    const sql = `
        SELECT id, titulo, genero, imagen, precio
        FROM libros
        WHERE id = ? AND activo = 1
    `;
    return connection.query(sql, [id]);
};

const insertarLibro = (titulo, genero, imagen, precio) => {
    const sql = `
        INSERT INTO libros(titulo, genero, imagen, precio)
        VALUES (?, ?, ?, ?)
    `;
    return connection.query(sql, [titulo, genero, imagen, precio]);
}

const actualizarLibro = (titulo, genero, imagen, precio, activo, id) => {
    const sql = `
        UPDATE libros
        SET titulo = ?, imagen = ?, genero = ?, precio = ?, activo = ?
        WHERE id = ?
    `;
    return connection.query(sql, [titulo, genero, imagen, precio, activo, id]);
}

const eliminarLibro = (id) => {
    const sql = `
        DELETE FROM libros
        WHERE id = ?
    `;
    return connection.query(sql, [id]);
}

export default {
    seleccionarLibrosActivos,
    seleccionarLibroActivoPorId,
    insertarLibro,
    actualizarLibro, 
    eliminarLibro
};
