import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.css']
})
export class SamplingComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  formData;

  constructor(
    private _sampleservice: SamplingService,
    private _formBuilder: FormBuilder,
    public auth: AuthenticationService,
    private router: Router,
    private _operationservice: OperationService,
    private _process: ProcessService,
    private _matDialog: MatDialog,
    public snackBar: MatSnackBar) { }


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
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'description', 'workCenter', 'baloonNo', 'specification', 'toloreanceGrade', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency', 'firstPartInspection', 'periodicInspection', 'ctq'];
    }
    else {
      this.displayedColumns = ['id', 'opnNo', 'opnName', 'description', 'workCenter', 'baloonNo', 'specification', 'toloreanceGrade', 'tolFrom', 'tolTo', 'instrument', 'measuringFrequency',  'firstPartInspection', 'periodicInspection', 'ctq'];
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
      opnNo: new FormControl(''),
      opnName: new FormControl(''),
      description: new FormControl(''),
      workCenter: new FormControl(''),
      specification: new FormControl('', Validators.required),
      toloreanceGrade: new FormControl('', Validators.required),
      tolFrom: new FormControl('', Validators.required),
      tolTo: new FormControl('', Validators.required),
      instrument: new FormControl(''),
      measuringFrequency: new FormControl(''),
      baloonNo: new FormControl(''),
      firstPartInspection: new FormControl(),
      periodicInspection: new FormControl(),
      ctq: new FormControl(),
      pdi: new FormControl(),
      cfir: new FormControl(),
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  addNewRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.insert(0, this.initiateForm());
    this.dataSource.filteredData = this.userTable.controls["tableRows"].value
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
    if (this.userTable.valid) {
      this.userTable.value.tableRows.forEach(element => {
        if (element.id) {
          this._sampleservice.updateSampling(element.id, element).subscribe((res: any) => {
            console.log(res);
          });
        } else {
          delete element.id;
          delete element.pid;
          element.drgId = JSON.parse(localStorage.getItem('drgObject')).id;
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
          this._sampleservice.addSampling(element).subscribe((res: any) => {
            console.log(res);
          });
        }
      });
      await this.snackBar.open("Process updated successfully", "", {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'errorsnackbarclass'
      });
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
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this Operation?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {

        this._operationservice.deleteOperation(id).subscribe((res: any) => {
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
              "description": opn.description,
              "workCenter": opn.workCenter,
              "specification": pro.specification,
              "toloreanceGrade": pro.toloreanceGrade,
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

            });
          });
        });

        // for (var key in mydata) {

        //   let mydata1 = mydata[key];
        //   var tmp1 = new Object();
        //   for (var key1 in mydata1) {

        //     if (key1 == "Processes") {

        //       var mydata2 = mydata1[key1];
        //       for (var key2 in mydata2) {

        //         var mydata3 = mydata2[key2];

        //         var tmp = new Object();

        //         tmp["specification"]=mydata3.specification
        //         tmp["toloreanceGrade"]=mydata3.toloreanceGrade
        //         tmp["tolFrom"]=mydata3.tolFrom
        //         tmp["tolTo"]=mydata3.tolTo
        //         tmp["instrument"]=mydata3.instrument
        //         tmp["measuringFrequency"]=mydata3.measuringFrequency
        //         tmp["grid"]=mydata3.grid
        //         tmp["firstPartInspection"]=mydata3.firstPartInspection
        //         tmp["periodicInspection"]=mydata3.periodicInspection
        //         tmp["ctq"]=mydata3.ctq
        //         tmp["opnId"]=mydata3.opnId
        //         tmp["drgId"]=mydata3.drgId
        //         // for (var key3 in mydata3) {

        //         //   if(key3 =="id"){
        //         //     tmp["pid"] = mydata3.id
        //         //   }
        //         //   else if(key3 =="opnName"){
        //         //     tmp["popnName"] = mydata3.opnName
        //         //   }
        //         //   else if(key3 =="description"){
        //         //     tmp["pdescription"] = mydata3.description
        //         //   }
        //         //   else{
        //         //     tmp[key3] = mydata3[key3]
        //         //   }
        //         // }

        //         let test = Object.assign(tmp1, tmp)

        //       temp1.push(test);



        //       }


        //     }
        //     else {
        //       tmp1[key1] = mydata1[key1];
        //     }
        //   }


        // }
        this.formData = result;
        result.forEach(element => {
          this.addRow();
        });
        this.userTable.controls["tableRows"].patchValue(this.formData)
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }

    });

  }
}
