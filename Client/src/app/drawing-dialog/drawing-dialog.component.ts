
import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';


@Component({
  selector: 'app-drawing-dialog',
  templateUrl: './drawing-dialog.component.html',
  styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  dataset: any;
  isCast: boolean;
  isMech: any;
  materialdataset: any;

  heatdata: any;
  castToldata: any;
  machineToldata: any;
  splProdata: any;




  constructor(
    public matDialogRef: MatDialogRef<DrawingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _drawing: DrawingService,
    public snackBar: MatSnackBar,
    private _opservice: OperationService,
  ) {
    this.action = _data.action;

    this.getDrawingtype();

    this.getmaterial();
    this.getHeatTreatment();
    this.getCastingTolerance();
    this.getMachiningTolerance();
    this.getSpecialProcess();

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Drawing";
      this.editId = _data.data.id;



      if (_data.data.partNum) {
        this.isCast = true;

        this.contactForm.patchValue({
          check1: true,
        });


      }
      if (_data.data.partNum1) {
        this.isMech = true;
        this.contactForm.patchValue({
          check2: true,
        });
      }

      this.contactForm.patchValue({
        partName: _data.data.partName,
        partNum: _data.data.partNum,
        revNo: _data.data.revNo,
        partNum1: _data.data.partNum1,
        revNo1: _data.data.revNo1,
        type: _data.data.type,
        revDate: _data.data.revDate,
        revDate1: _data.data.revDate1,
        customerName: _data.data.customerName,
        endCustomer: _data.data.endCustomer,
        materialSpec: _data.data.materialSpec,
        materialGrade: _data.data.materialGrade,
        // materialWeight: _data.data.materialWeight,



        withRunerWeight: _data.data.withRunerWeight,
        castWeight: _data.data.castWeight,
        machineWeight: _data.data.machineWeight,
        heatTreatmentCycle: _data.data.heatTreatmentCycle,
        castingToleranceStandard: _data.data.castingToleranceStandard,
        machiningToleranceStandard: _data.data.machiningToleranceStandard,
        measurementUnit: _data.data.measurementUnit,
        // specialProcess: _data.data.specialProcess,
        specialInstruction: _data.data.specialInstruction,
        fpi: _data.data.fpi,
        radiographyTest:_data.data.radiographyTest,
        anodizing:_data.data.anodizing,
        powderCoating:_data.data.powderCoating


      });
    }
    else {
      this.dialogTitle = 'Add Drawing';

      this.isCast = false;
      this.isMech = false;
    }

  }
  getDrawingtype() {
    this._opservice.getDrawingtype().subscribe((res: any) => {
      if (res.success) {
        this.dataset = res.data;
      }
    });
  }

  getmaterial() {

    this._opservice.getmaterial().subscribe((res: any) => {
      if (res.success) {
        this.materialdataset = res.data;
      }
    });
  }

  getHeatTreatment() {

    this._drawing.getHeatTreatment().subscribe((res: any) => {
      if (res.success) {
        this.heatdata = res.data;
      }
    });

  }

  getCastingTolerance() {

    this._drawing.getCastingTolerance().subscribe((res: any) => {
      if (res.success) {
        this.castToldata = res.data;
      }
    });

  }

  getMachiningTolerance() {

    this._drawing.getMachiningTolerance().subscribe((res: any) => {
      if (res.success) {
        this.machineToldata = res.data;
      }
    });

  }


  getSpecialProcess() {

    this._drawing.getSpecialProcess().subscribe((res: any) => {
      if (res.success) {
        this.splProdata = res.data;
      }
    });

  }


  CastshowOptions(event) {
    if (event.checked) {
      this.isCast = true;
    }
    else {
      this.isCast = false;
    }
  }


  MechshowOptions(event) {
    if (event.checked) {
      this.isMech = true;
    }
    else {
      this.isMech = false;
    }
  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();

    this._drawing.addDrawing(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Drawing Code Created Sucessfully", "", {
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

  updateDrawing(editId) {

    let step1 = this.contactForm.getRawValue();

    this._drawing.updateDrawing(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Drawing Code Updated Sucessfully", "", {
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

  contactForm = this._formBuilder.group({
    partName: ['', Validators.required],
    partNum: [],
    partNum1: [],
    revNo: [],
    revNo1: [],
    revDate: [],
    revDate1: [],
    check1: [],
    check2: [],

    customerName: [],

    materialSpec: ['', Validators.required],
    materialGrade: ['', Validators.required],
    // materialWeight: ['', Validators.required],

    withRunerWeight: ['', Validators.required],
    castWeight: ['', Validators.required],
    machineWeight: ['', Validators.required],
    heatTreatmentCycle: ['', Validators.required],
    castingToleranceStandard: ['', Validators.required],
    machiningToleranceStandard: ['', Validators.required],
    measurementUnit: ['', Validators.required],
    fpi: [],
    radiographyTest:[],
    anodizing:[],
    powderCoating:[],
    specialInstruction: [],

  });




}
