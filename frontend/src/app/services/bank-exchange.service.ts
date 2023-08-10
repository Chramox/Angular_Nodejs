import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeRates } from '../models/exchange-currency.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BankExchangeService {

  constructor(private http: HttpClient) { }
  URI = environment.API_URL;


  getExchangeData(page: number): Observable<ExchangeRates> {

    return this.http.get<ExchangeRates>(`${this.URI}/bank/getRegisteredData/${page}`);

  }
  getExchangeAverage(initialDate: string, finalDate: string): Observable<any> {

    return this.http.get<any>(`${this.URI}/bank/exchangeRangeAverage/${initialDate}/${finalDate}`);

  }

  getExchangeStartDate(initialDate: string): Observable<any> {

    return this.http.get<any>(`${this.URI}/bank/getExchangeStartDate/${initialDate}`);

  }

}
