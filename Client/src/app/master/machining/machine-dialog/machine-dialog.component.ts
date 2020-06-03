import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';

@Component({
  selector: 'app-machine-dialog',
  templateUrl: './machine-dialog.component.html',
  styleUrls: ['./machine-dialog.component.css']
})
export class MachineDialogComponent  {

 
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<MachineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _machineservice: MachineService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Machines/WorkCenter";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        
      });
    }
    else {
      this.dialogTitle = 'Add Machines/WorkCenter';
    }

  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();

    this._machineservice.addMachine(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Machines/Workcenter Created Sucessfully", "", {
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

    this._machineservice.updateMachine(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Machines/Workcenter Updated Sucessfully", "", {
          duration: 1500,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['successsnackbarclass']
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
