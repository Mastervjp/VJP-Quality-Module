// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-dialog',
//   templateUrl: './user-dialog.component.html',
//   styleUrls: ['./user-dialog.component.css']
// })
// export class UserDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-drawing-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;


  constructor(
    public matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _drawing: AdminService,
    public snackBar: MatSnackBar,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit User";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        email: _data.data.email,
        password: _data.data.password,
        role: _data.data.role
      });
    }
    else {
      this.dialogTitle = 'Add User';
    }

  }

  addUser() {

    let step1 = this.contactForm.getRawValue();

    this._drawing.addUser(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("User Created Sucessfully", "", {
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

  updateUser(editId) {

    let step1 = this.contactForm.getRawValue();

    this._drawing.updateUser(editId, step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("User Updated Sucessfully", "", {
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
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required]
  });




}

