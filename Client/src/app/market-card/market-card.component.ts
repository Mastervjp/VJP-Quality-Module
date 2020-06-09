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
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style>   
    table,
    td,
    th {
        border: 1px solid BLACK;
        text-align: left;
        height: 100%;
    }
    
    table {
        border-collapse: collapse;
    }
    
    th,
    td {
        padding: 9px;
    }
    table {
      width: 100%;
  }
    
    </style>`
    );

    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }


  getoperation() {
    let drgid = localStorage.getItem('drgId');
    this._marketservice.getCarddata(drgid).subscribe((res: any) => {
      debugger;
      if (res.success) {
        let mydata = res.data;
        this.dataSource =mydata;
      }
    });
  }

  getData(){

    let mpId = localStorage.getItem('drgId');

    this._marketservice.getCardHeader(mpId).subscribe((res: any) => {
      debugger
      if (res.success) {
        let mydata = res.data;
        this.headerSource = mydata
        ;
      }
    });
  }


  getRemainingQty(){

    let mpId = localStorage.getItem('mpId');

    this._marketservice.getRemainingQty(mpId).subscribe((res: any) => {
      if (res.success) {
        this.MpheaderSource = res.data;

        debugger;
      }
    });
  }

}
