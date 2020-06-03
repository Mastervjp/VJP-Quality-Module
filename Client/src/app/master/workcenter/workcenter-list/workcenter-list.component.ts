import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WorkcenterDialogComponent } from '../workcenter-dialog/workcenter-dialog.component';
import { WorkcenterService } from '../../masterservice/workcenter.service';

@Component({
  selector: 'app-workcenter-list',
  templateUrl: './workcenter-list.component.html',
  styleUrls: ['./workcenter-list.component.css']
})
export class WorkcenterListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _workcenterservice: WorkcenterService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getWorkcenter();
    this.displayedColumns = ['id', 'name', 'edit'];
  }


  createWorkcenter() {
    this.dialogRef = this._matDialog.open(WorkcenterDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.getWorkcenter();

    });

  }
  editWorkcenter(datas) {
    this.dialogRef = this._matDialog.open(WorkcenterDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getWorkcenter();
    });
  }

  getWorkcenter() {

    let type = localStorage.getItem('type')

    this._workcenterservice.getWorkcenter().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

}
