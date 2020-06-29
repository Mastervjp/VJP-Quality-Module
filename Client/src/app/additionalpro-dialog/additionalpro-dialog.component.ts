import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { QualityService } from '../services/quality.service';

@Component({
  selector: 'app-additionalpro-dialog',
  templateUrl: './additionalpro-dialog.component.html',
  styleUrls: ['./additionalpro-dialog.component.css']
})
export class AdditionalproDialogComponent {

  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  dataset: any;
  newpfNo : any;

   constructor(
    public matDialogRef: MatDialogRef<AdditionalproDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _drawing: DrawingService,
    public snackBar: MatSnackBar,
    private _qualityservice: QualityService,
  ) {
    this.action = _data.action;

    
  
      this.dialogTitle = 'Add Alternative Process';

    

      // this.newpfNo = "PF"
   

  }
 

  addDrawing() {

    let testObj :any = JSON.parse(localStorage.getItem('drgObject'));

    let code = testObj.id

    var n = code.toString().length
    
    if(n == 1){

      this.newpfNo = "PP 000000"+code+"-20A"

    }
    else if(n == 2){
      this.newpfNo = "PP 00000"+code+"-20A"
    }
    else if(n == 3){
      this.newpfNo = "PP 0000"+code+"-20A"
    }
    else if(n == 4){
      this.newpfNo = "PP 000"+code+"-20A"
    }
    else if(n == 5){
      this.newpfNo = "PP 00"+code+"-20A"
    }
    else if(n == 6){
      this.newpfNo = "PP 0"+code+"-20A"
    }
    else{
      this.newpfNo = "PP "+code+"-20A"
    }

    let step1 = {
      "pfNo":this.newpfNo,
      "drgId":testObj.id
    };

    this._qualityservice.addQuality(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
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



  contactForm = this._formBuilder.group({
    pfnumber: [],
    qpnumber: [],
  });



}
