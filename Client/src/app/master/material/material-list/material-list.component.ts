import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { InstrumentService } from '../../masterservice/instrument.service';
import { MachineService } from '../../masterservice/machine.service';
import { MaterialService } from '../../masterservice/material.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _drawingservice: MaterialService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getMachine();


      this.displayedColumns = ['id','materialSpec', 'materialGrade','edit','delete'];

    
  }


  createMachine() {
    this.dialogRef = this._matDialog.open(MaterialDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.getMachine();

    });

  }
  editMachine(datas) {
    this.dialogRef = this._matDialog.open(MaterialDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getMachine();
    });
  }

  getMachine() {

      let type = localStorage.getItem('type')

    this._drawingservice.getMaterial().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Material?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._drawingservice.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getMachine();
            this.snackBar.open("Material Deleted Sucessfully", "", {
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
