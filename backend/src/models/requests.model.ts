import { DataTypes } from "sequelize";
import db from "../config/db.connection";
import ExchangeRate from "./exchange-rates.model";


const RequestItem = db.define('Request', {
    
    idCoin: { 
        type: DataTypes.INTEGER
    },
});

export default RequestItem;