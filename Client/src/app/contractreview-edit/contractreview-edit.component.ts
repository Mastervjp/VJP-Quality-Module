import { Component, Inject, OnInit } from '@angular/core';
import { ContractreviewService } from '../services/contractreview.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'app-contractreview-edit',
  templateUrl: './contractreview-edit.component.html',
  styleUrls: ['./contractreview-edit.component.css']
})
export class ContractreviewEditComponent implements OnInit {
  action: string;
  dialogTitle: string;
  editId: any;
  dataSource: any;

  constructor(private _table: ContractreviewService, 
    public snackBar: MatSnackBar, 
    private _formBuilder: FormBuilder, 
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) private _data: any, 
    private _matDialog: MatDialog,
  public matDialogRef: MatDialogRef<ContractreviewEditComponent>,
   )
   {
    this.editId = _data.data.id;
    this.contactForm.patchValue({
      customerName: _data.data.customerName,
      billTo: _data.data.billTo,
      shipTo: _data.data.shipTo,
      offerNo: _data.data.offerNo,
      offerDate: _data.data.offerDate,
      poNumber: _data.data.poNumber,
      poDate: _data.data.poDate,
      poReceived: _data.data.poReceived,
      deliveryDate: _data.data.deliveryDate,
      legend: _data.data.legend,
      regular: _data.data.regular,
      tooling: _data.data.tooling,
      purchaseOrderType: _data.data.purchaseOrderType,
      componentName: _data.data.componentName,
      partNo: _data.data.partNo,
      rev: _data.data.rev,
      asCast: _data.data.asCast,
      heatTreatment: _data.data.heatTreatment,
      shotBlast: _data.data.shotBlast,
      machined: _data.data.machined,
      leakTest: _data.data.leakTest,
      ndtXrayDp: _data.data.ndtXrayDp,
      dp: _data.data.dp,
      fpi: _data.data.fpi,
      anodizing: _data.data.anodizing,
      powderCoating: _data.data.powderCoating,
      painting: _data.data.painting,
      poQuantity: _data.data.poQuantity,
      alloyGrade: _data.data.alloyGrade,
      vjpComponentquotedPrice: _data.data.vjpComponentquotedPrice,
      shippingAddress: _data.data.shippingAddress,
      ourNameAddress: _data.data.ourNameAddress,
      vendorCode: _data.data.vendorCode,
      price: _data.data.price,
      exWorks: _data.data.exWorks,
      dap: _data.data.dap,
      fob: _data.data.fob,
      cif: _data.data.cif,
      paymentTerms: _data.data.paymentTerms,
      deliveryRequirement: _data.data.deliveryRequirement,
      specialDocumentationRequirements: _data.data.specialDocumentationRequirements,
      freightTerms: _data.data.freightTerms,
      shippingMethod: _data.data.shippingMethod,
      aluminiumVariationClause: _data.data.aluminiumVariationClause,
      foreignExchangeVariationClause: _data.data.foreignExchangeVariationClause,
      tax: _data.data.tax,
      termsConditions: _data.data.termsConditions,
      otherRequirements: _data.data.otherRequirements,
      conditionsInPONotPresentInYYQuote: _data.data.conditionsInPONotPresentInYYQuote,
      conditionsInPONotPresentInYYQuoteA: _data.data.conditionsInPONotPresentInYYQuoteA,
      conditionsInPONotPresentInYYQuoteB: _data.data.conditionsInPONotPresentInYYQuoteB,
      conditionsInPONotPresentInYYQuoteC: _data.data.conditionsInPONotPresentInYYQuoteC,
      conditionsInPONotPresentInYYQuoteD: _data.data.conditionsInPONotPresentInYYQuoteD,
      processLeadTime: _data.data.processLeadTime,
    });

  }



  ngOnInit(): void {
    console.log(this._data);


  }




  updateContract(editId) {

    let step1 = this.contactForm.getRawValue();

    this._table.updateContract(editId, step1).subscribe((res: any) => {

     
      if (res.success) {
        this.matDialogRef.close();
        this.contactForm.reset();
        
        
            let status = { "status": null }     
            this._table.updateContract(editId, status).subscribe((res: any) => {         
              });
            
          
        this.snackBar.open("Contract review form updated successfully", "", {
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
    regular: ['',],
    tooling: ['',],
    purchaseOrderType: ['',],
    componentName: ['', Validators.required],
    partNo: ['', Validators.required],
    rev: ['', Validators.required],
    asCast: ['',],
    heatTreatment: ['',],
    shotBlast: ['',],
    machined: ['',],
    leakTest: ['',],
    ndtXrayDp: ['',],
    dp: ['',],
    fpi: ['',],
    anodizing: ['',],
    powderCoating: ['',],
    painting: ['',],
    poQuantity: ['', Validators.required],
    alloyGrade: ['', Validators.required],
    vjpComponentquotedPrice: ['', Validators.required],
    shippingAddress: ['', Validators.required],
    ourNameAddress: ['', Validators.required],
    vendorCode: ['', Validators.required],
    price: ['', Validators.required],
    exWorks: ['',],
    dap: ['',],
    fob: ['',],
    cif: ['',],
    paymentTerms: ['', Validators.required],
    deliveryRequirement: ['', Validators.required],
    specialDocumentationRequirements: ['', Validators.required],
    freightTerms: ['', Validators.required],
    shippingMethod: ['', Validators.required],
    aluminiumVariationClause: ['', Validators.required],
    foreignExchangeVariationClause: ['', Validators.required],
    tax: ['', Validators.required],
    termsConditions: ['', Validators.required],
    otherRequirements: ['',],
    conditionsInPONotPresentInYYQuote: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteA: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteB: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteC: ['', Validators.required],
    conditionsInPONotPresentInYYQuoteD: ['', Validators.required],
    processLeadTime: ['', Validators.required],
  });



}





