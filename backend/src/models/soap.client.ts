import { createClientAsync } from 'soap';

export class SoapConnection {
    client: any;
    url: string;

    constructor(url: string) {
        this.url = url;
        this.setClient()
    }

    async setClient() {
        const client = await createClientAsync(this.url);
        this.client = client;
    }
}