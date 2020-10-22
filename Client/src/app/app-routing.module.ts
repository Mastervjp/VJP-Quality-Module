import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DrawingTableComponent } from './drawing-table/drawing-table.component';
import { OperationComponent } from './operation/operation.component';
import { ProcessComponent } from './process/process.component';
import { InspectionComponent } from './inspection/inspection.component';
import { BatchquantityComponent } from './batchquantity/batchquantity.component';
import { QualityPlanComponent } from './quality-plan/quality-plan.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuard } from './services/admin.guard';
import { UserTableComponent } from './user-table/user-table.component';
import { QpAbstractComponent } from './qp-abstract/qp-abstract.component';
import { MachineListComponent } from './master/machining/machine-list/machine-list.component';
import { WorkcenterListComponent } from './master/workcenter/workcenter-list/workcenter-list.component';
import { DrawingListComponent } from './master/drawing/drawing-list/drawing-list.component';
import { InstrumentListComponent } from './master/instrument/instrument-list/instrument-list.component';
import { MeasuringListComponent } from './master/measuring/measuring-list/measuring-list.component';
import { OperationListComponent } from './master/operation/operation-list/operation-list.component';
import { BatchqtyComponent } from './batchqty/batchqty.component';
import { AltProcessPlanComponent } from './alt-process-plan/alt-process-plan.component';
import { AltQualityPlanComponent } from './alt-quality-plan/alt-quality-plan.component';
import { KindProcessPlanComponent } from './kind-process-plan/kind-process-plan.component';
import { KindQualityPlanComponent } from './kind-quality-plan/kind-quality-plan.component';
import { SamplingComponent } from './sampling/sampling.component';
import { MarketViewComponent } from './market-view/market-view.component';
import { MarketCardComponent } from './market-card/market-card.component';
import { MarketAbstractComponent } from './market-abstract/market-abstract.component';
import { MaterialListComponent } from './master/material/material-list/material-list.component';
import { CastingTolComponent } from './master/casting-tol/casting-tol.component';
import { MachineTolStdComponent } from './master/machine-tol-std/machine-tol-std.component';
import { HeatTreatmentComponent } from './master/heat-treatment/heat-treatment.component';
import { SpecialProcessComponent } from './master/special-process/special-process.component';
import { AddDrawingComponent } from './add-drawing/add-drawing.component';
import { SampleDrawingComponent } from './sample-drawing/sample-drawing.component';
import { ContractreviewComponent } from './contractreview/contractreview.component';
import { ContractreviewViewComponent } from './contractreview-view/contractreview-view.component';
import { ContractreviewPrintComponent } from './contractreview-print/contractreview-print.component';
import { ContractreviewEditComponent } from './contractreview-edit/contractreview-edit.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { QpapprovalDrawingTableComponent } from './qpapproval-drawing-table/qpapproval-drawing-table.component';
import { ProductCharacteristicsComponent } from './master/product-characteristics/product-characteristics.component';
import { ProcessCharacteristicsComponent } from './master/process-characteristics/process-characteristics.component';
import { IncomingSourceComponent } from './master/incoming-source/incoming-source.component';
import { ProcessListComponent } from './process-list/process-list.component';
const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService]
  },
  {    
    path: 'register',
    component: SignupComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'drawing',
    component: DrawingTableComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'drawing_action',
    component: AddDrawingComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'processplan',
    component: OperationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'process',
    component: ProcessComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inspection',
    component: InspectionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'batchqty',
    component: BatchqtyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'adduser',
    component: UserTableComponent,
    canActivate: [AuthGuardService, AdminGuard]
  },
  {
    path: 'qpabstract',
    component: QpAbstractComponent,
    canActivate: [AuthGuardService]
  },

  // {
  //   path: 'master', component: MasterComponent, canActivate: [AuthGuardService], children: [
  //     { path: 'drawing', component: DrawingListComponent },
  //     { path: 'instrument', component: DrawingListComponent },
  //     { path: 'drawing', component: DrawingListComponent },
  //   ]
  // },


  {
    path: 'master/drawing',
    component: DrawingListComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/instrument',
    component: InstrumentListComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/machine',
    component: MachineListComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/measure',
    component: MeasuringListComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/castingtol',
    component: CastingTolComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/machinetol',
    component: MachineTolStdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'master/heattreat',
    component: HeatTreatmentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'master/specialpro',
    component: SpecialProcessComponent,
    canActivate: [AuthGuardService]
  },



  // { path: 'master/workcenter', 
  // component: WorkcenterListComponent,
  //  canActivate: [AuthGuardService] 
  // },
  {
    path: 'master/operation',
    component: OperationListComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/material',
    component: MaterialListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'master/Productcharacteristics',
    component:  ProductCharacteristicsComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/Processcharacteristics',
    component: ProcessCharacteristicsComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'master/Incomingsource',
    component: IncomingSourceComponent,
    canActivate: [AuthGuardService]
  },




  {
    path: 'altprocess',
    component: AltProcessPlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'altquality',
    component: AltQualityPlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'kindprocess',
    component: KindProcessPlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'kindquality',
    component: KindQualityPlanComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'sampling',
    component: SamplingComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'samplingcode',
    component: SampleDrawingComponent,
    canActivate: [AuthGuardService]
  },


  {
    path: 'marketview',
    component: MarketViewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'marketabstract',
    component: MarketAbstractComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'marketcard',
    component: MarketCardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contractreview',
    component: ContractreviewComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'contractreviewview',
    component: ContractreviewViewComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'contractreview-print',
    component: ContractreviewPrintComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'contractreview-Edit',
    component: ContractreviewEditComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'qpapproval-drawingtable',
    component: QpapprovalDrawingTableComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'process-list',
    component: ProcessListComponent,
    canActivate: [AuthGuardService]
  },




  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);