import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MachineService } from '../../masterservice/machine.service';
import { MachineDialogComponent } from '../machine-dialog/machine-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  displayedColumns: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _machineservice: MachineService, public activeRoute: ActivatedRoute, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.getMachine();

    let status = this.activeRoute.snapshot.queryParams.type;
    this.displayedColumns = ['id', 'name', 'edit', 'delete'];

    if (status) {
      localStorage.setItem('adminLogRole', status);
    } else {
      status = localStorage.getItem('adminLogRole');
    }
  }


  createMachine() {
    this.dialogRef = this._matDialog.open(MachineDialogComponent, {
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
    this.dialogRef = this._matDialog.open(MachineDialogComponent, {
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

    this._machineservice.getMachine().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteData(id) {

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Machines/Workcenter?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._machineservice.deleteData(id).subscribe((res: any) => {
          if (res.success) {
            this.getMachine();
            this.snackBar.open("Machines/Workcenter Deleted Sucessfully", "", {
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
