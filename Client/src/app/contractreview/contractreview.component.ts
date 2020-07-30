import { Component, OnInit } from '@angular/core';
import { ContractreviewService } from '../services/contractreview.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contractreview',
  templateUrl: './contractreview.component.html',
  styleUrls: ['./contractreview.component.css']
})
export class ContractreviewComponent implements OnInit {
  


  constructor(private _table: ContractreviewService, private _formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
  
  }


  addData() {


    let step1 = this.contactForm.getRawValue();



    this._table.addData(step1).subscribe((res: any) => {
      this.router.navigate(['/contractreviewview']); 
      
    });


  }


  contactForm = this._formBuilder.group({
    customerName: ['', Validators.required],
    billTo: ['', Validators.required],
    shipTo: ['', Validators.required],
    offerNo: ['', Validators.required],
    offerDate: ['', Validators.required],
    poNumber: ['', Validators.required],
    poDate: ['', Validators.required],
    poReceived: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    legend: ['', Validators.required],
    regular: [''],
    tooling: [''],
    purchaseOrderType: [''],
    componentName: ['', Validators.required],
    partNo: ['', Validators.required],
    rev: ['', Validators.required],
    asCast: [''],
    heatTreatment: [''],
    shotBlast: [''],
    machined: [''],
    leakTest: [''],
    ndtXrayDp: [''],
    dp: [''],
    fpi: [''],
    anodizing: [''],
    powderCoating: [''],
    painting: [''],
    poQuantity: ['', Validators.required],
    alloyGrade: ['', Validators.required],
    vjpComponentquotedPrice: ['', Validators.required],
    shippingAddress: ['', Validators.required],
    ourNameAddress: ['', Validators.required],
    vendorCode: ['', Validators.required],
    price: ['', Validators.required],
    exWorks: [''],
    dap: [''],
    fob: [''],
    cif: [''],
    paymentTerms: ['', Validators.required],
    deliveryRequirement: ['', Validators.required],
    specialDocumentationRequirements: ['', Validators.required],
    freightTerms: ['', Validators.required],
    shippingMethod: ['', Validators.required],
    aluminiumVariationClause: ['', Validators.required],
    foreignExchangeVariationClause: ['', Validators.required],
    tax: ['', Validators.required],
    termsConditions: ['', Validators.required],
    otherRequirements: [''],
    conditionsInPONotPresentInYYQuote: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteA: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteB: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteC: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteD: ['', Validators.required],
    processLeadTime: ['', Validators.required],
  });



}
