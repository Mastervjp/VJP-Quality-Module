import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { IncomingsourceService } from '../masterservice/incomingsource.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { IncomingComponent } from '../dialog/incoming/incoming.component';

@Component({
  selector: 'app-incoming-source',
  templateUrl: './incoming-source.component.html',
  styleUrls: ['./incoming-source.component.css']
})
export class IncomingSourceComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _IncomingsourceService: IncomingsourceService,
     public auth: AuthenticationService, 
     private router: Router,
      private _matDialog: MatDialog,
       public snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.getData();


    this.displayedColumns = ['id', 'name', 'edit','delete'];

  }

 getData() {

      let type = localStorage.getItem('type')

      this._IncomingsourceService.getData().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addData() {
    this.dialogRef = this._matDialog.open(IncomingComponent, {
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
    this.dialogRef = this._matDialog.open(IncomingComponent, {
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



  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Incoming Source?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._IncomingsourceService.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getData();
            this.snackBar.open("Incoming Source Deleted Sucessfully", "", {
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
