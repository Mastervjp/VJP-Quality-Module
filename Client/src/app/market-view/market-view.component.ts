import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarketService } from '../services/market.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../master/masterservice/material.service';
import { MarketQtyComponent } from '../market-qty/market-qty.component';

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.css']
})
export class MarketViewComponent implements OnInit {

  dataSource: any;

  displayedColumns = ['id', 'drgId', 'poNo', 'orderQty', 'remainingQty', 'createdAt', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  showCard: boolean;

  materilalist: any;

  dialogRef: any;

  constructor(private _formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute, 
    public snackBar: MatSnackBar,
    private _marketservice: MarketService,
    private router: Router,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getData();
    this.showCard = false;
    let status= this.activeRoute.snapshot.queryParams.type;
    if (status) {
      localStorage.setItem('adminLogRole', status);
    } else {
      status = localStorage.getItem('adminLogRole');
    }
  }
  
  show() {
    if (this.showCard) {
      this.showCard = false;
    }
    else {
      this.showCard = true;
    }
  }

  addRoutes() {
    let step1 = this.contactForm.getRawValue();


    localStorage.setItem('drgId', step1.drgId)

    this._marketservice.addRoute(step1).subscribe((res: any) => {
      if (res.success) {
        this.showCard = false;

        this.contactForm.reset();
        this.getData();

        // this.router.navigate(['/marketabstract']); 

      }
      else {

        if (res.error == "Wrong") {
          this.snackBar.open(res.error, "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'errorsnackbarclass'
          });

        }
        else {
          this.snackBar.open(res.error, "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'errorsnackbarclass'
          });
        }

      }
    });

  }


  getData() {


    this._marketservice.getRoutedata().subscribe((res: any) => {
      if (res.success) {
        let mydata = res.data;
        this.dataSource = new MatTableDataSource(mydata);
        this.dataSource.paginator = this.paginator;
      }
    });

  }


  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  viewQty(drg) {

    localStorage.setItem("drgId", drg.drgId);
    localStorage.setItem("mpId", drg.id);

    localStorage.setItem("mObject", JSON.stringify(drg));

    this.dialogRef = this._matDialog.open(MarketQtyComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
        data: drg
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.router.navigate(['/marketabstract']);
      }

    });

  }

  viewClick(step1) {

    localStorage.setItem("drgId", step1.drgId);
    localStorage.setItem("mpId", step1.id);

    localStorage.setItem("mObject", JSON.stringify(step1));


    this.router.navigate(['/marketabstract']);

  }


  contactForm = this._formBuilder.group({
    drgId: ['', Validators.required],
    orderQty: ['', Validators.required],
    poNo: ['', Validators.required],
    poDate: ['', Validators.required],
    PoRevNo: ['', Validators.required],
    LineItem:['', Validators.required],
    CommittedDate:['', Validators.required],


  });

}
