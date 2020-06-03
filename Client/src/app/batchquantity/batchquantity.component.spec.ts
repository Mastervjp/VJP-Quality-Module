import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchquantityComponent } from './batchquantity.component';

describe('BatchquantityComponent', () => {
  let component: BatchquantityComponent;
  let fixture: ComponentFixture<BatchquantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchquantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchquantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
