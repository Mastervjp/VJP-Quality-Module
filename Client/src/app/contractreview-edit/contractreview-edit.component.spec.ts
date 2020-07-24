import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractreviewEditComponent } from './contractreview-edit.component';

describe('ContractreviewEditComponent', () => {
  let component: ContractreviewEditComponent;
  let fixture: ComponentFixture<ContractreviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractreviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
