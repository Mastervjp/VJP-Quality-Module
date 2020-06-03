import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-batchquantity',
  templateUrl: './batchquantity.component.html',
  styleUrls: ['./batchquantity.component.css']
})
export class BatchquantityComponent {

  batchForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BatchquantityComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.batchForm = this._formBuilder.group({
      qty: ['', [Validators.required]]
    });
  }


  closebatch() {
    var data = this.batchForm.value.qty;
    
    this.dialogRef.close(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
