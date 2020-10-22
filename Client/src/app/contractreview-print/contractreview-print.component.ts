import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractreviewService } from '../services/contractreview.service';
import { formatDate, DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contractreview-print',
  templateUrl: './contractreview-print.component.html',
  styleUrls: ['./contractreview-print.component.css']
})
export class ContractreviewPrintComponent implements OnInit {
  customer: any;
  dataSource: any;
  customerName: any;
  customerData: any;
  myDate = new Date();
  getData: any;
  islog: any;
  isMAN: boolean;
  isMANAGEMENT: boolean;
  public rejectForm: FormGroup;
  rejection =false;

  invoiceForm: FormGroup;
  _formBuilder: any;
  constructor(private _contractreviewservice: ContractreviewService, public activeRoute: ActivatedRoute, private router: Router, public auth: AuthenticationService, public snackBar: MatSnackBar,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCustomerData();
    let status= this.activeRoute.snapshot.queryParams.type;
    this.checkrole(status);
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.islog = this.auth.isLoggedIn();
    
    this.invoiceForm = this._formBuilder.group({
      Rows: this._formBuilder.array([this.initRows()])
    });

    this.rejectForm = new FormGroup({
      'comment': new FormControl('', [Validators.required]),
    });
  }
  initRows(): any {
    throw new Error('Method not implemented.');
  }
  checkrole(status) {
    if (localStorage.getItem('logRole') == "MAN" ||localStorage.getItem('adminLogRole') == 'management') {
      this.isMAN = true;
      this.isMANAGEMENT = true;
    }
    else {
      this.isMAN = false;
      this.isMANAGEMENT = false;
    }

  }
  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  printPage() {
    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=1000,height=1000,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style>   
    table,
    td,
    th {
        border: 1px solid BLACK;
        text-align: left;
        font-size: 10px;
        padding:2px;
    }
    body, html {
      height: 100%;
      margin: 0;
      font-family: Arial;
    }

    table {
        border-collapse: collapse;
        font-size: 10px;
    }
    td,
    th{
      padding:2px;
    }
    table {
      width: 100%;
  }

  @page {
    margin: 1cm;
  }
  
  /* target the first page only */
  @page :first {
    margin-top: 1cm;
  }
  
  /* target left (even-numbered) pages only */
  // @page :left {
  //   margin-right: 1cm;
  //  }
  
  /* target right (odd-numbered) pages only */
  // @page :right {
  //   margin-left: 1cm;
  // }

  table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }

    
    </style>`
    );


    setTimeout(function () {
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 2500);
  }
  getCustomerData() {
    let id = localStorage.getItem('id');     


    this._contractreviewservice.getCustomerData(id).subscribe((res: any) => {

      if (res.success) {
        let mydata = res.data;
        this.dataSource = mydata;
      }
    });
  }
  getAllData() {
    let status =localStorage.getItem('status');
  }
 
  Lockaction(id, status) {
    if (status) {
      let status = { "status": 1 } 
      this._contractreviewservice.updatestatus(id, status).subscribe((res: any) => { 
        if (res.success) {
          this.router.navigate(['/contractreviewview']);
          let mydata = res.data;
          this.getData = mydata;
          this.snackBar.open("Form Approved", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          });
        }
          this.getData();         
        });
      }
    else {
      this.rejection = true;
      this.rejectForm = new FormGroup({
        'comment': new FormControl('', [Validators.required]),
      });
      // this.rejectForm = this._formBuilder.group({
      //   comment: ['', [Validators.required]]
      // });
    
      // let status = { "status": 0 }    
      // this._contractreviewservice.updatestatus(id, status).subscribe((res: any) => {
      //   if (res.success) {
      //     this.router.navigate(['/contractreviewview']);
      //     let mydata = res.data;
      //     this.getData = mydata;
      //     this.snackBar.open("Form Rejected", "", {
      //       duration: 1500,
      //       horizontalPosition: 'end',
      //       verticalPosition: 'top',
      //       panelClass: 'successSnackBar'
      //     });         
      //   }
      //    this.getData();
      // });
    }
  }

  rejectWithComments(id,status) {
  
      let statusReject = { "status": 0, 
      "statusComment": this.rejectForm.controls['comment'].value }
    this._contractreviewservice.updatestatus(id, statusReject).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['/contractreviewview']);
          let mydata = res.data;
          this.getData = mydata;
          this.snackBar.open("Form Rejected", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          });        
      }
      this.getData();
    });
  
}
}

