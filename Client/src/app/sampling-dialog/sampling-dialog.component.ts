import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { ProcessService } from '../services/process.service';
import { SamplingService } from '../services/sampling.service';

@Component({
  selector: 'app-sampling-dialog',
  templateUrl: './sampling-dialog.component.html',
  styleUrls: ['./sampling-dialog.component.css']
})
export class SamplingDialogComponent {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  workData: any;
  Oplist: any;
  type: any;

  instrumentList: any;
  measuringList: any;

  contactForm = this._formBuilder.group({
    opnNo: ['', Validators.required],
    opnName: ['', Validators.required],
    description: [],
    workCenter: ['', Validators.required],
    specification: [],
    toloreanceGrade: [],
    tolFrom: [],
    tolTo: [],
    instrument: ['', Validators.required],
    measuringFrequency: ['', Validators.required],
    grid: [],
    firstPartInspection: [],
    periodicInspection: [],
    ctq: [],
    pdi: [],
    cfir:[],

  });


  constructor(public matDialogRef: MatDialogRef<SamplingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _samplingservice: SamplingService,
    private _operationservice: OperationService,
    public snackBar: MatSnackBar,
    private _process: ProcessService,

  ) {
    this.action = _data.action;
    this.type = _data.type

    this.getWorkcenter()
    this.getOplist();
    this.getInstrument();
    this.getMeasuring();

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Process";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        opnNo: _data.data.opnNo,
        opnName: _data.data.opnName,
        description: _data.data.description,
        workCenter: _data.data.workCenter,
        specification: _data.data.specification,
        toloreanceGrade: _data.data.toloreanceGrade,
        tolFrom: _data.data.tolFrom,
        tolTo: _data.data.tolTo,
        instrument: _data.data.instrument,
        measuringFrequency: _data.data.measuringFrequency,
        grid: _data.data.grid,
        firstPartInspection: _data.data.firstPartInspection,
        periodicInspection: _data.data.periodicInspection,
        ctq: _data.data.ctq,
        pdi:_data.data.pdi,
        cfir:_data.data.cfir,
      });
    }
    else {
      this.dialogTitle = 'Add Sample Master';

    }

  }

  addOperation() {

    let step1 = this.contactForm.getRawValue();
    step1.drgId =  JSON.parse( localStorage.getItem('drgObject')).id

    if (step1.firstPartInspection) {
      //action
      step1.firstPartInspection = true

    }
    else {
      step1.firstPartInspection = 0
    }
    if (step1.periodicInspection) {
      //action
    }
    else {
      step1.periodicInspection = 0
    }
    if (step1.ctq) {
      //action
    }
    else {
      step1.ctq = 0
    }
    this._samplingservice.addSampling(step1).subscribe((res: any) => {
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

  testbala(id) {
    this.matDialogRef.close(true);
    this.snackBar.open("   .", "", {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'errorsnackbarclass'
    });
  }

  updateOperation(editId: any) {

    let step1 = this.contactForm.getRawValue();
    step1.qpId = localStorage.getItem('qpid');
    step1.drgId = localStorage.getItem('DrgCode');

    this._samplingservice.updateSampling(editId, step1).subscribe((res: any) => {
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


}
