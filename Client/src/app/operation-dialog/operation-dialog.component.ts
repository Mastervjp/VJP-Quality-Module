import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';


@Component({
  selector: 'app-operation-dialog',
  templateUrl: './operation-dialog.component.html',
  styleUrls: ['./operation-dialog.component.css']
})
export class OperationDialogComponent {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  workData: any;
  Oplist: any;
  type : any;

  contactForm = this._formBuilder.group({
    opnNo: ['', Validators.required],
    opnName: ['', Validators.required],
    description: ['', Validators.required],
    workCenter: ['', Validators.required],
  });


  constructor(public matDialogRef: MatDialogRef<OperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _operationservice: OperationService,
    public snackBar: MatSnackBar,

  ) {
    this.action = _data.action;
    this.type = _data.type

    this.getWorkcenter()
    this.getOplist();

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Process";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        opnNo: _data.data.opnNo,
        opnName: _data.data.opnName,
        description: _data.data.description,
        workCenter: _data.data.workCenter,
        type: _data.data.type,
      });
    }
    else {
      this.dialogTitle = 'Add Process';

    }

  }

  addOperation() {

    let step1 = this.contactForm.getRawValue();
    step1.drgId = localStorage.getItem('DrgCode');
    step1.opNo = localStorage.getItem('opnNo');

    if(this.type == 'altpro'){
      step1.altProcess = 1;
    }
    if(this.type == 'addkind'){
      step1.addKind = 1;
    }

    this._operationservice.addOperation(step1).subscribe((res: any) => {
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

  updateOperation(editId: any) {

    let step1 = this.contactForm.getRawValue();
    step1.qpId = localStorage.getItem('qpid');
    step1.drgId = localStorage.getItem('DrgCode');

    this._operationservice.updateOperation(editId, step1).subscribe((res: any) => {
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


}
