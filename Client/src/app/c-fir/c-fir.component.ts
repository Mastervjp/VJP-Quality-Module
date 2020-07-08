import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-fir',
  templateUrl: './c-fir.component.html',
  styleUrls: ['./c-fir.component.css']
})
export class CFirComponent implements OnInit {
  dataSource: any;
  marketData: any;
  routeObj: any;
  drgObject: any;

  constructor(private _inspectionservice: InspectionService,private router: Router) { }

  ngOnInit(): void {
    let myItem1 = localStorage.getItem('DrgCode');
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.routeObj = JSON.parse(localStorage.getItem('routeObj'));
    this.getfir(myItem1);
    this.getmarket(this.routeObj);
  }
  getfir(drgcode) {
    this._inspectionservice.getfir(drgcode).subscribe((res: any) => {
      if (res.success) {
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if (samp[i].cfir) {
            re_data[re_data.length] = samp[i]
          }
        }
        this.dataSource = re_data;
      }
    });
  }
  getmarket(routeObj1) {
    let id = routeObj1.mpId;
    this._inspectionservice.getmarket(id).subscribe((res: any) => {
      if (res.success) {
        this.marketData = res.data;
      }
    });
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


 setTimeout(function() {
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }, 800);
}

}
