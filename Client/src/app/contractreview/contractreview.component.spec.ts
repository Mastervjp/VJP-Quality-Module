import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractreviewComponent } from './contractreview.component';

describe('ContractreviewComponent', () => {
  let component: ContractreviewComponent;
  let fixture: ComponentFixture<ContractreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
