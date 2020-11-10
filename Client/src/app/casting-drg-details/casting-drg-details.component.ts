import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-casting-drg-details',
  templateUrl: './casting-drg-details.component.html',
  styleUrls: ['./casting-drg-details.component.css']
})
export class CastingDrgDetailsComponent implements OnInit {
  drgObject:any;
  qpaObject:any;
  psObject:any;
  routeObj :any;
  marketData:any;
  myDate = new Date();
  machine:any;
  weekNumber;

  constructor(private _inspectionservice: InspectionService) { }

  ngOnInit() {
    this.getmarket();

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));
    this.routeObj = JSON.parse(localStorage.getItem('routeObj'));
    this.machine = localStorage.getItem('machine');
    this.getmarket()
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.weekNumber = this.getWeek();
  }
  getmarket() {

    let routeObj1 = JSON.parse(localStorage.getItem('routeObj'));
    let id = routeObj1.mpId;
    this._inspectionservice.getmarket(id).subscribe((res: any) => {
      if (res.success) {
        this.marketData = res.data;
      }
    });
  }

  getWeek() {
    var onejan = new Date(new Date().getFullYear(), 0, 1).getTime();
    var onejan1 = new Date(new Date().getFullYear(), 0, 1);
    var today = new Date().getTime();
    return Math.ceil(((( today - onejan) / 86400000) + onejan1.getDay() + 1) / 7);
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
    th, td {
      padding: 2px;
      text-align: left;
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
