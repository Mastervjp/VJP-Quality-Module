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

  constructor(private _qualityservice: QualityService, public auth: AuthenticationService, private router: Router, private _matDialog: MatDialog, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getdata();
    this.checkrole();
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));

    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();

    this.isSuper = this.auth.isSuperAdmin();



    this.displayedColumns = ['id', 'pfNo', 'kind', 'qpNo'];

  }

  checkrole(){

   if (localStorage.getItem('logRole') == "ET") {
      this.isET = true;
    }
    else {
      this.isET = false;

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
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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




}
