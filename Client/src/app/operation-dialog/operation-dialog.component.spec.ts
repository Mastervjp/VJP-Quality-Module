import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDialogComponent } from './operation-dialog.component';

describe('OperationDialogComponent', () => {
  let component: OperationDialogComponent;
  let fixture: ComponentFixture<OperationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
