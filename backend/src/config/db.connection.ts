import { Sequelize } from "sequelize";

const dbName = process.env.DATABASE || 'BankExchange';
const user = process.env.USER_DB || 'root';
const password = process.env.PASSWORD_DB || '2468Zelda';
const host = process.env.HOST_DB || 'localhost';

const db = new Sequelize(dbName, user, password, {
    host: host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});


export default db;