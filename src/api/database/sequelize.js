import { Sequelize } from "sequelize";
import environments from "../config/environments.js";

const { database } = environments;

const sequelize = new Sequelize(
    database.name,
    database.user,
    database.password,
    {
        host: database.host,
        dialect: "mysql",
        logging: false,
        define: {
            timestamps: false,
            underscored: false
        }
    }
);

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ - Conectado a la base de datos: '${database.name}'.`);

        await sequelize.sync({ alter: false });
    } catch (error) {
        console.error("❌ Error conectando a la BD:", error);
        throw error;
    }
}

export default sequelize;