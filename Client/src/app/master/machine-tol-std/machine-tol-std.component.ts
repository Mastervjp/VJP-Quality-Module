import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MachineTolDialogComponent } from './machine-tol-dialog/machine-tol-dialog.component';
import { MachineTolStdService } from '../masterservice/machine-tol-std.service';

@Component({
  selector: 'app-machine-tol-std',
  templateUrl: './machine-tol-std.component.html',
  styleUrls: ['./machine-tol-std.component.css']
})
export class MachineTolStdComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _service: MachineTolStdService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getData();


      this.displayedColumns = ['id', 'name', 'edit','delete'];

    
  }


  createData() {
    this.dialogRef = this._matDialog.open(MachineTolDialogComponent, {
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
    this.dialogRef = this._matDialog.open(MachineTolDialogComponent, {
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
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Machining Tolerance Standard?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._service.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getData();
            this.snackBar.open("Machining Tolerance Standard Deleted Sucessfully", "", {
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
