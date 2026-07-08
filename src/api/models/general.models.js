import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

// ====== DEFINICIÓN DE LOS MODELOS A USAR ======
const Libros = sequelize.define("Libros", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(75),
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM("Ciencia Ficcion", "Fantasia", "Terror", "Misterio", "Drama", "Romance"),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        tableName: "libros",
        timestamps: false
    }
);

const Usuarios = sequelize.define("Usuarios", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    es_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        tableName: "usuarios",
        timestamps: false
    }
);

const Ventas = sequelize.define("Ventas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
},
    {
        tableName: "ventas"
    }
);

const VentasLibros = sequelize.define("VentasLibros", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_libro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
},
    {
        tableName: "ventas_libros",
        timestamps: false
    }
);

const Encuestas = sequelize.define("Encuestas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    suscripcion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
    {
        tableName: "encuestas"
    }
);

const Registros = sequelize.define("Registros", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "registros",
    timestamps: false
});

// ====== RELACIONES ======
Ventas.belongsToMany(Libros, {
    through: VentasLibros,
    foreignKey: "id_venta"
});

Libros.belongsToMany(Ventas, {
    through: VentasLibros,
    foreignKey: "id_libro"
});

VentasLibros.belongsTo(Libros, {
    foreignKey: "id_libro",
    as: "Libro"
});

VentasLibros.belongsTo(Ventas, {
    foreignKey: "id_venta",
    as: "Venta"
});

Registros.belongsTo(Usuarios, {
    foreignKey: "usuario_id"
});

// ====== EXPORTACIONES ======
export {
    Libros,
    Usuarios,
    Ventas,
    VentasLibros,
    Encuestas,
    Registros
}