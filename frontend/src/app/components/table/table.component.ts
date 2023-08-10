import { Component, Input, OnChanges } from '@angular/core';
import { BankExchangeService } from 'src/app/services/bank-exchange.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  table: any[] = [];
  currentPage = 1;
  totalPages: number[] = [1];

  constructor(private exchangeServe: BankExchangeService) {
    this.changePage(this.currentPage);
  }

  changePage(page: number) {
    console.log({page})
    this.currentPage = page;
      if (this.currentPage < 1){ 
        this.currentPage = 1;
      }
      else if (this.currentPage > this.totalPages.length) {
        this.currentPage = this.totalPages.length;
      }
    this.exchangeServe.getExchangeData(this.currentPage).subscribe(res => {
      const groupData = this.groupBy(res.data, 'idRequest')
      let list = []
      for (const key of Object.keys(groupData)) {
        const row = {
          rowspan: groupData[key].length,
          values: groupData[key],
          idRequest: key
        }
        list.push(row);
      }
      this.table = list;
      this.totalPages =  Array(Math.ceil(res.total/10)).fill(0).map((x,i)=>i+1);
      
    });
  }

  groupBy(items: any[], key: string | number) {
    return items.reduce(
      (result: any, item:any) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }),
      {},
    );
  }
}
