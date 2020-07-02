import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractreviewViewComponent } from './contractreview-view.component';

describe('ContractreviewViewComponent', () => {
  let component: ContractreviewViewComponent;
  let fixture: ComponentFixture<ContractreviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractreviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractreviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
