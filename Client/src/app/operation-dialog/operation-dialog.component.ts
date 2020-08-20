import { Component, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';
import { environment } from 'src/environments/environment';
import { QualityService } from '../services/quality.service';


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
  type: any;
  processData: any;
  productData: any;
  incomingData: any;


  private IMG_URL = environment.IMG_URL;

  url1: any = "assets/product-image-placeholder.png";
  url2: any = "assets/product-image-placeholder.png";
  url3: any = "assets/product-image-placeholder.png";
  url4: any = "assets/product-image-placeholder.png";

  uploadfile1: File = null;
  uploadfile2: File = null;
  uploadfile3: File = null;
  uploadfile4: File = null;



  contactForm = this._formBuilder.group({
    opnNo: ['', Validators.required],
    opnName: ['', Validators.required],
    description: ['', Validators.required],
    workCenter: ['', Validators.required],
    incomingSource: ['', Validators.required],
    processCharacteristics: ['', Validators.required],
    productCharacteristics: ['', Validators.required],

    uploadImage1: ['', Validators.required],
    uploadImage2: ['', Validators.required],
    uploadImage3: ['', Validators.required],
    uploadImage4: ['', Validators.required],
  });

 

  constructor(public matDialogRef: MatDialogRef<OperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _operationservice: OperationService,
    public snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private _qualityservice: QualityService,
    private _drawingservice: DrawingService

  ) {
    this.action = _data.action;
    this.type = _data.type

    this.getWorkcenter();
    this.getOplist();
    this. getincoming();
    this.getProcessCharacteristics(); 
    this.getProductCharacteristics();
    
    if (this.action === 'edit') {

      this.dialogTitle = "Edit Process";
      this.editId = _data.data.id;

      this.contactForm.patchValue({
        opnNo: _data.data.opnNo,
        opnName: _data.data.opnName,
        description: _data.data.description,
        workCenter: _data.data.workCenter,
        incomingSource: _data.data.incomingSource,
        processCharacteristics: _data.data.processCharacteristics,
        productCharacteristics: _data.data.productCharacteristics,
        type: _data.data.type,

        uploadImage1: _data.data.image1,
        uploadImage2: _data.data.image2,
        uploadImage3: _data.data.image3,
        uploadImage4: _data.data.image4,
      });

      this.url1 = this.IMG_URL+'//vjp/process/'+_data.data.image1
      this.url2 = this.IMG_URL+'//vjp/process/'+_data.data.image2
      this.url3 = this.IMG_URL+'//vjp/process/'+_data.data.image3
      this.url4 = this.IMG_URL+'//vjp/process/'+_data.data.image4

    }
    else {
      this.dialogTitle = 'Add Process';

    }

  }

  addOperation() {

    let step1 = this.contactForm.getRawValue();


    step1.drgId = localStorage.getItem('DrgCode');
    step1.opNo = localStorage.getItem('opnNo');

    const formData = new FormData();
    formData.append('fileKey1', this.uploadfile1, this.uploadfile1.name);
    formData.append('fileKey2', this.uploadfile2, this.uploadfile2.name);
    formData.append('fileKey3', this.uploadfile3, this.uploadfile3.name);
    formData.append('fileKey4', this.uploadfile4, this.uploadfile4.name);

    formData.append('drgId', step1.drgId);
    formData.append('opNo', step1.opNo);


    formData.append('opnNo', step1.opnNo);
    formData.append('opnName', step1.opnName);
    formData.append('description', step1.description);
    formData.append('workCenter', step1.workCenter);
    formData.append('incomingSource', step1.incomingSource);
    formData.append('processCharacteristics', step1.processCharacteristics);
    formData.append('productCharacteristics', step1.productCharacteristics);


    if (this.type == 'altpro') {
      step1.altProcess = 1;
      formData.append('altProcess', step1.altProcess);
    }
    if (this.type == 'addkind') {
      step1.addKind = 1;
      formData.append('addkind', step1.addkind);
    }

    this._operationservice.addOperation(formData).subscribe((res: any) => {
      if (res.success) {
        let operatorStatus = { "operatorStatus": null }
        let pfno = localStorage.getItem('pfno');
        this._qualityservice.updatestatus(pfno, operatorStatus).subscribe((res: any) => {
        });

        let status = { "status": null }
        this._qualityservice.approval(pfno, status).subscribe((res: any) => {
        });
        
        let masterStatus = { "masterStatus": null }
        this._qualityservice.approvalMaster(pfno, masterStatus).subscribe((res: any) => {
        });
        
        let id = localStorage.getItem('DrgCode')
        let techApproval = { "techApproval": null } 
        this._drawingservice.updatestatus(id, techApproval).subscribe((res: any) => {
        });

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


    const formData = new FormData();

    formData.append('key', '1');


    if (this.uploadfile1) {
      formData.append('fileKey1', this.uploadfile1, this.uploadfile1.name);
      formData.append('upstatus1', '1');


    }

    if (this.uploadfile2) {
      formData.append('fileKey2', this.uploadfile2, this.uploadfile2.name);
      formData.append('upstatus2', '1');


    }

    if (this.uploadfile3) {
      formData.append('fileKey3', this.uploadfile3, this.uploadfile3.name);
      formData.append('upstatus3', '1');


    }

    if (this.uploadfile4) {
      formData.append('fileKey4', this.uploadfile4, this.uploadfile4.name);
      formData.append('upstatus4', '1');

    }


    formData.append('drgId', step1.drgId);
    formData.append('qpId', step1.qpId);


    formData.append('opnNo', step1.opnNo);
    formData.append('opnName', step1.opnName);
    formData.append('description', step1.description);
    formData.append('workCenter', step1.workCenter);
    formData.append('incomingSource', step1.incomingSource);
    formData.append('processCharacteristics', step1.processCharacteristics);
    formData.append('productCharacteristics', step1.productCharacteristics);


    this._operationservice.updateOperation(editId, formData).subscribe((res: any) => {
      if (res.success) {
        let status = { "status": null }
        // this._operationservice.updatestatus(editId, status).subscribe((res: any) => {
        // });

        let masterApproval = { "masterApproval": null }
        // this._operationservice.updatemasterstatus(editId, masterApproval).subscribe((res: any) => {
        // });
        let opnNo = localStorage.getItem('opnNo');
        let qpTechConfirm = { "qpTechConfirm": null }
        this._operationservice.approval(editId, qpTechConfirm).subscribe((res: any) => {
        });

        let qpMasterApproval = { "qpMasterApproval": null }
        this._operationservice.approvalMaster(editId, qpMasterApproval).subscribe((res: any) => {
        });


        let pfno = localStorage.getItem('pfno');
        this._qualityservice.approval(pfno, status).subscribe((res: any) => {
        });

        let masterStatus = { "masterStatus": null }
        this._qualityservice.approvalMaster(pfno, masterStatus).subscribe((res: any) => {
        });

        let operatorStatus = { "operatorStatus": null }
        this._qualityservice.updatestatus(pfno, operatorStatus).subscribe((res: any) => {
        });


               
        let id = localStorage.getItem('DrgCode')
        let techApproval = { "techApproval": null } 
        this._drawingservice.updatestatus(id, techApproval).subscribe((res: any) => {
        });

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

  getincoming() {
    this._operationservice.getincoming().subscribe((res: any) => {
      if (res.success) {
        this.incomingData = res.data;
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

  
  getProcessCharacteristics() {
    this._operationservice.getProcessCharacteristics().subscribe((res: any) => {
      if (res.success) {
        this.processData = res.data;
      }
    });
  }
  
  getProductCharacteristics() {
    this._operationservice.getProductCharacteristics().subscribe((res: any) => {
      if (res.success) {
        this.productData = res.data;
      }
    });
  }

  
  onFileChange1(event) {


    const reader1 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file1] = event.target.files;
      this.uploadfile1 = event.target.files[0]
      reader1.readAsDataURL(file1);

      reader1.onload = () => {
        this.url1 = reader1.result;
        this.contactForm.patchValue({
          uploadImage1: reader1.result
        });
        this.cd.markForCheck();
      };
    }
  }


  onFileChange2(event) {
    const reader2 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file2] = event.target.files;
      this.uploadfile2 = event.target.files[0]
      reader2.readAsDataURL(file2);

      reader2.onload = () => {
        this.url2 = reader2.result;
        this.contactForm.patchValue({
          uploadImage2: reader2.result
        });
        this.cd.markForCheck();
      };
    }
  }


  onFileChange3(event) {
    const reader3 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.uploadfile3 = event.target.files[0]
      reader3.readAsDataURL(file);

      reader3.onload = () => {
        this.url3 = reader3.result;
        this.contactForm.patchValue({
          uploadImage3: reader3.result
        });
        this.cd.markForCheck();
      };
    }
  }


  onFileChange4(event) {
    const reader4 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file4] = event.target.files;
      this.uploadfile4 = event.target.files[0]
      reader4.readAsDataURL(file4);

      reader4.onload = () => {
        this.url4 = reader4.result;
        this.contactForm.patchValue({
          uploadImage4: reader4.result
        });
        this.cd.markForCheck();
      };
    }
  }




}
