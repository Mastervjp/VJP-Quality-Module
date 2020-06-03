import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';
import { CastingTolService } from '../../masterservice/casting-tol.service';

@Component({
  selector: 'app-cating-tol-dialog',
  templateUrl: './cating-tol-dialog.component.html',
  styleUrls: ['./cating-tol-dialog.component.css']
})
export class CatingTolDialogComponent  {

 
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<CatingTolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _service: CastingTolService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Casting Tolerance Standard";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        
      });
    }
    else {
      this.dialogTitle = 'Add Casting Tolerance Standard';
    }

  }

  addData() {

    let step1 = this.contactForm.getRawValue();

    this._service.addData(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Casting Tolerance Standard Created Sucessfully", "", {
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

  updateData(editId) {

    let step1 = this.contactForm.getRawValue();

    this._service.updateData(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Casting Tolerance Standard Updated Sucessfully", "", {
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
    name: ['', Validators.required],
  });



}
