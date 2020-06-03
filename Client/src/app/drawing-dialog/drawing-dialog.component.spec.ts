import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingDialogComponent } from './drawing-dialog.component';

describe('DrawingDialogComponent', () => {
  let component: DrawingDialogComponent;
  let fixture: ComponentFixture<DrawingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
