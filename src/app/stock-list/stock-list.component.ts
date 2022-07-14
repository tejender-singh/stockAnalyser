import { Component, OnInit } from '@angular/core';
import stocksData from '../../assets/stocks.json';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: any[] = stocksData;
  selectedStocks = [];
 constructor() { }

  ngOnInit(): void {
  }

  stockClicked(stock){
    console.log(stock);
    if(this.selectedStocks.indexOf(stock.Symbol)===-1){
      this.selectedStocks.push(stock.Symbol);      
    } else {
      this.selectedStocks.splice(this.selectedStocks.indexOf(stock.Symbol), 1);
    }
  }

}
