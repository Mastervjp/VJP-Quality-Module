import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from '../services/operation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DrawingService } from '../services/drawing.service';


@Component({
  selector: 'app-copy-process',
  templateUrl: './copy-process.component.html',
  styleUrls: ['./copy-process.component.css']
})
export class CopyProcessComponent {

  displayedColumns: string[] = ['select', 'id', 'opnNo', 'opnName', 'description', 'workCenter'];



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }





  copycode(){

   let a = this.selection.selected
   let drgid = localStorage.getItem('DrgCode');

    let data1 = {
      data : a,
      drgid :drgid
    }


    this._drawing.copyDrawing(data1).subscribe((res: any) => {

     
      if (res.success) {
        this.matDialogRef.close(true);
        this.contactForm.reset();
        this.snackBar.open("Code Copied Sucessfully", "", {
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











  action: string;
  dialogTitle: string;
  viewdata: any
  editId: any;
  dataset: any;
  isCast: boolean;
  isMech: any;
  materialdataset: any;
  dataSource : any;
  selection:any
  heatdata: any;
  castToldata: any;
  machineToldata: any;
  splProdata: any;

  constructor(
    public matDialogRef: MatDialogRef<CopyProcessComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _operationservice: OperationService,
    private _drawing: DrawingService,

  ) {
    this.action = _data.action;

   

      this.dialogTitle = 'Copy Process';

      this.isCast = false;
      this.isMech = false;


  }



  contactForm = this._formBuilder.group({
    DrgId: ['', Validators.required],
    

  });


  searchDrg(){

    let step1 = this.contactForm.getRawValue();
    let drgid =step1.DrgId;
    this._operationservice.getoperation(drgid).subscribe((res: any) => {
      if (res.success) {
        let mydata = res.data;
        this.dataSource = new MatTableDataSource(mydata);
        this.selection = new SelectionModel(true, []);


      }

    });

  }


}
