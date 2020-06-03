import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MarketService } from '../services/market.service';

@Component({
  selector: 'app-market-qty',
  templateUrl: './market-qty.component.html',
  styleUrls: ['./market-qty.component.css']
})
export class MarketQtyComponent {



  constructor(
    public dialogRef: MatDialogRef<MarketQtyComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public snackBar: MatSnackBar,
    private _marketservice: MarketService, ) {




    this.orderForm.patchValue({
      mpId: _data.data.id,
      drgId: _data.data.drgId,
    });

    this.orderForm1.patchValue({
      remainingQty: _data.data.remainingQty,
      poNo: _data.data.poNo,
      id: _data.data.id,
    });



  }


  closebatch() {

    let step1 = this.orderForm.getRawValue();

    let step2 = this.orderForm1.getRawValue();

    // this.dialogRef.close(data);

    if (step2.remainingQty >= step1.qty) {

      this._marketservice.addCard(step1).subscribe((res: any) => {
        if (res.success) {

          localStorage.setItem("drgId", step1.drgId);
          localStorage.setItem("mpId", step1.mpId);


          this.dialogRef.close(true);
        }
      });


    }
    else {

      this.dialogRef.close();

      this.snackBar.open(" Order Quantity Exceeded ", "", {
        duration: 1500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'errorsnackbarclass'
      });


    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  orderForm = this._formBuilder.group({
    qty: ['', [Validators.required]],
    mpId: [],
    drgId: [],
    cardNo: [],
  });

  orderForm1 = this._formBuilder.group({

    remainingQty: [],
    poNo: [],
    id: [],

  });





}
