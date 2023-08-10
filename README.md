# Angular_Nodejs

Proyecto que consume web service del banco de guatemala, con el objetivo de obtener el promedio de taza de compra y venta en un rango de fecha dado por el usuario.


## Frontend (Angular)

### BankService
* Servicio que permite realizar las peticiones hacia el backend, que a su vez consume los servicios SOAP del banco.


## Backend - NodeJS con TypeScript
### Endpoints
   
* Ruta tipo GET que permite obtener todas las fechas consultadas al momento de realizar el promedio de compras y ventas de la taza de tipo de cambio.

```ts
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
```


* Ruta tipo GET que retorna las variables disponibles
```ts
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
```

## Base de Datos (MySql)
Consultar el archivo db.sql 
