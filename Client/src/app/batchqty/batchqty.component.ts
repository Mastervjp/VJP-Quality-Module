import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from '../services/operation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batchqty',
  templateUrl: './batchqty.component.html',
  styleUrls: ['./batchqty.component.css']
})
export class BatchqtyComponent implements OnInit {

  batchForm: FormGroup;
  machinelist: any;
  cardList: any;

  constructor(private _formBuilder: FormBuilder, private _opservice: OperationService, private router: Router) { }

  ngOnInit() {
    this.getMachine();
    this.getRoute();

    this.batchForm = this._formBuilder.group({

      card: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      machine: ['', [Validators.required]]

    });

  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getMachine() {
    this._opservice.getMachine().subscribe((res: any) => {
      if (res.success) {
        this.machinelist = res.data;
      }
    });
  }

  getRoute() {
    let id = localStorage.getItem('DrgCode');
    debugger;

    this._opservice.getRoute(id).subscribe((res: any) => {

      if (res.success) {
        this.cardList = res.data;
      }
    });
  }

  changeCard(event) {
    let qty1 = event.value.qty;

    this.batchForm.patchValue({
      qty: qty1,
    });

  }


  getInspection() {

    let step1 = this.batchForm.getRawValue();
    localStorage.setItem('batch_qty', step1.qty);
    localStorage.setItem('machine', step1.machine);

    this.router.navigate(['/inspection']);
    debugger;


  }

}
