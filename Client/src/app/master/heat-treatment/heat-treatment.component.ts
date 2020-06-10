import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { HeatTreatmentDialogComponent } from './heat-treatment-dialog/heat-treatment-dialog.component';
import { HeatTreatmentService } from '../masterservice/heat-treatment.service';

@Component({
  selector: 'app-heat-treatment',
  templateUrl: './heat-treatment.component.html',
  styleUrls: ['./heat-treatment.component.css']
})
export class HeatTreatmentComponent implements OnInit {

 
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _service: HeatTreatmentService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getData();


      this.displayedColumns = ['id', 'name', 'edit','delete'];

    
  }


  createData() {
    this.dialogRef = this._matDialog.open(HeatTreatmentDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.getData();

    });

  }
  editData(datas) {
    this.dialogRef = this._matDialog.open(HeatTreatmentDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() {

      let type = localStorage.getItem('type')

    this._service.getData().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Heat Treatment Cycle?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._service.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getData();
            this.snackBar.open("Heat Treatment Cycle Deleted Sucessfully", "", {
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
