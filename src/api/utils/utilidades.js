// 📁 Aca vamos a gestionar la logica para trabajar con archivos y rutas de proyecto.

import { fileURLToPath } from "url";
// Convierte una URL de archivo (file://) a una ruta del sistema operativo.
import { dirname, join } from "path";
/* dirname:  obtiene el directorio padre de una ruta.
   join:     une segmentos de ruta de forma segura (multiplataforma).
*/

/**
 * __filename: Ruta absoluta del archivo actual.
 * fileURLToPath: Convertimos esta URL a una ruta del sistema.
 * 
 * Ejemplo:  file:///ruta/al/archivo.js  ->  /ruta/al/archivo.js   
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * dirname(__filename): Obtiene el directorio del archivo actual.
 * join("../../../"): Retrocede tres niveles en la estructura de directorios.
 * 
 * Ejemplificación:
 *   src/api/utils/utilidades.js  (estamos aquí)
 *   src/api/                (subimos 1 nivel)
 *   src/                    (subimos 2 niveles)
 *   raíz del proyecto       (subimos 3 niveles) ← __dirname apunta aquí
 * 
 * Esto permite que desde cualquier lugar del proyecto podamos referenciar archivos usando rutas relativas a la raíz.
 */
const __dirname = join(dirname(__filename), "../../../");

export {
    __dirname,   // Ruta absoluta de la raíz del proyecto
    join         // Función para unir rutas de forma segura
};
