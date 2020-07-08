import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractreviewPrintComponent } from './contractreview-print.component';

describe('ContractreviewPrintComponent', () => {
  let component: ContractreviewPrintComponent;
  let fixture: ComponentFixture<ContractreviewPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractreviewPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractreviewPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
