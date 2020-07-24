import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractreviewService } from '../services/contractreview.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ContractreviewEditComponent } from '../contractreview-edit/contractreview-edit.component';
@Component({
  selector: 'app-contractreview-view',
  templateUrl: './contractreview-view.component.html',
  styleUrls: ['./contractreview-view.component.css']
})
export class ContractreviewViewComponent implements OnInit {
  dataSource: any;
  isMKT: boolean;
  islog: any;
  _dialogRef: any;
  sort: any;
  displayedColumns: string[];
  isMARKET: boolean;
  constructor(private _contractreviewservice: ContractreviewService, private _matDialog: MatDialog, public auth: AuthenticationService, private _formBuilder: FormBuilder, private router: Router
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.getData('logRole');
    this.checkrole();
    this.islog = this.auth.isLoggedIn();
    if (this.islog && this.isMKT) {
      this.displayedColumns = ['id', 'customerName', 'billTo', 'status', 'Edit', 'action'];

    }
    else {
      this.displayedColumns = ['id', 'customerName', 'billTo', 'view', 'status'];
    }
  }
  checkrole() {
    if (localStorage.getItem('logRole') == "MKT" || localStorage.getItem('adminLogRole') == "market") {
      this.isMKT = true;
      this.isMARKET =false;
    }
    else {
      this.isMKT = false;
      this.isMARKET =false;
    }
  }
  viewroute(data) {
    localStorage.setItem("id", data);
    this.router.navigate(['/contractreview-print']);
  }
  getData(logRole) {
    this._contractreviewservice.getData().subscribe((res: any) => {
      if (res.success) {
        let samp = res.data
        let re_data = [];
        for (var i in samp) {
          if (samp[i]) {
            re_data[re_data.length] = samp[i]
          }
        }
        this.dataSource = re_data;
      }
    });
  }
  editContract(datas) {
    this._dialogRef = this._matDialog.open(ContractreviewEditComponent, {
      width: '1200px',
      height: '100%',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'edit',
        data: datas
      }
    });
    this._dialogRef.afterClosed().subscribe(result => {
      this.getData('logRole');
    });
  }

}

