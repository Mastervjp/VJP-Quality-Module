import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { OperationDialogComponent } from '../operation-dialog/operation-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { CopyProcessComponent } from '../copy-process/copy-process.component';

@Component({
  selector: 'app-kind-process-plan',
  templateUrl: './kind-process-plan.component.html',
  styleUrls: ['./kind-process-plan.component.css']
})
export class KindProcessPlanComponent implements OnInit {

 
  constructor(private _drawingservice: DrawingService, public auth: AuthenticationService, private router: Router, private _operationservice: OperationService, private _matDialog: MatDialog, public snackBar: MatSnackBar) { }


  islog: boolean;
  isad: boolean;

  displayedColumns: any;
  drgObject: any;
  qpaObject: any;

  // dataSource: FilesDataSource | null;
  //displayedColumns = ['id', 'opnNo', 'opnName', 'description','type', 'workCenter','edit','delete'];

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;

  submitshow: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.getoperation();

    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));

    if (this.drgObject.pfStatus) {
      this.submitshow = false;
    }
    else {
      this.submitshow = true;

    }

    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();


    if (this.islog && this.isad) {
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'description', 'workCenter', 'edit', 'delete'];
    }
    else {
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'description', 'workCenter'];
    }

  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  inspection() {
    this.router.navigate(['/inspection']);
  }

  showcopy(){

    this.dialogRef = this._matDialog.open(CopyProcessComponent, {
      width: '1200px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
        type :'addkind'
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.snackBar.open("Process Copied Sucessfully", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'successsnackbarclass'
        });

      }
      
      this.getoperation();

    });

  }

  createDrawing() {



    this.dialogRef = this._matDialog.open(OperationDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
        type :'addkind'
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitshow = true;
      }
      this.getoperation();

    });

  }
  editDrawing(datas) {

    this.dialogRef = this._matDialog.open(OperationDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getoperation();
      if (result) {
        this.submitshow = true;
      }

    });
  }

  deleteDrg(id) {

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Operation?';



    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._operationservice.deleteOperation(id).subscribe((res: any) => {
          if (res.success) {
            this.submitshow = true;

            this.getoperation();
            this.snackBar.open("Operation Deleted Sucessfully", "", {
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



  callOperation(product) {

    localStorage.setItem('psObject',JSON.stringify(product))
    var a = product.id;

    let key = 'opnNo';
    localStorage.setItem(key, a);

    localStorage.setItem('opnValue', product.opnNo);

    localStorage.setItem('opnName', product.opnName);

    this.router.navigate(['/kindquality']); //we can send product object as route param
  }

  confirmProcess() {


    let drgId = localStorage.getItem('DrgCode');
    this._operationservice.updatePfStatus(drgId).subscribe((res: any) => {
      if (res.success) {

        this.snackBar.open("Process Flow Generated", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'successsnackbarclass'
        });
        this.submitshow = false;

      }

    });


    // this.router.navigate(['/process']); //we can send product object as route param
  }


  getoperation() {
    let qpid = localStorage.getItem('qpid');
    let drgid = localStorage.getItem('DrgCode');
    this._operationservice.getkindprocess(drgid).subscribe((res: any) => {
      if (res.success) {
        let mydata = res.data;
        this.dataSource = new MatTableDataSource(mydata);
        this.dataSource.paginator = this.paginator;
      }

    });

  }

}
