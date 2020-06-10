import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchquantityComponent } from '../batchquantity/batchquantity.component';
import { ProcessService } from '../services/process.service';
import { ProcessDialogComponent } from '../process-dialog/process-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-alt-quality-plan',
  templateUrl: './alt-quality-plan.component.html',
  styleUrls: ['./alt-quality-plan.component.css']
})
export class AltQualityPlanComponent implements OnInit {

 
  constructor(private _processservice: ProcessService, public auth: AuthenticationService, private router: Router, public dialog: MatDialog, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }

  drgcode: any;
  opno: any;
  qty: any;

  opnValue: any;
  //displayedColumns = ['id', 'description', 'specification', 'toloreanceGrade','tolFrom','tolTo','instrument','measuringFrequency','grid','remarks','firstPartInspection','periodicInspection','ctq','edit','delete'];
  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;

  islog: boolean;
  isad: boolean;
  isUT: boolean;
  displayedColumns: any;

  taphide = 0;

  drgObject: any;
  qpaObject: any;

  submitshow: boolean;
  psObject: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {

    let myItem1 = localStorage.getItem('DrgCode');
    let myItem2 = localStorage.getItem('opnNo');

    this.opnValue = localStorage.getItem('opnValue');

    this.getprocess(myItem1, myItem2);

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.psObject = JSON.parse(localStorage.getItem('psObject'));

    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();

    if (this.drgObject.qpStatus) {
      this.submitshow = false;
    }
    else {
      this.submitshow = true;

    }
    this.submitshow;

    if (this.islog && this.isad) {
      this.displayedColumns = ['id', 'description','baloonNo', 'specification', 'toloreanceGrade', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency','edit', 'delete'];
    }
    else {
      this.displayedColumns = ['id', 'description', 'baloonNo', 'specification', 'toloreanceGrade', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', ];
    }

    if (localStorage.getItem('logRole') == "UT") {
      this.isUT = true;
    }
    else{
      this.isUT = false;
    }


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

  inspection() {
    this.router.navigate(['/inspection']);
  }


  getprocess(drgcode, opno) {
    this._processservice.getaltproQp(drgcode, opno).subscribe((res: any) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  confirmQuality() {
    let id = localStorage.getItem('DrgCode');
    this._processservice.confirmQuality(id).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/drawing']);
        this.snackBar.open("Quality plan Generated", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'successsnackbarclass'
        });
      }
    });
  }



  createProcess() {
    this.dialogRef = this._matDialog.open(ProcessDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
        type:'altpro'
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.submitshow = true;
      }

      let myItem1 = localStorage.getItem('DrgCode');
      let myItem2 = localStorage.getItem('opnNo');

      this.getprocess(myItem1, myItem2);

    });

  }
  editDrawing(datas) {
    this.dialogRef = this._matDialog.open(ProcessDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.submitshow = true;
      }

      let myItem1 = localStorage.getItem('DrgCode');
      let myItem2 = localStorage.getItem('opnNo');

      this.getprocess(myItem1, myItem2);
    });
  }

  deleteDrg(id) {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Drg Code?';



    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._processservice.deleteProcess(id).subscribe((res: any) => {
          if (res.success) {
            this.submitshow = true;

            let myItem1 = localStorage.getItem('DrgCode');
            let myItem2 = localStorage.getItem('opnNo');
            this.getprocess(myItem1, myItem2);

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

}
