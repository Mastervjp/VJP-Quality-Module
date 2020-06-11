import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MachineService } from '../../masterservice/machine.service';
import { DrawingtypeService } from '../../masterservice/drawingtype.service';
import { DrawingDialogComponent1 } from '../drawing-dialog/drawing-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-drawing-list',
  templateUrl: './drawing-list.component.html',
  styleUrls: ['./drawing-list.component.css']
})
export class DrawingListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;
  isOpen = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _drawingservice: DrawingtypeService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getMachine();


      this.displayedColumns = ['id', 'name', 'edit','delete'];

    
  }


  createMachine() {
    this.dialogRef = this._matDialog.open(DrawingDialogComponent1, {
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
    this.dialogRef = this._matDialog.open(DrawingDialogComponent1, {
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

    this._drawingservice.getDrawing().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id){

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Drawing Type?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._drawingservice.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getMachine();
            this.snackBar.open("Drawing Type Deleted Sucessfully", "", {
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
