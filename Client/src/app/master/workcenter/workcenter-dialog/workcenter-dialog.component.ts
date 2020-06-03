import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';
import { WorkcenterService } from '../../masterservice/workcenter.service';

@Component({
  selector: 'app-workcenter-dialog',
  templateUrl: './workcenter-dialog.component.html',
  styleUrls: ['./workcenter-dialog.component.css']
})
export class WorkcenterDialogComponent  {

 
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<WorkcenterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _workcenterservice: WorkcenterService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Machining";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        
      });
    }
    else {
      this.dialogTitle = 'Add Machining';
    }

  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();

    this._workcenterservice.addWorkcenter(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Workcenter List Created Sucessfully", "", {
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

    this._workcenterservice.updateWorkcenter(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("workcenter List Updated Sucessfully", "", {
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
