import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductcharacteristicsService } from '../masterservice/productcharacteristics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import { ProductCharacteristicsDialogComponent } from './product-characteristics-dialog/product-characteristics-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ProductcharacteristicsComponent } from '../dialog/productcharacteristics/productcharacteristics.component';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.css']
})
export class ProductCharacteristicsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _ProductcharacteristicsService: ProductcharacteristicsService,
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

    this._ProductcharacteristicsService.getData().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createData() {
    this.dialogRef = this._matDialog.open(ProductcharacteristicsComponent, {
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
    this.dialogRef = this._matDialog.open(ProductcharacteristicsComponent, {
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

        this._ProductcharacteristicsService.deleteData(id).subscribe((res: any) => {
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
