export interface ExchangeRates {
    data: {
        id: number;
        date: Date;
        sellAmount: number;
        buyAmount: number;
        idRequest: number;
    }[];
    total: number;
}