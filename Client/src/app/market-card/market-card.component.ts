import { Component, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.css']
})
export class MarketCardComponent implements OnInit {
  dataSource: any;

  routeObj: any;

  headerSource: any;

  MpheaderSource: any;


  mObject : any;

  constructor(private _marketservice: MarketService, private router: Router, ) { }

  ngOnInit() {
    this.getoperation();

    this.getData();

    this.getRemainingQty();

    this.routeObj = JSON.parse(localStorage.getItem("routeObj"));

    this.mObject = JSON.parse(localStorage.getItem("mObject"));

    this.dataSource
   


  }
  Logout(){ 
    localStorage.clear();
    this.router.navigate(['/login']);
  
  }

 

  printPage() {
    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style>   
    table,
    td,
    th {
        border: 1px solid BLACK;
        text-align: left;
        font-size: 9px;
        padding:2px;
    }
    body, html {
      height: 100%;
      margin: 0;
      font-family: Arial;
    }

    table {
        border-collapse: collapse;
        font-size: 9px;
    }
    td,
    th{
      padding:2px;
    }
    table {
      width: 100%;
  }

  @page {
    margin: 1cm;
  }
  
  /* target the first page only */
  @page :first {
    margin-top: 1cm;
  }
  
  /* target left (even-numbered) pages only */
  // @page :left {
  //   margin-right: 1cm;
  //  }
  
  /* target right (odd-numbered) pages only */
  // @page :right {
  //   margin-left: 1cm;
  // }

  table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }

    
    </style>`
    );

    
  setTimeout(function() {
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }, 2500);
}


  getoperation() {
    let drgid = localStorage.getItem('drgId');
    this._marketservice.getCarddata(drgid).subscribe((res: any) => {
      
      if (res.success) {
        let mydata = res.data;
        this.dataSource =mydata;
      }
    });
  }

  getData(){

    let mpId = localStorage.getItem('drgId');

    this._marketservice.getCardHeader(mpId).subscribe((res: any) => {
      
      if (res.success) {
        let mydata = res.data;
        this.headerSource = mydata
        
      }
    });
  }


  getRemainingQty(){

    let mpId = localStorage.getItem('mpId');

    this._marketservice.getRemainingQty(mpId).subscribe((res: any) => {
      if (res.success) {
        this.MpheaderSource = res.data;

        
      }
    });
  }

}
