
import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-process-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrls: ['./process-dialog.component.css']
})
export class ProcessDialogComponent {


  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  instrumentList: any;
  measuringList: any;
  type: any;


  constructor(
    public matDialogRef: MatDialogRef<ProcessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _process: ProcessService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    this.type = _data.type;


    this.getInstrument();
    this.getMeasuring();


    if (this.action === 'edit') {

      this.dialogTitle = "Edit Quality Plan";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        description: _data.data.description,
        specification: _data.data.specification,
        // toloreanceGrade: _data.data.toloreanceGrade,
        tolFrom: _data.data.tolFrom,
        tolTo: _data.data.tolTo,
        baloonNo: _data.data.baloonNo,
        instrument: _data.data.instrument,
        measuringFrequency: _data.data.measuringFrequency,
        firstPartInspection: _data.data.firstPartInspection,
        periodicInspection: _data.data.periodicInspection,
        ctq: _data.data.ctq,
        pdi: _data.data.pdi,
        cfir: _data.data.cfir,
      });
    }
    else {
      this.dialogTitle = 'Add Quality Plan';
    }

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

    if (this.type == 'altpro') {
      step1.altProcess = 1;
    }
    if (this.type == 'addkind') {
      step1.addKind = 1;
    }



    this._process.addProcess(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close(true);
        this.contactForm.reset();
        this.snackBar.open("Process Created Sucessfully", "", {
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

  updateProcess(editId) {

    let step1 = this.contactForm.getRawValue();

    let tempdata = this.instrumentList;

    for (var k in tempdata) {
      if (tempdata[k].name == step1.instrument) {
        step1.insId = tempdata[k].id;
      }
    }

    step1
    this._process.updateProcess(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close(true);
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




  contactForm = this._formBuilder.group({
    description: ['', Validators.required],
    specification: ['', Validators.required],
    // toloreanceGrade: ['', Validators.required],
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
