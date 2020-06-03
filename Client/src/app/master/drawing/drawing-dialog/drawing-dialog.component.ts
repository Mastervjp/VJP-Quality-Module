import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';
import { DrawingtypeService } from '../../masterservice/drawingtype.service';

@Component({
  selector: 'app-drawing-dialog',
  templateUrl: './drawing-dialog.component.html',
  styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent1  {

 
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<DrawingDialogComponent1>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _drawingservice: DrawingtypeService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Drawing Type";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        
      });
    }
    else {
      this.dialogTitle = 'Add Drawing Type';
    }

  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();

    this._drawingservice.addDrawing(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Drawing Type Created Sucessfully", "", {
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

    this._drawingservice.updateDrawing(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Drawing Type Updated Sucessfully", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
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
