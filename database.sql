DROP DATABASE IF EXISTS autoservicio;
CREATE DATABASE autoservicio;
USE autoservicio;

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(75) NOT NULL,
    genero ENUM('Ciencia Ficcion', 'Fantasia', 'Terror', 'Misterio', 'Drama', 'Romance') NOT NULL,
    imagen VARCHAR(500) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    es_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    fecha DATETIME  NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL
);

CREATE TABLE ventas_libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_libro INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id),
    FOREIGN KEY (id_libro) REFERENCES libros(id)
);

CREATE TABLE encuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    comentario TEXT,
    puntuacion INT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
    suscripcion BOOLEAN DEFAULT FALSE,
    imagen VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERCIÓN DE LIBROS (DIVIDIDO POR LOS GÉNEROS)

-- 1. CIENCIA FICCIÓN:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('1984', 'Ciencia Ficcion', 'https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100', 10000),
    ('DUNE', 'Ciencia Ficcion', 'https://m.media-amazon.com/images/I/81Ua99CURsL._AC_UF1000,1000_QL80_.jpg', 20000),
    ('Fahrenheit', 'Ciencia Ficcion', 'https://i.pinimg.com/originals/8c/09/d9/8c09d9fcb63e9bee8b462ffe27d7de18.png', 7000),
    ('Fundación', 'Ciencia Ficcion', 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/704220-46ee89820c4923330717363961023903-1024-1024.webp', 12500),
    ('Yo, robot', 'Ciencia Ficcion', 'https://www.ramonacultural.com/wp-content/uploads/2019/06/200208_600.jpg', 9900),
    ('El problema de los tres cuerpos', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcMrd8pA7RiPT6VutXnnYKudk5ykxX95XFSSMGE2JOYyxn9qzrKoKKkwe&s=10', 14200),
    ('Neuromante', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFPgldy8KdYoVOSowact061jhXHhx5coeVgGKZBlkOms1mj2zaPQAtsyF&s=10', 11800),
    ('La guerra de los mundos', 'Ciencia Ficcion', 'https://granicaeditor.com/tapas/9789563164411.jpg', 8500),
    ('El juego de Ender', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vkZvhkGlAfvytETTVvTJtmeudzU7LdnRyyPgYKbjaCgejDHmTisY3o8w&s=10', 13500),
    ('Los desposeídos', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeXpSVFvq9vymkNbnqZZcS0mn2xf7dJOoX89S-NA8WXtTOuhAPhkAyJP4&s=10', 12900),
    ('Solaris', 'Ciencia Ficcion', 'https://images.cdn2.buscalibre.com/fit-in/360x360/b9/6a/b96a341f774d5c7b56b1f74863fa41c3.jpg', 11700),
    ('Crónicas marcianas', 'Ciencia Ficcion', 'https://tienda.planetadelibros.com.ar/cdn/shop/products/D_614309-MLA41719563010_052020-O.jpg?v=1684348431', 10200),
    ('El fin de la eternidad', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6WOvjTccCP-ii6K5FfipCfuCaFWcUMfJ3Ndr-gI5Veyl8_D3cALyMaAX&s=10', 14100),
    ('La máquina del tiempo', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3x_wjZzxY76GSuyICEc8QZKDZkT4vEp0haHHpzJvflJwHYmOBRjrW8Qs&s=10', 8500),
    ('Un mundo feliz', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC2VplXn8xE_ofL4Um7Yl571uMZKBcaISsDGylLzd86vJkZcGxvPW9doA&s=10', 9200),
    ('Ubik', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-JTgXsP_2qSPlCG8QavakVWeY-ac20PxZp70Vy4NH23jZLVCFM0gn5Qg&s=10', 11200),
    ('¿Sueñan los androides con ovejas eléctricas?', 'Ciencia Ficcion', 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/678746-b4e8c1e826ee80a85e17309988684486-1024-1024.webp', 11800),
    ('Starship Troopers', 'Ciencia Ficcion', 'https://http2.mlstatic.com/D_NQ_NP_645594-MLA53320055923_012023-O.webp', 10500),
    ('Cita con Rama', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN9ndFdguJNXP65EqVcdZnH7mPRTWsJcdqHWHh1c52uLrnl20-nDiRAoI&s=10', 12800),
    ('El hombre en el castillo', 'Ciencia Ficcion', 'https://images.cdn2.buscalibre.com/fit-in/360x360/a3/ea/a3ea2706376e8d27fcbd248dcd6449e4.jpg', 11500),
    ('La mano izquierda de la oscuridad', 'Ciencia Ficcion', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdUGPyKXvJoNJAHxcuQz4IAW9Rc4Zl7hjpf3T3bPtUgiAC77cJAJ6n52o&s=10', 12500),
    ('Hyperion', 'Ciencia Ficcion', 'https://m.media-amazon.com/images/I/81HdTYTJYqL.jpg', 14800);

-- 2. FANTASÍA:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('El Hobbit', 'Fantasia', 'https://bookbub-res.cloudinary.com/image/upload/f_auto,q_auto/v1584109356/blog/the-hobbit-book-cover-art-2003.jpg', 15000),
    ('El Señor de los Anillos', 'Fantasia', 'https://i.harperapps.com/hcanz/covers/9780261103252/y648.jpg', 5000),
    ('Harry Potter y la piedra filosofal', 'Fantasia', 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg', 9000),
    ('El archivo de las tormentas I: El camino de los reyes', 'Fantasia', 'https://www.penguinlibros.com/ar/7605853-home_default/el-camino-de-los-reyes-el-archivo-de-las-tormentas-1.jpg', 19000),
    ('El color de la magia', 'Fantasia', 'https://www.penguinlibros.com/ar/1596632/el-color-de-la-magia-mundodisco-1.jpg', 10800),
    ('El ojo del mundo', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaW6Wc9F4g8_5pJhnIdNYpIl1ZAyYcCN5Hzkm64fBOXsZY9ozKL9IOCRU&s=10', 17200),
    ('El nombre del viento', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScobkTzGtG0LXRvBawZJ2VAT3zaVqjldQIQeI8BCVD4KBrtMVZKS3Wl_7P&s=10', 15000),
    ('Juego de tronos: Canción de Hielo y Fuego', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_SknuL2cTF6wgOmR-prLD_gx6FXZKZPNSqQapo7CTveiSNZkX7hYDG14&s=10', 16500),
    ('Nacidos de la bruma: Mistborn', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRu6LWbM1KqamqugL6IHPvyIqIT1YS3FYKx5IM2K2FlZamZNBEjNyxntFu&s=10', 13700),
    ('La historia interminable', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNgUYnR7yDkFqCa0AzVE2SpayjR20uN85Ou04-PfgzUo3PV4uV4i-mK8&s=10', 10200),
    ('Las crónicas de Narnia: El león, la bruja y el armario', 'Fantasia', 'https://images.cdn3.buscalibre.com/fit-in/360x360/76/08/7608d458499a573da01c43ebd8de9b22.jpg', 9000),
    ('Los nueve príncipes de Ámbar', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vkE6nBHcbhohKPGgJMDAW1fh4qop2aV9azrhUje2J2UIZvsBSciu4Mo&s=10', 11500),
    ('Stardust', 'Fantasia', 'https://m.media-amazon.com/images/I/91p8dUf16LL.jpg', 12000),
    ('El archivo de las tormentas II: Palabras radiantes', 'Fantasia', 'https://www.penguinlibros.com/ar/4246158-large_default/palabras-radiantes-el-archivo-de-las-tormentas-2.webp', 18500),
    ('El mago de Oz', 'Fantasia', 'https://www.elejandria.com/covers/El_maravilloso_Mago_de_Oz-L._Frank_Baum-lg.png', 7800),
    ('La hija del bosque', 'Fantasia', 'https://www.edhasa.com.ar/wp-content/uploads/integracion/producto_portada/2023/07/14289--9789876285254.jpg', 13200),
    ('La torre oscura I: El pistolero', 'Fantasia', 'https://solo-libros.com/wp-content/uploads/2022/03/el-pistolero-la-torre-oscura-1.jpg', 11500),
    ('La brújula dorada', 'Fantasia', 'https://images.cdn3.buscalibre.com/fit-in/360x360/35/33/35332706c71ce94ed3f63d22ed04a62a.jpg', 12500),
    ('El gato que camina solo', 'Fantasia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0ABanRcmyXlkNhBKJ11auRu6mqyhDSxlOdWmUSpiO5b9m2ZIDVN4SxE&s=10', 7200);

-- 3. TERROR:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('It', 'Terror', 'https://images.cdn1.buscalibre.com/fit-in/360x360/ec/c6/ecc6925af7478dd66fce402ea5e3dda0.jpg', 18000),
    ('El resplandor', 'Terror', 'https://images.cdn2.buscalibre.com/fit-in/360x360/2b/f4/2bf446b4fb582f86bb6616ee8bc279aa.jpg', 14500),
    ('Drácula', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju_Hi1gmwbBKl9paO77pKuZN_cCvQO7pVbZFodY5utIjVOXql7uiEgIY&s=10', 9500),
    ('Frankenstein', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpeFrRafUvju-gfj6KuixUTgQa-j0v5IFoJI-CIn8HJKMhdDTVXY_Ubgo&s=10', 8900),
    ('El exorcista', 'Terror', 'https://images.cdn3.buscalibre.com/fit-in/360x360/6b/3d/6b3dde0db6385eb6333c824e928f03ea.jpg', 12000),
    ('La llamada de Cthulhu', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCqKvlSxAjRzwZgxfUuQmVgAamEErkRXwaqQhIDL0_UJde_5O-C-_8uz4&s=10', 8500),
    ('La casa de los espíritus', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlgDOl1_rysg1bTp9HbdMj-SE5ATW3KqJTtKii-_1pps2UJt8Y6kgh1SE&s=10', 13700),
    ('Carrie', 'Terror', 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/688252-34a9e8d24f57d7600417277412707582-1024-1024.webp', 8500),
    ('El cementerio de animales', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAFf8YVtaqtzCzlZ-dQdoY0TXOISBkJtiC03ow2-nJXv89xPIJILnNQq-m&s=10', 13500),
    ('El extraño caso del Dr. Jekyll y Mr. Hyde', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQlcH8Y0q7uhqYzw6cFWdCHLUmtQLJl5HRnhKHmB8zMxC5yYf8K152T8&s=10', 8200),
    ('El fantasma de la ópera', 'Terror', 'https://images.cdn1.buscalibre.com/fit-in/360x360/30/68/3068d9397dd45654ca3538b60313a4e4.jpg', 9500),
    ('La máscara de la muerte roja', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvzi4tvHEOB2j12qD70SrsQkzr_3gDwWJ5PyeZ1-nkdZ9IEPRnQHFbH0&s=10', 7500),
    ('El hombre que ríe', 'Terror', 'https://images.cdn3.buscalibre.com/fit-in/360x360/03/4c/034c4c3420b78cf61fe4d7f1424a527b.jpg', 10200),
    ('El retrato de Dorian Gray', 'Terror', 'https://images.cdn1.buscalibre.com/fit-in/360x360/d8/53/d853616d4256d2146af2a543f224af84.jpg', 9800);

-- 4. MISTERIO:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('El código Da Vinci', 'Misterio', 'https://images.cdn2.buscalibre.com/fit-in/360x360/49/54/4954e233ad1e1a43e3f8187cd91c6997.jpg', 12500),
    ('La chica del dragón tatuado', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3L3NPBnI9lvWGuhtAOSWtyaF6HZfWvP8fD1yMm7EoCUCzVacXn8LLu7E&s=10', 14300),
    ('Perdida', 'Misterio', 'https://images.cdn1.buscalibre.com/fit-in/360x360/01/b5/01b500597d555ef79a1b6e443ca3a0de.jpg', 13000),
    ('El silencio de los corderos', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiKXiBH44qFSvvjnpImvPB0Y3u2z8FA3AFMWfj0BsssAdoAASf5nUpwFc&s=10', 11800),
    ('El nombre de la rosa', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VtkiUOMiNGbU293HnndAwflgysMl7tVkVBFzYdUf6VGHScConZUvriyt&s=10', 15000),
    ('La chica del tren', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBaV9CTpUgiDnxqQbK_z8Fwu498jHIrzDNBeTj-f1uw&s', 12800),
    ('Y no quedó ninguno', 'Misterio', 'https://m.media-amazon.com/images/I/51gdWyGWY3L._AC_UF1000,1000_QL80_.jpg', 9500),
    ('El cuento de la criada', 'Misterio', 'https://images.cdn1.buscalibre.com/fit-in/360x360/f6/f7/f6f7638a2e33eb2baf56dc5e07b145f7.jpg', 12200),
    ('Los crímenes de la calle Morgue', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCc0wmyrC4jL76ETM6hU_O9wFLY8Jwvh20PXJvf_FLCdI9ufH5hPCc6-1&s=10', 7500),
    ('El perro de los Baskerville', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxPEmB7V-5eTgY1mKEFRTXIe_OQeBOxAz5cJZ6y5NwD1xvGgfBO-sPxMo&s=10', 8800),
    ('La muerte de Artemio Cruz', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5dlke31W8sxxV4zLr6CI1maFrVlbkyP_mZNZ5FK9cCBVFnfSCpIMY5qQ&s=10', 11500),
    ('El complot mongol', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvmp8-JpD_oDyZpH20nc84b-X7i4P-Boe6wWC0PzPIjGmmpn5KHw46V1JJ&s=10', 9800),
    ('El misterioso caso de Styles', 'Misterio', 'https://proassets.planetadelibros.com.ar/usuaris/libros/fotos/314/original/portada_el-misterioso-caso-de-styles_agatha-christie_202003051927.jpg', 8200),
    ('Asesinato en el Orient Express', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvmA34UtXgA6cAmSwGrI6rkbL_y-6uhRq2x-O6XsbdDaIyq7xI3HX31_Ks&s=10', 9500),
    ('Muerte en el Nilo', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-FNc6LCL8H59Nj4Rn6Ek1119ClMU2YPw8xoc9RihZIj3QHuu266j06krl&s=10', 9200),
    ('El asesinato de Roger Ackroyd', 'Misterio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1G4nQI2w4tBzouHDXSuuzeudadCb_gyrbdPgEkkmZCTdLzdMXRAsfnk&s=10', 8900);

-- 5. DRAMA:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('Cien años de soledad', 'Drama', 'https://0.academia-photos.com/attachment_thumbnails/63761117/mini_magick20240803-1-qoc44q.png?1722721472', 14800),
    ('La sombra del viento', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuU5tCgo-a8jho58NXMsFQ_OeMuAencCqW0h8hCVlQe1k6EyUsNGGkQhl&s=10', 13900),
    ('El principito', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxudlLQiXlkeu4gYLu-X1gFYDBpjV1vc6da8GO9SellLO1Uf5R9QYKfc&s=10', 7500),
    ('Los miserables', 'Drama', 'https://i.pinimg.com/736x/33/ec/73/33ec730cd95ee8c3b2d3773ab34d8af3.jpg', 16500),
    ('Matar a un ruiseñor', 'Drama', 'https://pendulo.com/imagenes_grandes/9781400/978140034334.GIF', 11000),
    ('La vida es sueño', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDoDdXX6TuPntJ2_gbeUTTBEnz5x5lx4Smrm7sQb8dfXZbas6UZdj8QWoB&s=10', 7200),
    ('El público', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhRZ00Ti7U0RacTqHkzlJ-l9IObvobjqSyp3OxW8aUwqPVEuIjMh_8aw&s=10', 6800),
    ('La casa de Bernarda Alba', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmiZTWzIPzt3rG42ii8x7ZvC9NzdD5ehVgUM153FllgDRNxvj7aHA5JtZw&s=10', 7500),
    ('Crimen y castigo', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJngsPmnQrcKzWJe71V61vYh1VOYx7eLYfF3G6SG6pdK98ucbFjZeL9c&s=10', 14800),
    ('Guerra y paz', 'Drama', 'https://www.edicontinente.com.ar/image/titulos/9788419087829.jpg', 16500),
    ('Ana Karenina', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiJKa2c1CTQ1uhQjGYFagqirsKl3iggmXFpAfNZQX5JLshGFlWTk20Tw&s=10', 14500),
    ('El guardián entre el centeno', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KPH04sqjUTJGgvPFQdBumg9Mv5NslmvRyAU-smlbTn9W7e6IGUZ1ycU&s=10', 10200);

-- 6 ROMANCE:
INSERT INTO libros (titulo, genero, imagen, precio) VALUES
    ('Orgullo y prejuicio', 'Romance', 'https://m.media-amazon.com/images/I/71wnBzT9WqL._AC_UF1000,1000_QL80_.jpg', 9500),
    ('Sentido y sensibilidad', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIMQF4r1inRy5VwxQaLNe6-m-B2yLuPWMMc7alvwt72rQoYafjmQFLLhiB&s=10', 9200),
    ('Emma', 'Romance', 'https://images.cdn2.buscalibre.com/fit-in/360x360/79/b0/79b0a9c4aa82449093756e0dddda9510.jpg', 8900),
    ('Persuasión', 'Romance', 'https://images.cdn3.buscalibre.com/fit-in/360x360/bd/da/bddab0a8f51803a204861111223fb0ca.jpg', 8600),
    ('El cuaderno de Noah', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv9wTRyMq0PIaoC2_VBNG4eCOem-mj8gWIMa2ncooh4Y86r_XZvNhi54OF&s=10', 11200),
    ('Bajo la misma estrella', 'Romance', 'https://www.penguinlibros.com/ar/7612470/bajo-la-misma-estrella.jpg', 10800),
    ('Los puentes de Madison', 'Romance', 'https://images.cdn3.buscalibre.com/fit-in/360x360/4a/31/4a31155812b01ef5d6658c6fc99576e9.jpg', 10500),
    ('El paciente inglés', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW27yQtr_pic6XOOOJ5JIREWzTBVaiw3tFtanfMWLLTjrMCozR8lv0dBRk&s=10', 12500),
    ('Como agua para chocolate', 'Romance', 'https://www.penguinlibros.com/ar/1638756/como-agua-para-chocolate.jpg', 13500),
    ('Eleanor & Park', 'Romance', 'https://cdn.kobo.com/book-images/e2991b28-2602-4a4f-b653-0f1e243f0bac/1200/1200/False/eleanor-park.jpg', 9800),
    ('La hipótesis del amor', 'Romance', 'https://images.cdn3.buscalibre.com/fit-in/360x360/a9/fe/a9fef7dc0849cd27843130a8cd8688ec.jpg', 11500),
    ('Romeo y Julieta', 'Romance', 'https://images.cdn1.buscalibre.com/fit-in/360x360/4b/82/4b82a25092b88a61f9da27e27698493e.jpg', 7800),
    ('Forastera', 'Romance', 'https://images.cdn1.buscalibre.com/fit-in/360x360/67/b8/67b8926c26f5d7906675a195403a9c2c.jpg', 14800),
    ('El amor en los tiempos del cólera', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0jYAAc1Wr6lTwHXuaw6WN9qTkzgW1cP9Hzah_DrMStNlu3RwCMEOFcc&s=10', 13000),
    ('La dama de las camelias', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6fyXl7ZG055xwr3FwAkBRBjHyB3rI1uzGYrZXiwSXyB6JhFUMDZaqn2U&s=10', 10200),
    ('Faustine - Cambios de Otoño', 'Romance', 'https://autoresdeargentina.com/wp-content/uploads/2023/06/4648-Iacono-BW-scaled-1.jpg', 9000),
    ('Faustine II - La Marquesa de las Perlas', 'Romance', 'https://autoresdeargentina.com/wp-content/uploads/2023/06/5256-IACONO-BW-scaled-1.jpg', 10000);

-- Insertando email y contraseña:
INSERT INTO usuarios (email, contrasenia, es_admin) VALUES
    ('admin@ejemplo.com', '$2b$10$.GgrYQZT44DJ65kjJUVw5O0AMdCmL/.Tr1CQqxrmx7STbuCeU9dOe', 1);