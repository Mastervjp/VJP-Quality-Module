import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BatchquantityComponent } from '../batchquantity/batchquantity.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-navbar4',
  templateUrl: './navbar4.component.html',
  styleUrls: ['./navbar4.component.css']
})
export class Navbar4Component implements OnInit {

  constructor(private router: Router,public dialog: MatDialog, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }


  qty: any;
  dialogRef: any;
  confirmDialogRef: any;
  
  taphide = 0;

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  
  openDialog(): void {
    let dialogRef = this.dialog.open(BatchquantityComponent, {
      width: '250px',
      data: { qty: this.qty }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('batch_qty', result);
        this.taphide = 1;
      }
    });
  }
  
}


