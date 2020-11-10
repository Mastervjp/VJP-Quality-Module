import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  qpaObject: any;
  

  constructor(private _inspectionservice: InspectionService,private router: Router) { }

  fircheck: boolean;
  castCheck:boolean= false
  opnName;
  routeObj :any;
  marketData: any;

  drgObject: any;
  psObject: any;
  myDate = new Date();

  ngOnInit() {
    this.routeObj = JSON.parse(localStorage.getItem('routeObj'));
    this.getmarket(this.routeObj);
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let temp = localStorage.getItem("firCheck");
    this.opnName = localStorage.getItem("opnName");
    if (temp == '1') {
      this.fircheck = true
    }
    else {
      this.fircheck = false
    }
    this.fircheck;
    if(this.opnName == 'Incoming Inspection of Aluminium Ingot' || this.opnName == 'Metal treatment' || this.opnName == 'Molten metal inspection' || 
    this.opnName == 'Heat Treatment T6-BDF' || this.opnName == 'Heat treatment-T6 Oven' || this.opnName == 'Pouring & Casting Ejection & In process inspection ' 
    || this.opnName == 'Die cleaning & die loading & die preheating & coating' || this.opnName == 'Metal Charging & Melting' || this.opnName == 'Mechanical Properties Testing'
    || this.opnName == 'Runner & Riser Cutting' || this.opnName == 'Fettling' || this.opnName == 'Shot Blast & Inspection') {
      this.castCheck = true;
      this.fircheck= true;

    }
  }
  getmarket(routeObj1) {
    let id = routeObj1.mpId;
    this._inspectionservice.getmarket(id).subscribe((res: any) => {
      if (res.success) {
        this.marketData = res.data;
      }
    });
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
 
  drawing() {
    localStorage.removeItem('DrgCode');

    this.router.navigate(['/drawing']);
  }

  printPage() {

    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=10,top=10,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style> 
      
      div{
        padding:5%
      }
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      tr {
        page-break-inside: avoid;
      }
      th, td {
        padding: 2px;
        font-size:10px;
      }
      .bottomBorder {
        border-bottom-color: transparent;
      }
      .rightBorder {
        border-right-color: transparent;
      }
      .leftBorder{
        border-top-color : transparent;
      }
      * {box-sizing: border-box}
      body, html {
        height: 100%;
        margin: 0;
        font-family: Arial;
      }
      .tablink {
        background-color: #555;
        color: white;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 17px;
        width: 15%;
      }
      .tablink:hover {
        background-color: #777;
      }
      .tabcontent {
        color: black;
        display: none;
        padding: 50px 20px;
        height: 100%;
      }
      .bg {
      background-color:transparent;
      color: rgb(192, 192, 192);
      font-size: 40px;
      text-align: center;
      }
      .bg-text
      {
      color:lightgrey;
      font-size:40px;
      transform:rotate(300deg);
      -webkit-transform:rotate(300deg);
    
    }
      </style>`);


    setTimeout(function () {
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 800);
  }
}
