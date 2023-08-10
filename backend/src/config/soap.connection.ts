import { createClientAsync } from 'soap';

class SoapConnection {
    client: any;
    url: string;

    constructor() {
        this.url = 'https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL';
    }

    async setClient() {
        const client = await createClientAsync(this.url);
        this.client = client;
    }
}


export const soapConnection = new SoapConnection();