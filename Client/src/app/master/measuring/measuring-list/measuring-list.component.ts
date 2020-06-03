import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WorkcenterService } from '../../masterservice/workcenter.service';
import { MeasuringDialogComponent } from '../measuring-dialog/measuring-dialog.component';
import { MeasuringService } from '../../masterservice/measuring.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-measuring-list',
  templateUrl: './measuring-list.component.html',
  styleUrls: ['./measuring-list.component.css']
})
export class MeasuringListComponent implements OnInit {

 
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _workcenterservice: MeasuringService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getWorkcenter();
    this.displayedColumns = ['id', 'name', 'edit','delete'];
  }


  createWorkcenter() {
    this.dialogRef = this._matDialog.open(MeasuringDialogComponent, {
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
    this.dialogRef = this._matDialog.open(MeasuringDialogComponent, {
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

    this._workcenterservice.getMeasuring().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Measuring Frequency?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._workcenterservice.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getWorkcenter();
            this.snackBar.open("Measuring Frequency Deleted Sucessfully", "", {
              duration: 1500,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'successSnackBar'
            });
          }
        });
      }
      this.confirmDialogRef = null;
    });
  }


}
