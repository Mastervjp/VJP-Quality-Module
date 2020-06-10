import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';

@Component({
  selector: 'app-firstpart',
  templateUrl: './firstpart.component.html',
  styleUrls: ['./firstpart.component.css']
})
export class FirstpartComponent implements OnInit {

  constructor(private _inspectionservice: InspectionService, private router: Router) { }
  drgcode: any;
  d_partno:any
  d_revno:any;
  d_revdate:any;

  drgObject:any;
  qpaObject:any;
  psObject:any;

  displayedColumns = ['id', 'description', 'specification', 'toloreanceGrade', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency','remarks','x1','x2','x3','x4','x5'];

  dataSource = [];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    let myItem1 = localStorage.getItem('DrgCode');
    this.drgcode =myItem1; 
    this.d_partno = localStorage.getItem('d_partno');
    this.d_revno = localStorage.getItem('d_revno');
    this.d_revdate = localStorage.getItem('d_revdate');
    let opnId = localStorage.getItem('opnNo')
    

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));


    // this.drgcode = myItem1;
    // this.drgcode =112;
    // this.opno = 20;
    this.getfpi(myItem1,opnId);

  }

  printPage() {
    window.print();
  }


  getfpi(drgcode,opnId) {
    this._inspectionservice.getfpi(drgcode,opnId).subscribe((res: any) => {
      if (res.success) {

        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if( samp[i].firstPartInspection){
            re_data[i] = samp[i]
          }
        }
        this.dataSource = re_data;
      }
    });
  }

}
