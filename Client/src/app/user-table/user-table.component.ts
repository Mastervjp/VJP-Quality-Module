import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { DrawingService } from '../services/drawing.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  // dataSource1 = new UserDataSource(this._drawingservice);
  // UserData ;
  // dataSource: MatTableDataSource<UserData>;
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  islog: boolean;
  isad: boolean;

  displayedColumns = ['id', 'name', 'email', 'role', 'edit', 'delete'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private _adminservice: AdminService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getdata();
    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();

  }


  createDrawing() {
    this.dialogRef = this._matDialog.open(UserDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.getdata();

    });

  }
  editDrawing(datas) {
    this.dialogRef = this._matDialog.open(UserDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getdata();
    });
  }

  deleteDrg(id) {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this User?';



    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {


        this._adminservice.deleteUser(id).subscribe((res: any) => {
          if (res.success) {
            this.getdata();
            this.snackBar.open("User Deleted Sucessfully", "", {
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




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Logout() {
    localStorage.clear();

    this.router.navigate(['/login']);

  }


  getdata() {
    this._adminservice.getUser().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }


}
