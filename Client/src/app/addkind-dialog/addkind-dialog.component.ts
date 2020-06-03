import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { QualityService } from '../services/quality.service';

@Component({
  selector: 'app-addkind-dialog',
  templateUrl: './addkind-dialog.component.html',
  styleUrls: ['./addkind-dialog.component.css']
})
export class AddkindDialogComponent {

  
  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  dataset: any;
  newpfNo : any;

   constructor(
    public matDialogRef: MatDialogRef<AddkindDialogComponent>,
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

      this.newpfNo = "PP 000000"+code+"-30A"

    }
    else if(n == 2){
      this.newpfNo = "PP 00000"+code+"-30A"
    }
    else if(n == 3){
      this.newpfNo = "PP 0000"+code+"-30A"
    }
    else if(n == 4){
      this.newpfNo = "PP 000"+code+"-30A"
    }
    else if(n == 5){
      this.newpfNo = "PP 00"+code+"-30A"
    }
    else if(n == 6){
      this.newpfNo = "PP 0"+code+"-30A"
    }
    else{
      this.newpfNo = "PP "+code+"-30A"
    }

    let step1 = {
      "pfNo":this.newpfNo,
      "drgId":testObj.id
    };

    this._qualityservice.addQuality(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Drawing Code Created Sucessfully", "", {
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
