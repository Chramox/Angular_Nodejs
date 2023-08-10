import { Router } from "express";
import { getAvailableVariables, getData, getExchangeRateRange, getExchangeRateRangeAverage, getExchangeStartDate, getTodayExchangeRate } from "../controllers/exchange-rate.controller";

const router = Router();

router.get('/todayExchange', getTodayExchangeRate);
router.get('/variablesAvailable', getAvailableVariables);
router.get('/exchangeRange/:initialDate/:endDate', getExchangeRateRange);
router.get('/exchangeRangeAverage/:initialDate/:endDate', getExchangeRateRangeAverage);
router.get('/getRegisteredData/:page', getData);
router.get('/getExchangeStartDate/:initialDate', getExchangeStartDate);

export default router;