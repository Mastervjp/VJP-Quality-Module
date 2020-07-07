// import { Component, OnInit } from '@angular/core';


// export class ContractreviewPrintComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractreviewService } from '../services/contractreview.service';
import {formatDate, DatePipe} from '@angular/common';
@Component({
  selector: 'app-contractreview-print',
  templateUrl: './contractreview-print.component.html',
  styleUrls: ['./contractreview-print.component.css']
})
export class ContractreviewPrintComponent implements OnInit {
  customer: any;
  dataSource: any;
  customerName: any;
 customerData: any;
 myDate = new Date();
  constructor(private _contractreviewservice: ContractreviewService,private router: Router) {
  
   }

  ngOnInit(): void {
    this.getCustomerData();
    // this.customerName = JSON.parse(localStorage.getItem("customerName"));
    // debugger;
    // this.customerData = this._contractreviewservice.getCustomerData(this.customerName).subscribe((res: any)=>{})
    formatDate(new Date(), 'yyyy/MM/dd', 'en');

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


 getCustomerData() {

  debugger;
  let customerName = localStorage.getItem('customerName');
  this._contractreviewservice.getCustomerData(customerName).subscribe((res: any) => {
    debugger;
    if (res.success) {
      let mydata = res.data;
      this.dataSource =mydata;
      console.log(this.dataSource);
    }
  });
 }
 

 }
