import { DataTypes } from "sequelize";
import db from "../config/db.connection";


const ExchangeRate = db.define('ExchangeRate', {
    date: { 
        type: DataTypes.DATE
    },
    sellAmount: { 
        type: DataTypes.DOUBLE
    },
    buyAmount: { 
        type: DataTypes.DOUBLE
    },
    idRequest: { 
        type: DataTypes.INTEGER
    },
});

export default ExchangeRate;