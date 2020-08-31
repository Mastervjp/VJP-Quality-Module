import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from '../services/drawing.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { DrawingDialogComponent } from '../drawing-dialog/drawing-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../services/authentication.service';

export interface UserData {
  id: number;
  drgCode: number;
  partNum: number;
  revNo: string;
  revDate: string;
  customerName: string;
}

@Component({
  selector: 'app-qpapproval-drawing-table',
  templateUrl: './qpapproval-drawing-table.component.html',
  styleUrls: ['./qpapproval-drawing-table.component.css']
})

export class QpapprovalDrawingTableComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  dialogRef: any;
  confirmDialogRef: any;
  islog: boolean;
  isad: boolean;
  isSuper: boolean;
  displayedColumns: any;
  isTT: boolean;
  isET: boolean;
  isUT: boolean;
  isDIS: boolean;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isADM: boolean;
  isTEC: boolean;
  isENGG: boolean;
  isDISP: boolean;
  isOPE: boolean;
  isMT: boolean;
  isMASTER: boolean;

  constructor(private _drawingservice: DrawingService,
    public activeRoute: ActivatedRoute,
    public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.getdata();
    let status = localStorage.getItem('adminLogRole');
    this.checkrole(status);
    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();
    this.isSuper = this.auth.isSuperAdmin();
    localStorage.removeItem('qpaObject');
    localStorage.removeItem('psObject');
    if (status == 'ope' || status == 'disp') {
      this.isad = false;
    }

    if (this.isTT || this.isMT) {
      this.displayedColumns = ['sno', 'id', 'partName', 'partNum', 'partNum1', 'revNo', 'revNo1', 'customerName', 'materialGrade',];

    }

    else {
      this.displayedColumns = ['sno', 'id', 'partName', 'partNum', 'partNum1', 'revNo', 'revNo1', 'customerName', 'materialGrade'];
    }
  }

  checkrole(status) {
    if (localStorage.getItem('logRole') == "TT" || status == 'tec') {
      this.isTT = true;
      this.isTEC = true;
    }
    else if (localStorage.getItem('logRole') == "ET" || status == 'engg') {
      this.isET = true;
      this.isENGG = true;
    }
    else if (localStorage.getItem('logRole') == "DIS" || status == 'disp') {
      this.isDIS = true;
      this.isDISP = true;
    }

    else {
      this.isTT = false;
      this.isET = false;
      this.isTEC = false;
      this.isENGG = false;
      this.isDIS = false;
      this.isDISP = false;

    }
    if (localStorage.getItem('logRole') == "UT" || status == 'ope') {
      this.isUT = true;
      this.isOPE = true;
    }
    else if (localStorage.getItem('logRole') == "MT" || status == 'MASTER') {
      this.isMT = true;
      this.isMASTER = true;
    }
    else {
      this.isUT = false;
      this.isOPE = false;
      this.isMT = false;
      this.isMASTER = false;
    }

  }

  Lockaction(id, status) {


    if (status) {

      let datas = { "unlockStatus": 0 }

      this._drawingservice.updateDrawing(id, datas).subscribe((res: any) => {
        if (res.success) {
          this.snackBar.open("Drawing Code Locked", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successsnackbarclass'
          });
          this.getdata();

        }

      });


    }

    else {

      let datas = { "unlockStatus": 1 }

      this._drawingservice.updateDrawing(id, datas).subscribe((res: any) => {
        if (res.success) {
          this.snackBar.open("Drawing Code Unocked", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successsnackbarclass'
          });
          this.getdata();

        }
      });
    }




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
    let tempStore = [];
    let techdrawing = [];
    this._drawingservice.getdrgdata().subscribe((res: any) => {

      if (this.isTT) {
        res.forEach((element) => {
          if (element.techApproval == null) {
            techdrawing.push(element);
          }
        });
        this.dataSource = new MatTableDataSource(techdrawing);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        res.forEach((element) => {
          if (element.techApproval == true) {
            tempStore.push(element);
          }
        });
        this.dataSource = new MatTableDataSource(tempStore);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  callOperation(product) {
    localStorage.setItem('drgObject', JSON.stringify(product));
    localStorage.setItem('DrgCode', product.id);
    localStorage.setItem('drgId', product.id);
    localStorage.setItem('d_partno', product.partNum);
    localStorage.setItem('d_revno', product.revNo);
    localStorage.setItem('d_revdate', product.revDate);
    localStorage.setItem('drg_number', product.drgCode);
    this.router.navigate(['/qpabstract']);
    // this.router.navigate(['/processplan']); 
  }
  batchqty(product) {
    localStorage.setItem('drgObject', JSON.stringify(product));
    localStorage.setItem('DrgCode', product.id);
    localStorage.setItem('drgId', product.id);

    localStorage.setItem('firCheck', "1");

    this.router.navigate(['/batchqty']);
    // this.router.navigate(['/processplan']); 
  }
  routecard(product) {
    localStorage.setItem('drgObject', JSON.stringify(product));
    localStorage.setItem('DrgCode', product.id);
    localStorage.setItem('drgId', product.id);
    localStorage.setItem('d_partno', product.partNum);
    localStorage.setItem('d_revno', product.revNo);
    localStorage.setItem('d_revdate', product.revDate);
    localStorage.setItem('drg_number', product.drgCode);
    this.router.navigate(['/qpabstract']);
    // this.router.navigate(['/processplan']); 
  }

  sampling() {

    this.router.navigate(['/samplingcode']);

  }

}




