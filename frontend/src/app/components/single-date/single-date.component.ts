import { Component } from '@angular/core';
import { BankExchangeService } from 'src/app/services/bank-exchange.service';

@Component({
  selector: 'app-single-date',
  templateUrl: './single-date.component.html',
  styleUrls: ['./single-date.component.scss']
})
export class SingleDateComponent {
  show = false;
  initialDate = '';
  table:any[] = [];
  totalPages: number[] = [1];
  currentPage = 1;

  constructor(private bankService: BankExchangeService) {

  }


  singleDate() {
    const date = new Date(this.initialDate);
    if (!this.isValidDate(date)) {
      alert('Fecha inválida');
      return;
    }
    this.changePage(1)
  }

  changePage(page: number) {
    console.log({ page })
    this.currentPage = page;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    else if (this.currentPage > this.totalPages.length) {
      this.currentPage = this.totalPages.length;
    }
    this.bankService.getExchangeStartDate(this.transformDate(this.initialDate))
      .subscribe(res => {
        const offset = (this.currentPage - 1) * 10;
        const limit = (offset + 10 > res.length) ? res.length : offset + 10;
        console.log(res)
        this.table = res.slice(offset, limit);
        this.totalPages = Array(Math.ceil(res.length / 10)).fill(0).map((x, i) => i + 1);
        this.show = true;

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
