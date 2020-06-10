import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predispatch',
  templateUrl: './predispatch.component.html',
  styleUrls: ['./predispatch.component.css']
})
export class PredispatchComponent implements OnInit {

  drgObject: any;
  qpaObject: any;
  psObject: any;
  dataSource: any;

  constructor(private _inspectionservice: InspectionService, private router: Router) { }

  ngOnInit() {

    let myItem1 = localStorage.getItem('DrgCode');
    let opnId = localStorage.getItem('opnNo')


    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));

    this.getfpi(myItem1, opnId);

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
    
    font-size: 14px;
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
    font-size: 14px;
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

    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  getfpi(drgcode, opnId) {
    this._inspectionservice.getfpi(drgcode, opnId).subscribe((res: any) => {
      if (res.success) {

        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if (samp[i].pdi) {
            re_data[i] = samp[i]
          }
        }
        this.dataSource = re_data;
      }
    });
  }

}
