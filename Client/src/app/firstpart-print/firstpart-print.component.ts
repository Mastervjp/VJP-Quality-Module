import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpart-print',
  templateUrl: './firstpart-print.component.html',
  styleUrls: ['./firstpart-print.component.css']
})
export class FirstpartPrintComponent implements OnInit {
  drgObject: any;
  qpaObject: any;
  psObject: any;
  dataSource: any;
  machine: any;
  routeObj: any;
  mObject: any;
  marketData: any;

  constructor(private _inspectionservice: InspectionService, private router: Router) { }

  ngOnInit() {

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


  }

  printPage() {
    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style>   
.tg {
    border-collapse: collapse;
    border-spacing: 0;
    border-color: #ccc;
}
 table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th, td {
        padding: 5px;
        text-align: left;
      }

.tg td {
    
    font-size: 10px;
    padding: 10px 5px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    word-break: normal;
    border-color: #ccc;
    color: #333;
    background-color: #fff;
    text-align: center;
}

.tg th {
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: normal;
    padding: 10px 5px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    word-break: normal;
    border-color: #ccc;
    color: #333;
    background-color: #f0f0f0;
}

.tg .tg-cly1 {
    text-align: left;
    vertical-align: middle
}

.tg .tg-nrix {
    text-align: center;
    vertical-align: middle
}

.tg .tg-y0n7 {
    background-color: #efefef;
    text-align: center;
    vertical-align: middle
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
td{
    text-align: center;
} </style>`);

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
            re_data[i] = samp[i]
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