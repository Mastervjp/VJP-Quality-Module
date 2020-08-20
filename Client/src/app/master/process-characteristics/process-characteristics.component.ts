import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesscharacteristicsService } from '../masterservice/processcharacteristics.service';
import { MatSnackBar, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ProcesscharacteristicsComponent } from '../dialog/processcharacteristics/processcharacteristics.component';

@Component({
  selector: 'app-process-characteristics',
  templateUrl: './process-characteristics.component.html',
  styleUrls: ['./process-characteristics.component.css']
})
export class ProcessCharacteristicsComponent implements OnInit {


  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _ProcesscharacteristicsService: ProcesscharacteristicsService,
     public auth: AuthenticationService, 
     private router: Router,
      private _matDialog: MatDialog,
       public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getData();


    this.displayedColumns = ['id', 'name', 'edit','delete'];
  }


  getData() {

    let type = localStorage.getItem('type')

  this._ProcesscharacteristicsService.getData().subscribe((res: any) => {
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

createData() {
  this.dialogRef = this._matDialog.open(ProcesscharacteristicsComponent, {
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
  this.dialogRef = this._matDialog.open(ProcesscharacteristicsComponent, {
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
  this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Special Process?';

  this.confirmDialogRef.afterClosed().subscribe(result => {
    if (result) {

      this._ProcesscharacteristicsService.deleteData(id).subscribe((res: any) => {
        if (res.success) {
          this.getData();
          this.snackBar.open("Special Process Deleted Sucessfully", "", {
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