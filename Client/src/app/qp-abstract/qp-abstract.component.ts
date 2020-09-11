import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from '../services/drawing.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { QualityService } from '../services/quality.service';
import { QpDialogComponent } from '../qp-dialog/qp-dialog.component';
import { AdditionalproDialogComponent } from '../additionalpro-dialog/additionalpro-dialog.component';
import { AddkindDialogComponent } from '../addkind-dialog/addkind-dialog.component';

@Component({
  selector: 'app-qp-abstract',
  templateUrl: './qp-abstract.component.html',
  styleUrls: ['./qp-abstract.component.css']
})
export class QpAbstractComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  islog: boolean;
  isad: boolean;
  isSuper: boolean;
  displayedColumns: any;

  drgObject: any;
  isET:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isENGG: boolean;
  DrgCode: string;
  status: string;
  techApproval: string;
  approvalbutton: boolean;
  dragObject: string;
  status1: string;
  qpaObject: string;
  isMT: boolean;
  isMASTER: boolean;

  constructor(private _drawingservice: DrawingService,
    private _qualityservice: QualityService,
    public auth: AuthenticationService,
    private router: Router,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar,) { }
    
  ngOnInit() {
    this.getdata();
    this.checkrole();
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));

    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();

    this.isSuper = this.auth.isSuperAdmin();


    let logRole = localStorage.getItem('logRole');
    if (logRole == 'TT') {
      this.displayedColumns = ['id', 'pfNo', 'kind', 'qpNo', 'pfstatus', 'sendmaster'];
    }
    else if (logRole == 'MT') {
      this.displayedColumns = ['id', 'pfNo', 'kind', 'qpNo', 'pfmasterstatus', 'sendOperator'];
    }
    else if (logRole == 'UT') {
      this.displayedColumns = ['id', 'operatorPfNo', 'kind', 'operatorQpNo'];
    }
    else {
      this.displayedColumns = ['id', 'pfNo', 'kind', 'qpNo'];
    }
  }

  showAlert(){
    alert("Drawing Code is not approved. Try after Approval")
  }

  checkrole(){

   if (localStorage.getItem('logRole') == "ET" || localStorage.getItem('adminLogRole') == 'engg') {
      this.isET = true;
      this.isENGG=true
    }
    else if (localStorage.getItem('logRole') == "MT" || status == 'MASTER') {
      this.isMT = true;
      this.isMASTER = true;
    }
    else {
      this.isET = false;
      this.isENGG=false;
      this.isMT = false;
      this.isMASTER = false;

    }

  }


  createAltProcess() {
    
    this.dialogRef = this._matDialog.open(AdditionalproDialogComponent, {
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

  createKind() {
    this.dialogRef = this._matDialog.open(AddkindDialogComponent, {
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

    let DrgCode = localStorage.getItem('DrgCode')

    this._qualityservice.getquality(DrgCode).subscribe((res: any) => {

      this._qualityservice.getDrawing(DrgCode).subscribe((drawRes: any) => {
        res.data.forEach(element => {
          if(element.status == true && drawRes.data[0].techApproval == true) {
            element.button = true;
          }
          else
          {
            element.button = false;
          }
          console.log(element);
          console.log(res.data)
          
        });

      });
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dragObject = localStorage.getItem('drgObject.techApproval')
    });
  }

  callOperation(product) {

    localStorage.setItem('qpaObject', JSON.stringify(product));


    localStorage.setItem('qpid', product.id);
    localStorage.setItem('qpno', product.qpNo);
    localStorage.setItem('pfno', product.pfNo);

    let str = product.pfNo;
    if(str.includes("-20")){
      this.router.navigate(['/altprocess']); //we can send product object as route param

    }

    else if(str.includes("-30")){
      this.router.navigate(['/kindprocess']); //we can send product object as route param

    }

    else{
      this.router.navigate(['/processplan']); //we can send product object as route param

    }

  }

  Lockaction(id, techApproval) {
    if (techApproval) {
      let id = localStorage.getItem('DrgCode')
      let techApproval = { "techApproval": 1 }
      this._drawingservice.updatestatus(id, techApproval).subscribe((res: any) => {
        if (res.success) {
          this.getdata();
          this.snackBar.open("Successfully sended for master verification", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });
    }
  }


  LockactionOp(pfno, operatorStatus) {
    if (operatorStatus) {
      let pfno = localStorage.getItem('pfno')
      let operatorStatus = { "operatorStatus": 1 }
      this._qualityservice.updatestatus(pfno, operatorStatus).subscribe((res: any) => {
        if (res.success) {
          this.getdata();
          this.snackBar.open("Successfully sended To operator", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });
    }
  }

}
