import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchquantityComponent } from '../batchquantity/batchquantity.component';
import { ProcessService } from '../services/process.service';

import { ProcessDialogComponent } from '../process-dialog/process-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { QualityService } from '../services/quality.service';
import { OperationService } from '../services/operation.service';

BatchquantityComponent
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  isOPE: boolean;
  isSuper: boolean;
  isENGG: boolean;
  isET: boolean;

  public invoiceForm: FormGroup;
  isTT: boolean;
  tec: boolean;
  isMT: boolean;
  appButton: boolean;
  appButton1: boolean;
  ismaster: boolean;
  constructor(private _processservice: ProcessService,
    private _process: ProcessService,
    public activeRoute: ActivatedRoute,
    public auth: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _operationservice: OperationService,
    private _qualityservice: QualityService,
    private _drawingservice: DrawingService) { }
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  instrumentList: any;
  measuringList: any;
  type: any;
  drgcode: any;
  opno: any;
  qty: any;
  opnValue: any;
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

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  get rows() {
    console.log(this.invoiceForm.get('Rows'))
    return this.invoiceForm.get('Rows') as FormArray;
  }
  ngOnInit() {
    let status = localStorage.getItem('adminLogRole')
    this.checkrole(status);
    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();
    this.isSuper = this.auth.isSuperAdmin();
    localStorage.getItem('adminLogRole');
    let myItem1 = localStorage.getItem('DrgCode');
    let myItem2 = localStorage.getItem('opnNo');

    this.opnValue = localStorage.getItem('opnValue');

    this.getprocess(myItem1, myItem2);

    this.getInstrument();
    this.getMeasuring();
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

    if (this.islog && this.isENGG || this.isET) {
      this.displayedColumns = ['id', 'description', 'baloonNo', 'specification', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', 'firstPartInspection', 'periodicInspection', 'ctq', 'pdi', 'cfir', 'edit', 'delete'];
    }
    else if (this.islog && this.isTT) {
      this.displayedColumns = ['id', 'description', 'baloonNo', 'specification', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', 'Approve'];
    }
    else if (this.islog && this.isMT) {
      this.displayedColumns = ['id', 'description', 'baloonNo', 'specification', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', 'masterApprove'];
    }
    else {
      this.displayedColumns = ['id', 'description', 'baloonNo', 'specification', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency',];
    }

    this.invoiceForm = this._formBuilder.group({
      Rows: this._formBuilder.array([this.initRows()])
    });



  }

  getInstrument() {

    this._process.getInstrument().subscribe((res: any) => {
      if (res.success) {
        this.instrumentList = res.data;
      }
    });
  }

  getMeasuring() {
    this._process.getMeasuring().subscribe((res: any) => {
      if (res.success) {
        this.measuringList = res.data;
      }
    });
  }

  checkrole(status) {

    if (localStorage.getItem('logRole') == "UT" || localStorage.getItem('adminLogRole') == 'ope') {
      this.isUT = true;
      this.isOPE = true;
    }
    else if (localStorage.getItem('logRole') == "ET" || localStorage.getItem('adminLogRole') == 'engg') {
      this.isET = true;
      this.isENGG = true;
    }
    else if (localStorage.getItem('logRole') == "TT" || localStorage.getItem('adminLogRole') == 'tec') {
      this.isTT = true;
      this.tec = true;
    }
    else if (localStorage.getItem('logRole') == "MT" || localStorage.getItem('adminLogRole') == 'master') {
      this.isMT = true;
      this.ismaster = true;
    }

    else {
      this.isUT = false;
      this.isOPE = false;
      this.isTT = false;
      this.tec = false;
      this.isET = false;
      this.isENGG = false;
    }
    this.isUT
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


  // getprocess(drgcode, opno) {
  //   this._processservice.getprocess(drgcode, opno).subscribe((res: any) => {
  //     if (res.success) {
  //       this.dataSource = new MatTableDataSource(res.data);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }
  getprocess(drgcode, opno) {
    let tempCheck;
    this.appButton = false;
    let tempCheck1;
    this.appButton1 = false;
    this._processservice.getprocess(drgcode, opno).subscribe((res: any) => {
  
      if (res.success) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        res.data.forEach(element => {
          if (element.status == true) {
            this.appButton = true;
          } else {
            tempCheck = false;
          }

          if (tempCheck == false) {
            this.appButton = false;
          }

        });
        res.data.forEach(element => {
          if (element.masterApproval == true) {
            this.appButton1 = true;
          } else {
            tempCheck1 = false;
          }

          if (tempCheck1 == false) {
            this.appButton1 = false;
          }

        });
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

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.submitshow = true;
      }

      let myItem1 = localStorage.getItem('DrgCode');
      let myItem2 = localStorage.getItem('opnNo');

      this.getprocess(myItem1, myItem2);

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
            let masterApproval = { "masterApproval": '1' }
            this._process.updatemasterstatus(id, masterApproval).subscribe((res: any) => {
            
            });
            let status = { "status": '1' }
            this._process.updatestatus(id, status).subscribe((res: any) => {
           
            });
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


  contactForm = this._formBuilder.group({
    description: ['', Validators.required],
    specification: ['', Validators.required],
    tolFrom: ['', Validators.required],
    baloonNo: ['', Validators.required],
    tolTo: ['', Validators.required],
    instrument: ['', Validators.required],
    measuringFrequency: ['', Validators.required],
    firstPartInspection: ['', Validators.required],
    periodicInspection: [],
    ctq: [],
    pdi: [],
    cfir: [],
  });

  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  initRows() {
    return this._formBuilder.group({
      description: ['', Validators.required],
      specification: ['', Validators.required],
      tolFrom: ['', Validators.required],
      baloonNo: ['', Validators.required],
      tolTo: ['', Validators.required],
      instrument: ['', Validators.required],
      measuringFrequency: ['', Validators.required],
      firstPartInspection: ['', Validators.required],
      periodicInspection: [],
      ctq: [],
      pdi: [],
      cfir: [],
    });
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }


  onChange(val, index, key) {

    this.dataSource.data[index][key] = val.target.value
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addProcess() {
    let step1 = this.contactForm.getRawValue();
    let myItem1 = localStorage.getItem('DrgCode');
    let myItem2 = localStorage.getItem('opnNo');
    let myItem3 = localStorage.getItem('type');
    step1.drgId = myItem1;
    step1.opnId = myItem2;
    step1.type = myItem3;
    step1.opnName = localStorage.getItem('opnName');

    let tempdata = this.instrumentList;

    for (var k in tempdata) {
      if (tempdata[k].name == step1.instrument) {
        step1.insId = tempdata[k].id;
      }
    }

    this._process.addProcess(step1).subscribe((res: any) => {
      if (res.success) {
        this.contactForm.reset();
        this.snackBar.open("Table Added Sucessfully ", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'successsnackbarclass'
        });
        let myItem1 = localStorage.getItem('DrgCode');
        let myItem2 = localStorage.getItem('opnNo');
        this.getprocess(myItem1, myItem2);
      }
      else {
        this.snackBar.open(res.message, "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'errorsnackbarclass'
        });
      }
    });
  }

  updateProcess(editId, arg1) {
    

    let step1 = this.dataSource.data[arg1]
    let tempdata = this.instrumentList;
    for (var k in tempdata) {
      if (tempdata[k].name == step1.instrument) {
        step1.insId = tempdata[k].id;
      }
    }

    step1
    this._process.updateProcess(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.contactForm.reset();
        this.snackBar.open("Process Updated Sucessfully", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'successsnackbarclass'
        });

      }
      else {
        this.snackBar.open(res.message, "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'errorsnackbarclass'
        });
      }
    });
  }
  updateProcess1() {


    for (let index = 0; index < this.dataSource.data.length; index++) {

      var editId = this.dataSource.data[index].id;

      let step1 = this.dataSource.data[index]
      let tempdata = this.instrumentList;
      for (var k in tempdata) {
        if (tempdata[k].name == step1.instrument) {
          step1.insId = tempdata[k].id;
        }
      }

      step1
      this._process.updateProcess(editId, step1).subscribe((res: any) => {
        if (res.success) {

          
          let status = { "status": null }
          this._operationservice.updatestatus(editId, status).subscribe((res: any) => {
          });
  
          let masterApproval = { "masterApproval": null }
          this._operationservice.updatemasterstatus(editId, masterApproval).subscribe((res: any) => {
          });
          let opnNo = localStorage.getItem('opnNo');
          let qpTechConfirm = { "qpTechConfirm": null }
          this._operationservice.approval(opnNo, qpTechConfirm).subscribe((res: any) => {
          });
  
          let qpMasterApproval = { "qpMasterApproval": null }
          this._operationservice.approval1(opnNo, qpMasterApproval).subscribe((res: any) => {
          });
  
  
          let pfno = localStorage.getItem('pfno');
          this._qualityservice.approval(pfno, status).subscribe((res: any) => {
        
          });

          let masterStatus = { "masterStatus": null }
          this._qualityservice.approval1(pfno, masterStatus).subscribe((res: any) => {
       
          });
          
          
          let operatorStatus = { "operatorStatus": null }
          this._qualityservice.updatestatus(pfno, operatorStatus).subscribe((res: any) => {
    
          });

          

          
          let id = localStorage.getItem('DrgCode')
          let techApproval = { "techApproval": null } 
          this._drawingservice.updatestatus(id, techApproval).subscribe((res: any) => {
          });
  

          this._process.updatemasterstatus(editId, masterApproval).subscribe((res: any) => {
           
          });

          this._process.updatestatus(editId, status).subscribe((res: any) => {
          
          });




          this.contactForm.reset();
          this.snackBar.open("Process Updated Sucessfully", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successsnackbarclass'
          });

        }
        else {
          this.snackBar.open(res.message, "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'errorsnackbarclass'
          });
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
  approval(opnNo, qpTechConfirm) {

    if (qpTechConfirm) {
      let opnNo = localStorage.getItem('opnNo');
      let qpTechConfirm = { "qpTechConfirm": 1 }
      this._operationservice.approval(opnNo, qpTechConfirm).subscribe((res: any) => {
      
        if (res.success) {
          this.router.navigate(['/processplan']);
          this.snackBar.open("Form Approved", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });
    }
  }
  Lockaction(id, status) {
    if (status) {

      let status = { "status": 1 }


      this._processservice.updatestatus(id, status).subscribe((res: any) => {
     
        if (res.success) {
          let myItem1 = localStorage.getItem('DrgCode');
          let myItem2 = localStorage.getItem('opnNo');

          this.getprocess(myItem1, myItem2);
          this.snackBar.open("Form Approved", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });

    }

    else {

      let status = { "status": 0 }

      this._processservice.updatestatus(id, status).subscribe((res: any) => {
    
        if (res.success) {
          let myItem1 = localStorage.getItem('DrgCode');
          let myItem2 = localStorage.getItem('opnNo');

          this.getprocess(myItem1, myItem2);
          this.snackBar.open("Form Rejected", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });
    }
    


  }
  Lockaction1(id, masterApproval) {
    if (masterApproval) {

      let masterApproval = { "masterApproval": 1 }


      this._processservice.updatemasterstatus(id, masterApproval).subscribe((res: any) => {
  
        if (res.success) {
          let myItem1 = localStorage.getItem('DrgCode');
          let myItem2 = localStorage.getItem('opnNo');
          this.getprocess(myItem1, myItem2);
          this.snackBar.open("Form Approved", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });

    }

    else {

      let masterApproval = { "masterApproval": 0 }

      this._processservice.updatemasterstatus(id, masterApproval).subscribe((res: any) => {
  
        if (res.success) {
          let myItem1 = localStorage.getItem('DrgCode');
          let myItem2 = localStorage.getItem('opnNo');

          this.getprocess(myItem1, myItem2);
          this.snackBar.open("Form Rejected", "", {
            duration: 1500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'successSnackBar'
          })
        }
      });
    }

  }
  approval1(opnNo, qpMasterApproval) {

    if (qpMasterApproval) {
      let opnNo = localStorage.getItem('opnNo');
      let qpMasterApproval = { "qpMasterApproval": 1 }
      this._operationservice.approval1(opnNo, qpMasterApproval).subscribe((res: any) => {
  
        if (res.success) {
          this.router.navigate(['/processplan']);
          this.snackBar.open("Form Approved", "", {
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
