import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpapprovalDrawingTableComponent } from './qpapproval-drawing-table.component';

describe('QpapprovalDrawingTableComponent', () => {
  let component: QpapprovalDrawingTableComponent;
  let fixture: ComponentFixture<QpapprovalDrawingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpapprovalDrawingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpapprovalDrawingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
