import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-add-drawing',
  templateUrl: './add-drawing.component.html',
  styleUrls: ['./add-drawing.component.css']
})
export class AddDrawingComponent implements OnInit {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  dataset: any;
  isCast: boolean;
  isMech: any;
  materialdataset:any;
  _data : any;


  // constructor(
  //   private _myService: DataService,

  //   private _formBuilder: FormBuilder,
  //   private _drawing: DrawingService,
  //   public snackBar: MatSnackBar,
  //   private _opservice: OperationService,
  // ) {

  //   this._data = this._myService.getData()

  //   this.action = this._data.action;

  //   this.getDrawingtype();

  //   this.getmaterial();

  //   if (this.action === 'edit') {

  //     this.dialogTitle = "Edit Drawing";
  //     this.editId = this._data.data.id;



  //     if (this._data.data.partNum) {
  //       this.isCast = true;

  //       this.contactForm.patchValue({
  //         check1: true,
  //       });


  //     }
  //     if (this._data.data.partNum1) {
  //       this.isMech = true;
  //       this.contactForm.patchValue({
  //         check2: true,
  //       });
  //     }

  //     this.contactForm.patchValue({
  //       partName: this._data.data.partName,
  //       partNum: this._data.data.partNum,
  //       revNo: this._data.data.revNo,
  //       partNum1: this._data.data.partNum1,
  //       revNo1: this._data.data.revNo1,
  //       type: this._data.data.type,
  //       revDate: this._data.data.revDate,
  //       revDate1: this._data.data.revDate1,
  //       customerName: this._data.data.customerName,
  //       endCustomer: this._data.data.endCustomer,
  //       materialSpec: this._data.data.materialSpec,
  //       materialGrade: this._data.data.materialGrade,
  //       materialWeight: this._data.data.materialWeight,
  //     });
  //   }
  //   else {
  //     this.dialogTitle = 'Add Drawing';

  //     this.isCast = false;
  //     this.isMech = false;
  //   }

  // }



  ngOnInit(): void {
  }



  // getDrawingtype() {
  //   this._opservice.getDrawingtype().subscribe((res: any) => {
  //     if (res.success) {
  //       this.dataset = res.data;
  //     }
  //   });
  // }

  // getmaterial(){

  //   this._opservice.getmaterial().subscribe((res: any) => {
  //     if (res.success) {
  //       this.materialdataset = res.data;
  //     }
  //   });
  // }


  // CastshowOptions(event) {
  //   if (event.checked) {
  //     this.isCast = true;
  //   }
  //   else {
  //     this.isCast = false;
  //   }
  // }


  // MechshowOptions(event) {
  //   if (event.checked) {
  //     this.isMech = true;
  //   }
  //   else {
  //     this.isMech = false;
  //   }
  // }

  // addDrawing() {

  //   let step1 = this.contactForm.getRawValue();


  //   this._drawing.addDrawing(step1).subscribe((res: any) => {
  //     if (res.success) {
  //       this.contactForm.reset();
  //       this.snackBar.open("Drawing Code Created Sucessfully", "", {
  //         duration: 1500,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: 'successsnackbarclass'
  //       });
  //     }
  //     else {
  //       this.snackBar.open(res.message, "", {
  //         duration: 1500,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: 'errorsnackbarclass'
  //       });
  //     }
  //   });

  // }

  // updateDrawing(editId) {

  //   let step1 = this.contactForm.getRawValue();

  //   this._drawing.updateDrawing(editId, step1).subscribe((res: any) => {
  //     if (res.success) {
  //       this.contactForm.reset();
  //       this.snackBar.open("Drawing Code Updated Sucessfully", "", {
  //         duration: 1500,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: 'successsnackbarclass'
  //       });

  //     }
  //     else {
  //       this.snackBar.open(res.message, "", {
  //         duration: 1500,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: 'errorsnackbarclass'
  //       });
  //     }
  //   });


  // }

  // contactForm = this._formBuilder.group({
  //   partName: ['', Validators.required],
  //   partNum: [],
  //   partNum1: [],
  //   revNo: [],
  //   revNo1: [],
  //   revDate: [],
  //   revDate1: [],
  //   check1: [],
  //   check2: [],

  //   customerName: [],

  //   materialSpec: ['', Validators.required],
  //   materialGrade: ['', Validators.required],
  //   materialWeight: ['', Validators.required],

  // });



}
