import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import stocksData from '../../assets/stocks.json';

export interface Stock {
  CompanyName: string,
  Industry: string,
  Symbol: string,
  selected?: boolean
}
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: Stock[]  = stocksData;
  filteredStocks = stocksData;
  filterValue: string = '';
  startingFrom: number = 0;
  noOfStocks: number = 0;

  get selectedStocks(){
    return this.stocks.filter(stock => stock.selected);
  }
  get selectedStockSymbols(){
    return this.selectedStocks.map(stock=> stock.Symbol);
  }
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  filterStocks(){
    if(!this.filterValue){
      this.filteredStocks = this.stocks;
    }
    else{
      this.filteredStocks = this.stocks.filter((stock) => {
        const filter = this.filterValue.toLocaleLowerCase();
        return stock.CompanyName.toLocaleLowerCase().indexOf(filter)!==-1 || stock.Symbol.toLocaleLowerCase().indexOf(filter)!==-1
      });
    }
  }
  selectionChanged(event, stock){
    console.log(event, stock);
    stock.selected = !stock.selected;
  }

  clearFilter(){
    this.filterValue='';
    this.filterStocks();
  }

  startingFromChanged(){
    console.log('startingFrom ',this.startingFrom);
    this.refreshSelection();
  }

  private refreshSelection() {
    if (this.startingFrom && this.noOfStocks && this.startingFrom + this.noOfStocks < this.stocks.length) {
      for (let i = 0; i < this.stocks.length ; i++) {
        if( i >= this.startingFrom - 1 && i < this.startingFrom - 1 + this.noOfStocks){
          this.stocks[i].selected = true;
        }
        else {
          this.stocks[i].selected = false;
        }
      }
    }
  }

  noOfStocksChanged(){
    console.log('noOfStocks ',this.noOfStocks);
    this.refreshSelection();
  }

}
