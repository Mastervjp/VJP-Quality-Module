import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineService } from '../../masterservice/machine.service';
import { DrawingtypeService } from '../../masterservice/drawingtype.service';
import { InstrumentService } from '../../masterservice/instrument.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instrument-dialog',
  templateUrl: './instrument-dialog.component.html',
  styleUrls: ['./instrument-dialog.component.css']
})
export class InstrumentDialogComponent {


  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  url: any = "assets/product-image-placeholder.png";
  uploadfile: File = null;

  
  
  private IMG_URL = environment.IMG_URL;

  constructor(
    public matDialogRef: MatDialogRef<InstrumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _drawingservice: InstrumentService,
    public snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {

      this.dialogTitle = "Edit Instrument";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        name: _data.data.name,
        insId: _data.data.insId,
        dueDate: _data.data.dueDate,

        insSpecs: _data.data.insSpecs,
        uploadImage:   _data.data.insImage,

      });

      this.url = this.IMG_URL+'/vjp/instrument/'+_data.data.insImage
      
    }
    else {
      this.dialogTitle = 'Add Instrument';
    }

  }

  addDrawing() {

    let step1 = this.contactForm.getRawValue();


    const formData = new FormData();
    formData.append('fileKey', this.uploadfile, this.uploadfile.name);
    formData.append('name', step1.name);
    formData.append('insId', step1.insId);
    formData.append('dueDate', step1.dueDate);  

    formData.append('insSpecs', step1.insSpecs);

    

    this._drawingservice.addInstrument(formData).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Instrument Created Sucessfully", "", {
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

    // let step1 = this.contactForm.getRawValue();


    let step1 = this.contactForm.getRawValue();


    const formData = new FormData();

    if(this.uploadfile){
      formData.append('fileKey', this.uploadfile, this.uploadfile.name);
    }
    formData.append('name', step1.name);
    formData.append('insId', step1.insId);
    formData.append('dueDate', step1.dueDate);
    formData.append('insSpecs', step1.insSpecs);


    this._drawingservice.updateInstrument(editId, formData).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        this.snackBar.open("Instrument Updated Sucessfully", "", {
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


  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.uploadfile = event.target.files[0]
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.url = reader.result;
        this.contactForm.patchValue({
          uploadImage: reader.result
        });
        this.cd.markForCheck();
      };
    }
  }


  contactForm = this._formBuilder.group({
    insId: ['', Validators.required],
    name: ['', Validators.required],
    insSpecs: ['', Validators.required],
    dueDate: ['', Validators.required],
    uploadImage: ['', Validators.required],
  });



}
