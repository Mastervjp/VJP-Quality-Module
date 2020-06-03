import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPlanComponent } from './quality-plan.component';

describe('QualityPlanComponent', () => {
  let component: QualityPlanComponent;
  let fixture: ComponentFixture<QualityPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
