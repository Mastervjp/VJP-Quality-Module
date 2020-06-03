// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.css']
// })
// export class ConfirmDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
    selector   : 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent
{
    public confirmMessage: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    )
    {
        
    }

}
