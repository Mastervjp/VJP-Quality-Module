import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';
import { WorkcenterService } from '../../masterservice/workcenter.service';
import { MeasuringService } from '../../masterservice/measuring.service';
import { MaterialService } from '../../masterservice/material.service';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css']
})
export class MaterialDialogComponent  {

 
 
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _workcenterservice: MaterialService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Material";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        materialSpec: _data.data.materialSpec,
        materialGrade : _data.data.materialGrade,
      });
    }
    else {
      this.dialogTitle = 'Add Material';
    }

  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();

    this._workcenterservice.addMaterial(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Material Created Sucessfully", "", {
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

    this._workcenterservice.updateMaterial(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open(" Material Updated Sucessfully", "", {
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
    materialSpec: ['', Validators.required],
    materialGrade: ['', Validators.required],
  });



}
