import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { Router } from '@angular/router';
import {formatDate, DatePipe} from '@angular/common';

@Component({
  selector: 'app-casting-firstpart',
  templateUrl: './casting-firstpart.component.html',
  styleUrls: ['./casting-firstpart.component.css']
})
export class CastingFirstpartComponent implements OnInit {
  drgObject: any;
  qpaObject: any;
  psObject: any;
  dataSource: any;
  machine: any;
  routeObj: any;
  mObject: any;
  marketData: any;
  myDate = new Date();

  temp :any;

  constructor(private _inspectionservice: InspectionService, private router: Router) { }

  ngOnInit(){
    let myItem1 = localStorage.getItem('DrgCode');
    let opnId = localStorage.getItem('opnNo')
    this.machine = localStorage.getItem('machine')

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));
    this.routeObj = JSON.parse(localStorage.getItem('routeObj'));
    this.mObject = JSON.parse(localStorage.getItem('mObject'));

    this.getfpi(myItem1, opnId);
    this.getmarket(this.routeObj)
    formatDate(new Date(), 'yyyy/MM/dd', 'en');

  }
  printPage() {
    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.outerHTML);
    WindowPrt.document.write(`<style>   
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    .print-row {
      height: 25px;
    }
    th, td {
      padding: 2px;
      text-align: left;
      font-size:10px;
    }
    body, html {
      height: 100%;
      margin: 0;
      font-family: Arial;
    }
    thead {
      page-break-inside: avoid;
      display:table-header-group;
    }

.tg .tg-cly1 {
    text-align: left;
    vertical-align: middle
}
.tg .tg-nr{
  width:15%;
}
.tg .tg-nrix {
    text-align:center;
    vertical-align: middle;
  
}
.mt-4 . tg-cly1 {
  width: 1px;
}

.tg .tg-y0n7 {
    background-color: #efefef;
    text-align: center;
    vertical-align: middle;
    width:8%
}

.tg .tg-t31z {
    background-color: #efefef;
    border-color: #c0c0c0;
    text-align: center;
    vertical-align: middle
}

.tg .tg-0lax {
    text-align: left;
    vertical-align: top
}
.tg .tg-c3ow{
  text-align: left;
}
.tg-nee{
  font-size:10px;
}
td{
    text-align: left;
}
 </style>`);

setTimeout(function() {
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}, 1500);
  }

  getfpi(drgcode, opnId) {
    this._inspectionservice.getfpi(drgcode, opnId).subscribe((res: any) => {
      if (res.success) {
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if (samp[i].firstPartInspection) {
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

}
