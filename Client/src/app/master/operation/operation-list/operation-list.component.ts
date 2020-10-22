import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WorkcenterService } from '../../masterservice/workcenter.service';
import { OperationDialogComponent } from 'src/app/operation-dialog/operation-dialog.component';
import { OperationlistService } from '../../masterservice/operationlist.service';
import { OperationDialogComponent1 } from '../operation-dialog/operation-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ProcessListComponent } from 'src/app/process-list/process-list.component';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _workcenterservice: OperationlistService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getWorkcenter();
    this.displayedColumns = ['id', 'name', 'edit','delete'];
  }


  createWorkcenter() {
    this.dialogRef = this._matDialog.open(OperationDialogComponent1, {
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
    this.dialogRef = this._matDialog.open(OperationDialogComponent1, {
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

    this._workcenterservice.getOperation().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Process?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._workcenterservice.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getWorkcenter();
            this.snackBar.open("Process Deleted Sucessfully", "", {
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
  createDrawing(product) {


    localStorage.setItem('processObject', JSON.stringify(product));
    localStorage.setItem('processName', product.name);
    this.dialogRef = this._matDialog.open(ProcessListComponent, {

      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.submitshow = true;
      }
    });

  }

}
