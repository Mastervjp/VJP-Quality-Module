import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { OperationDialogComponent } from '../operation-dialog/operation-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { SamplingDialogComponent } from '../sampling-dialog/sampling-dialog.component';
import { SamplingService } from '../services/sampling.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProcessService } from '../services/process.service';
import { QualityService } from '../services/quality.service';
import { MatProgressSpinnerModule } from '@angular/material';


@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.css'],
})
export class SamplingComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  formData;
  validityCheck = true;
  isLoading = true;

  constructor(
    private _sampleservice: SamplingService,
    private _formBuilder: FormBuilder,
    public auth: AuthenticationService,
    private router: Router,
    private _operationservice: OperationService,
    private _process: ProcessService,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar,
    private _qualityservice: QualityService,
    private _drawingservice: DrawingService) { }


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
  Oplist: any;
  workData: any;
  instrumentList: any;
  measuringList: any;
  submitshow: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.isLoading = true;
    this.userTable = this._formBuilder.group({
      tableRows: this._formBuilder.array([])
    });
    this.getSampling();
    this.getWorkcenter()
    this.getOplist();
    this.getInstrument();
    this.getMeasuring();

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
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'workCenter', 'baloonNo', 'description', 'specification', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', 'firstPartInspection', 'periodicInspection', 'ctq', 'cfir', 'fir',  'delete'];
    }
    else {
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'workCenter', 'baloonNo', 'description', 'specification',  'tolFrom', 'tolTo', 'instrument', 'measuringFrequency',  'firstPartInspection', 'periodicInspection', 'ctq', 'cfir', 'fir', 'delete'];
    }
  }

  getWorkcenter() {
    this._operationservice.getWorkcenter().subscribe((res: any) => {
      if (res.success) {
        this.workData = res.data;
      }
    });
  }

  getOplist() {
    this._operationservice.getOplist().subscribe((res: any) => {
      if (res.success) {
        this.Oplist = res.data;
      }
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

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this._formBuilder.group({
      id: new FormControl(),
      pid: new FormControl(),
      opnNo: new FormControl(),
      opnName: new FormControl(''),
      description: new FormControl(''),
      workCenter: new FormControl(''),
      specification: new FormControl(''),
      tolFrom: new FormControl(''),
      tolTo: new FormControl(''),
      instrument: new FormControl(''),
      measuringFrequency: new FormControl(''),
      baloonNo: new FormControl(''),
      firstPartInspection: new FormControl(),
      periodicInspection: new FormControl(),
      ctq: new FormControl(),
      cfir: new FormControl(),
      fir: new FormControl(),
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  addNewRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.insert(0, this.initiateForm());
    this.dataSource = new MatTableDataSource(this.userTable.controls["tableRows"].value);
    this.dataSource.paginator = this.paginator;
    }


  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  inspection() {
    this.router.navigate(['/inspection']);
  }

  createSampling() {
    this.dialogRef = this._matDialog.open(SamplingDialogComponent, {
      width: '600px',
      panelClass: 'contact-form-dialog',
      data: {
        action: 'new',
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitshow = true;
      }
      this.getSampling();

    });

  }

  async updateOperation() {
    this.isLoading = true;
    if (this.userTable.valid && this.validityCheck == true) {
      let tempData = this.userTable.value.tableRows;
        for(let element of tempData){
          element.drgId = JSON.parse(localStorage.getItem('drgObject')).id;
        if (element.id) {
          await new Promise ((resolve, reject) => { 
          this._sampleservice.updateSampling(element.id, element).subscribe((res: any) => {
            console.log(res);
            resolve();
          });
        });
          console.log(element.id, "update");
        } else {
          element.desc = element.description;
          delete element.id;
          delete element.pid;
          delete element.description;
          
          if (element.firstPartInspection) {
            //action
            element.firstPartInspection = true

          }
          else {
            element.firstPartInspection = 0
          }
          if (element.periodicInspection) {
            //action
          }
          else {
            element.periodicInspection = 0
          }
          if (element.ctq) {
            //action
          }
          else {
            element.ctq = 0
          }
          element.pdi = element.fir;
           await new Promise ((resolve, reject) => { 
            this._sampleservice.addSampling(element).subscribe((res: any) => {
                console.log(res);
                resolve();
              });                  
        }); 
        }
      }
      for (let element of tempData) {
        element.drgId = JSON.parse(localStorage.getItem('drgObject')).id;
        if (element.id) {
          let status = { "status": null }
          this._qualityservice.approvalsample(element.drgId, status).subscribe((res: any) => {
          });

          let masterStatus = { "masterStatus": null }
          this._qualityservice.approvalSampleMaster(element.drgId, masterStatus).subscribe((res: any) => {
          });


          let operatorStatus = { "operatorStatus": null }
          this._qualityservice.updatesamplestatus(element.drgId, operatorStatus).subscribe((res: any) => {
          });




          let id = localStorage.getItem('DrgCode')
          let techApproval = { "techApproval": null }
          this._drawingservice.updatestatus(element.drgId, techApproval).subscribe((res: any) => {
          });
        }
      }
       this.snackBar.open("Process updated successfully", "", {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'errorsnackbarclass'
      });
      this.ngOnInit();
    } else {
      alert("Please fill the data in the required fields");
    }

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
      this.getSampling();
      if (result) {
        this.submitshow = true;
      }

    });
  }

   deleteDrg(id) {

    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Process?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        this._sampleservice.deleteOperation(id).subscribe((res: any) => {
          if (res.success) {
            this.submitshow = true;
            this.getSampling();
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

    localStorage.setItem('psObject', JSON.stringify(product))
    var a = product.id;

    let key = 'opnNo';
    localStorage.setItem(key, a);

    localStorage.setItem('opnValue', product.opnNo);

    localStorage.setItem('opnName', product.opnName);

    this.router.navigate(['/process']); //we can send product object as route param
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


  getSampling() {

    let temp = JSON.parse(localStorage.getItem("drgObject"));
    let drgid = temp.id;
    this._sampleservice.getSampling(drgid).subscribe((res: any) => {
      if (res.success) {
        let mydata = res.data;
        var result = [];
        mydata.forEach((opn) => {
          opn.Processes.forEach((pro) => {
            result.push({
              "id": opn.id,
              "baloonNo":pro.baloonNo,
              "opnNo": opn.opnNo,
              "opnName": opn.opnName,
              "description": pro.description,
              "workCenter": opn.workCenter,
              "specification": pro.specification,
              "tolFrom": pro.tolFrom,
              "tolTo": pro.tolTo,
              "instrument": pro.instrument,
              "measuringFrequency": pro.measuringFrequency,
              "grid": pro.grid,
              "firstPartInspection": pro.firstPartInspection,
              "periodicInspection": pro.periodicInspection,
              "ctq": pro.ctq,
              "opnId": pro.opnId,
              "drgId": pro.drgId,
              "pid": pro.id,
              "cfir":pro.cfir,
              "fir": pro.pdi

            });
            this.addRow();
          });
        });

        
        this.formData = result;
        this.userTable.controls["tableRows"].patchValue(this.formData)
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }

    });

  }

  checkAvailability(data) {
    this.validityCheck = true;
    let tempData;
    tempData = this.userTable.value.tableRows.find(element => data.opnNo == element.opnNo && data.pid != element.pid);
    if( tempData.opnName != data.opnName && tempData.opnName != "" ) {
      this.validityCheck = false;
      alert("Please Enter the corressponding Operation number and name");
    }
  }
}
