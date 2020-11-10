import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DrawingTableComponent } from './drawing-table/drawing-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBar, MatSnackBarContainer, MatSnackBarModule } from '@angular/material';
import { AuthenticationService } from './services/authentication.service';

import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';


import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { DrawingService } from './services/drawing.service';
import { OperationComponent } from './operation/operation.component';
import { ProcessComponent } from './process/process.component';
import { InspectionComponent } from './inspection/inspection.component';
import { FirstpartComponent } from './firstpart/firstpart.component';
import { PeriodicComponent } from './periodic/periodic.component';
import { BatchquantityComponent } from './batchquantity/batchquantity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DrgDetailsComponent } from './drg-details/drg-details.component';
import { ProcessDialogComponent } from './process-dialog/process-dialog.component';
import { DrawingDialogComponent } from './drawing-dialog/drawing-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';


import { MatNativeDateModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { QualityPlanComponent } from './quality-plan/quality-plan.component';
import { OperationDialogComponent } from './operation-dialog/operation-dialog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuard } from './services/admin.guard';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AdminService } from './services/admin.service';
import { QpAbstractComponent } from './qp-abstract/qp-abstract.component';
import { QualityService } from './services/quality.service';
import { QpDialogComponent } from './qp-dialog/qp-dialog.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MachineListComponent } from './master/machining/machine-list/machine-list.component';
import { MachineDialogComponent } from './master/machining/machine-dialog/machine-dialog.component';
import { WorkcenterListComponent } from './master/workcenter/workcenter-list/workcenter-list.component';
import { WorkcenterDialogComponent } from './master/workcenter/workcenter-dialog/workcenter-dialog.component';
import { OperationListComponent } from './master/operation/operation-list/operation-list.component';
import { MeasuringDialogComponent } from './master/measuring/measuring-dialog/measuring-dialog.component';
import { MeasuringListComponent } from './master/measuring/measuring-list/measuring-list.component';
import { DrawingListComponent } from './master/drawing/drawing-list/drawing-list.component';
import { InstrumentDialogComponent } from './master/instrument/instrument-dialog/instrument-dialog.component';
import { InstrumentListComponent } from './master/instrument/instrument-list/instrument-list.component';
import { DrawingDialogComponent1 } from './master/drawing/drawing-dialog/drawing-dialog.component';
import { OperationDialogComponent1 } from './master/operation/operation-dialog/operation-dialog.component';
import { BatchqtyComponent } from './batchqty/batchqty.component';
import { MatCardModule } from '@angular/material/card';
import { FirstpartPrintComponent } from './firstpart-print/firstpart-print.component';
import { AdditionalproDialogComponent } from './additionalpro-dialog/additionalpro-dialog.component';
import { RouteCardComponent } from './route-card/route-card.component';
import { AltProcessPlanComponent } from './alt-process-plan/alt-process-plan.component';
import { AltQualityPlanComponent } from './alt-quality-plan/alt-quality-plan.component';
import { KindProcessPlanComponent } from './kind-process-plan/kind-process-plan.component';
import { KindQualityPlanComponent } from './kind-quality-plan/kind-quality-plan.component';
import { AddkindDialogComponent } from './addkind-dialog/addkind-dialog.component';
import { SamplingComponent } from './sampling/sampling.component';
import { SamplingDialogComponent } from './sampling-dialog/sampling-dialog.component';
import { MarketViewComponent } from './market-view/market-view.component';
import { MarketAbstractComponent } from './market-abstract/market-abstract.component';
import { MarketCardComponent } from './market-card/market-card.component';
import { MaterialListComponent } from './master/material/material-list/material-list.component';
import { MaterialDialogComponent } from './master/material/material-dialog/material-dialog.component';
import { MachineService } from './master/masterservice/machine.service';
import { FooterComponent } from './footer/footer.component';
import { PredispatchComponent } from './predispatch/predispatch.component';
import { CastingTolComponent } from './master/casting-tol/casting-tol.component';
import { MachineTolStdComponent } from './master/machine-tol-std/machine-tol-std.component';
import { HeatTreatmentComponent } from './master/heat-treatment/heat-treatment.component';
import { SpecialProcessComponent } from './master/special-process/special-process.component';
import { CatingTolDialogComponent } from './master/casting-tol/cating-tol-dialog/cating-tol-dialog.component';
import { SpecialProDialogComponent } from './master/special-process/special-pro-dialog/special-pro-dialog.component';
import { HeatTreatmentDialogComponent } from './master/heat-treatment/heat-treatment-dialog/heat-treatment-dialog.component';
import { MachineTolDialogComponent } from './master/machine-tol-std/machine-tol-dialog/machine-tol-dialog.component';
import { AddDrawingComponent } from './add-drawing/add-drawing.component';
import { DataService } from './services/data.service';
import { MarketQtyComponent } from './market-qty/market-qty.component';
import { CopyProcessComponent } from './copy-process/copy-process.component';
import { SampleDrawingComponent } from './sample-drawing/sample-drawing.component';
import { ContractreviewComponent } from './contractreview/contractreview.component';
import { ContractreviewViewComponent } from './contractreview-view/contractreview-view.component';
import { FirComponent } from './fir/fir.component';
import { CFirComponent } from './c-fir/c-fir.component';
import { ContractreviewPrintComponent } from './contractreview-print/contractreview-print.component';
import { ContractreviewEditComponent } from './contractreview-edit/contractreview-edit.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { QpapprovalDrawingTableComponent } from './qpapproval-drawing-table/qpapproval-drawing-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductCharacteristicsComponent } from './master/product-characteristics/product-characteristics.component';
import { ProcessCharacteristicsComponent } from './master/process-characteristics/process-characteristics.component';
import { IncomingSourceComponent } from './master/incoming-source/incoming-source.component';
import { IncomingComponent } from './master/dialog/incoming/incoming.component';
import { ProductcharacteristicsComponent } from './master/dialog/productcharacteristics/productcharacteristics.component';
import { ProcesscharacteristicsComponent } from './master/dialog/processcharacteristics/processcharacteristics.component';
import { ProcessListComponent } from './process-list/process-list.component';
// import { DrawingcodeComponent } from './drawingcode/drawingcode.component';
// import { DrawingcodeRoutecardComponent } from './drawingcode-routecard/drawingcode-routecard.component';
// import { DrawingcodeRoutecardeditComponent } from './drawingcode-routecardedit/drawingcode-routecardedit.component';
// import { EmptyComponent } from './empty/empty.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { CastingDrgDetailsComponent } from './casting-drg-details/casting-drg-details.component';
import { CastingFirstpartComponent } from './casting-firstpart/casting-firstpart.component';
import { CastingPeriodicComponent } from './casting-periodic/casting-periodic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DrawingTableComponent,
    OperationComponent,
    ProcessComponent,
    InspectionComponent,
    FirstpartComponent,
    PeriodicComponent,
    BatchquantityComponent,
    DrgDetailsComponent,
    ProcessDialogComponent,
    DrawingDialogComponent,
    ConfirmDialogComponent,
    QualityPlanComponent,
    OperationDialogComponent,
    UserTableComponent,
    UserDialogComponent,
    QpAbstractComponent,
    QpDialogComponent,
    NavbarComponent,
    SidebarComponent,
    MachineListComponent,
    MachineDialogComponent,
    WorkcenterListComponent,
    WorkcenterDialogComponent,
    OperationListComponent,
    MeasuringDialogComponent,
    MeasuringListComponent,
    DrawingListComponent,
    InstrumentDialogComponent,
    InstrumentListComponent,
    DrawingDialogComponent1,
    OperationDialogComponent1,
    BatchqtyComponent,
    FirstpartPrintComponent,
    AdditionalproDialogComponent,
    RouteCardComponent,
    AltProcessPlanComponent,
    AltQualityPlanComponent,
    KindProcessPlanComponent,
    KindQualityPlanComponent,
    AddkindDialogComponent,
    SamplingComponent,
    SamplingDialogComponent,
    MarketViewComponent,
    MarketAbstractComponent,
    MarketCardComponent,
    MaterialListComponent,
    MaterialDialogComponent,
    FooterComponent,
    PredispatchComponent,
    CastingTolComponent,
    MachineTolStdComponent,
    HeatTreatmentComponent,
    SpecialProcessComponent,
    CatingTolDialogComponent,
    SpecialProDialogComponent,
    HeatTreatmentDialogComponent,
    MachineTolDialogComponent,
    AddDrawingComponent,
    MarketQtyComponent,
    CopyProcessComponent,
    SampleDrawingComponent,
    ContractreviewComponent,
    ContractreviewViewComponent,
    FirComponent,
    CFirComponent,
    ContractreviewPrintComponent,
    ContractreviewEditComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    QpapprovalDrawingTableComponent,
    ProductCharacteristicsComponent,
    ProcessCharacteristicsComponent,
    IncomingSourceComponent,
    IncomingComponent,
    ProductcharacteristicsComponent,
    ProcesscharacteristicsComponent,
    ProcessListComponent,
    // DrawingcodeComponent,
    // DrawingcodeRoutecardComponent,
    // DrawingcodeRoutecardeditComponent,
    // EmptyComponent,
    // DashboardComponent,
    CastingDrgDetailsComponent,
    CastingFirstpartComponent,
    CastingPeriodicComponent,
   
    ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,

    
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatRippleModule,
    MatTabsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule, FormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule

  ],

  entryComponents: [
    BatchquantityComponent,
    DrawingDialogComponent,
    ConfirmDialogComponent,
    OperationDialogComponent,
    ProcessDialogComponent,
    UserDialogComponent,
    QpDialogComponent,
    MachineDialogComponent,
    WorkcenterDialogComponent,
    DrawingDialogComponent,
    DrawingDialogComponent1,
    InstrumentDialogComponent,
    MeasuringDialogComponent,
    OperationDialogComponent1,
    AdditionalproDialogComponent,
    AddkindDialogComponent,
    SamplingDialogComponent,
    MaterialDialogComponent,
    CatingTolDialogComponent,
    MarketQtyComponent,
    CopyProcessComponent
  ],
  providers: [AuthenticationService,
    DrawingService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    AuthGuardService,
    AdminGuard,
    AdminService,
    QualityService,
    MachineService,
    DataService

  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
