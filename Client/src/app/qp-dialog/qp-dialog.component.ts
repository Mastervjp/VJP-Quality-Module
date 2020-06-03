import { Component, Inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { QualityService } from '../services/quality.service';

@Component({
  selector: 'app-qp-dialog',
  templateUrl: './qp-dialog.component.html',
  styleUrls: ['./qp-dialog.component.css']
})
export class QpDialogComponent  {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<QpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _quality: QualityService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit  Quality Plan";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        qpNo: _data.data.qpNo,
        kind: _data.data.kind,
        pfNo: _data.data.pfNo,
       
      });
    }
    else {
      this.dialogTitle = 'Add Quality Plan';
    }

  }

  addQP() {

    let step1 = this.contactForm.getRawValue();

    step1.drgId = localStorage.getItem('DrgCode');

    this._quality.addQuality(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Quality Plan Created Sucessfully", "", {
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

  updateQP(editId) {

    let step1 = this.contactForm.getRawValue();

    this._quality.updateQuality(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Quality Plan Updated Sucessfully", "", {
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
    qpNo: ['', Validators.required],   
    kind: ['', Validators.required],
    pfNo: ['', Validators.required],
   
  });




}
