import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProcesslistService } from '../master/masterservice/processlist.service';
@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  contactForm = this._formBuilder.group({
    description: ['', Validators.required],
    baloonNo: ['', Validators.required],
    specification: ['', Validators.required],
    tolFrom: ['', Validators.required],
    tolTo: ['', Validators.required],


  });
  id: any;
  processName: string;
  name: any;
  constructor(private _formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<ProcessListComponent>,
    private _processlistservice: ProcesslistService,
    public snackBar: MatSnackBar,
   ) {


    }

  ngOnInit(): void {
  }
  addOperation() {
    let step1 = this.contactForm.getRawValue(); 

    this.id = JSON.parse(localStorage.getItem('processObject')).id;
    this.name = JSON.parse(localStorage.getItem('processObject')).name;

    step1.name = this.name;
    step1.processId = this.id;


    this._processlistservice.addOperation(step1).subscribe((res: any) => {
      if (res.success) {
        this.matDialogRef.close(true);
        this.contactForm.reset();
        this.snackBar.open("Processlist Created Sucessfully", "", {
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

}
