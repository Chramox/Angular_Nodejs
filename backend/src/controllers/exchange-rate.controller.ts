import { Request, Response } from "express";
import { soapConnection } from "../config/soap.connection";
import RequestItem from "../models/requests.model";
import ExchangeRate from "../models/exchange-rates.model";


export const getTodayExchangeRate = async (_request: Request, response: Response) => {
    try {
        soapConnection.client.TipoCambioDia((err: any, result: any) => {
            if (err) {
                console.error(err)
                return
            }
            response.json(result);
        })

    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}

export const getAvailableVariables = async (_request: Request, response: Response) => {
    try {
        soapConnection.client.VariablesDisponibles((err: any, result: any) => {
            if (err) {
                console.error(err)
                return
            }
            response.json(result);
        })

    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}

export const getExchangeRateRangeAverage = async (request: Request, response: Response) => {
    try {
        const { initialDate, endDate } = request.params;
        console.log({initialDate})
        console.log({endDate})
        if (!initialDate || !endDate) {
            response.status(400).json({
                msg: `Is needed the initial and the final date`
            });
        }
        const args = {
            fechainit: initialDate,
            fechafin: endDate
        }
        soapConnection.client.TipoCambioRango(args, async (err: any, result: any) => {
            if (err) {
                console.error(err)
                return
            }
            const requestItem = await RequestItem.create({
                idCoin: 2
            }) as any;
            const exchangeRates = result.TipoCambioRangoResult.Vars.Var;

            //return response.json(requestItem);
            for (let i = 0; i < exchangeRates.length; i++) {
                let d = exchangeRates[i].fecha.split("/");
                const date = new Date(d[2] + '/' + d[1] + '/' + d[0]);
                await ExchangeRate.create({
                    date: date.toISOString().split('T')[0],
                    sellAmount: exchangeRates[i].venta,
                    buyAmount: exchangeRates[i].compra,
                    idRequest: requestItem.id,
                });

            }

            let totalVenta = 0;
            let totalCompra = 0;

            for (let i = 0; i < exchangeRates.length; i++) {
                totalVenta += exchangeRates[0].venta;
                totalCompra += exchangeRates[0].compra;
            }
            const averageVenta = totalVenta / exchangeRates.length;
            const averageCompra = totalCompra / exchangeRates.length;
            return response.json({
                averageVenta: averageVenta,
                averageCompra: averageCompra
            });
        })

    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}

export const getExchangeRateRange = async (request: Request, response: Response) => {
    try {
        const { initialDate, endDate } = request.params;
        if (!initialDate || !endDate) {
            response.status(400).json({
                msg: `Is needed the initial and the final date`
            });
        }
        console.log(initialDate, endDate)
        const args = {
            fechainit: initialDate,
            fechafin: endDate
        }
        soapConnection.client.TipoCambioRango(args, async (err: any, result: any) => {
            if (err) {
                console.error(err)
                return
            }

            const requestItem = await RequestItem.create({
                idCoin: 2
            }) as any;
            const exchangeRates = result.TipoCambioRangoResult.Vars.Var;

            //return response.json(requestItem);
            for (let i = 0; i < exchangeRates.length; i++) {
                let d = exchangeRates[i].fecha.split("/");
                const date = new Date(d[2] + '/' + d[1] + '/' + d[0]);
                await ExchangeRate.create({
                    date: date.toISOString().split('T')[0],
                    sellAmount: exchangeRates[i].venta,
                    buyAmount: exchangeRates[i].compra,
                    idRequest: requestItem.id,
                });

            }
            return response.json(exchangeRates);
        })

    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}

export const getData = async (request: Request, response: Response) => {
    try {
        const { page } = request.params;
        const count = await ExchangeRate.count();
        const data = await ExchangeRate.findAll({
            limit: 10,
            offset: (Number(page)-1)*10
        });
        response.json({data, total: count});
    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}


export const getExchangeStartDate = async (request: Request, response: Response) => {
    try {
        const { initialDate } = request.params;
        if (!initialDate) {
            response.status(400).json({
                msg: `Is needed the initial and the final date`
            });
        }
        const args = {
            fechainit: initialDate,
        }
        soapConnection.client.TipoCambioFechaInicial(args, async (err: any, result: any) => {
            if (err) {
                console.error(err)
                return
            }
            const exchangeRates = result.TipoCambioFechaInicialResult.Vars.Var;
            return response.json(exchangeRates);
        })

    } catch (error: any) {
        response.status(501).json({
            msg: `Internal server error`
        });
        console.error(error);
    }

}