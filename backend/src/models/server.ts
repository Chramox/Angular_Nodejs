import express, { Application } from 'express'
import cors from "cors";

import db from '../config/db.connection';
import bankRoutes from "../routes/exchange-rate.routes";
import { soapConnection } from '../config/soap.connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        bank: '/api/bank'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5000';

        this.connectDatabase();
        this.connectSoapClient();
        this.middleware();
        this.routes();
    }

    async connectDatabase() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async connectSoapClient() {
        try {
            await soapConnection.setClient()
            console.log('Soap client working');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middleware() {
        //CORS
        this.app.use(cors());
        // Body reading
        this.app.use(express.json());
        //Public folder
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port: ', this.port);
        });
    }

    routes() {
        this.app.use(this.apiPaths.bank, bankRoutes);
    }


}

export default Server;