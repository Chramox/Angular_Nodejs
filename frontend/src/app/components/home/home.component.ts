import { Component } from '@angular/core';
import { BankExchangeService } from 'src/app/services/bank-exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  initialDate: string;
  finalDate: string;
  ventaAverage: number = 0;
  compraAverage: number = 0;
  show = true;

  constructor(private bankService: BankExchangeService) {
    this.initialDate = '';
    this.finalDate = '';
  }

  resetChildForm() {
    this.show = false;

    setTimeout(() => {
      this.show = true
    }, 100);
  }

  average() {
    const date1 = new Date(this.initialDate);
    const date2 = new Date(this.finalDate);
    if (!this.isValidDate(date1) && !this.isValidDate(date2)) {
      alert('Fechas inválidas');
      return;
    }
    this.bankService.getExchangeAverage(this.transformDate(this.initialDate), this.transformDate(this.finalDate))
      .subscribe(res => {
        this.ventaAverage = res.averageCompra;
        this.compraAverage = res.averageVenta;
        this.resetChildForm();
      });
  }

  isValidDate(d: any) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  transformDate(date: string) {
    const splitDate = date.split('-')
    return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]
  }
}
