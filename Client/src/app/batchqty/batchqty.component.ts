import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { OperationService } from '../services/operation.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-batchqty',
  templateUrl: './batchqty.component.html',
  styleUrls: ['./batchqty.component.css']
})
export class BatchqtyComponent implements OnInit {

  batchForm: FormGroup;
  batchForm1: FormGroup;
  machinelist: any;
  cardList: any;
  islog: any;
  isUT: boolean;
  isOPE: boolean;
  isDISP: boolean;
  isDIS: boolean;

  constructor(private _formBuilder: FormBuilder, private _opservice: OperationService, public auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getMachine();
    this.getRoute();
    this.islog = this.auth.isLoggedIn();
    let status = localStorage.getItem('adminLogRole')
    this.checkrole(status);

    if ((this.islog == true && this.isDIS == true) || (this.islog == true && this.isDISP == true)) {
      this.batchForm = this._formBuilder.group({

        card: ['', [Validators.required]],
        qty: ['', [Validators.required]],
      });
    } else {
      this.batchForm = this._formBuilder.group({
        card: ['', [Validators.required]],
        qty: ['', [Validators.required]],
        machine: ['', [Validators.required]],
        from: ['', ],
        to: ['', ]

      });
      this.batchForm.controls.to.setValidators([
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.batchForm.controls.qty.value)(control),
        

    ]);
      this.batchForm.controls.to.setValidators([
       Validators.min(1),
        (control: AbstractControl) => Validators.max(this.batchForm.controls.qty.value)(control)
    ]);

    }

  }

  checkrole(status) {

    if (localStorage.getItem('logRole') == "DIS" || status == 'disp') {
      this.isDIS = true;
      this.isDISP = true;
    }

    else {
      this.isDIS = false;
      this.isDISP = false;

    }
    if (localStorage.getItem('logRole') == "UT" || status == 'ope') {
      this.isUT = true;
      this.isOPE = true;
    }

    else {
      this.isUT = false;
      this.isOPE = false;
    }
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
    this._opservice.getRoute(id).subscribe((res: any) => {

      if (res.success) {
        this.cardList = res.data;
      }
    });
  }

  changeCard(event) {
    localStorage.setItem('routeObj', JSON.stringify(event.value));
    let qty1 = event.value.qty;

    this.batchForm.patchValue({
      qty: qty1,
    });

  }

  getInspection() {

    let step1 = this.batchForm.getRawValue();
    localStorage.setItem('batch_qty', step1.qty);
    localStorage.setItem('machine', step1.machine);
    localStorage.setItem('qty_from', step1.from);
    localStorage.setItem('qty_to', step1.to);
    this.router.navigate(['/inspection']);
  }

  getInspection1() {

    let step1 = this.batchForm1.getRawValue();
    localStorage.setItem('batch_qty', step1.qty);
    // localStorage.setItem('machine', step1.machine);
    this.router.navigate(['/inspection']);
  }
}
