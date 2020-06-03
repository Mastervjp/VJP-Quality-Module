import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTableComponent } from './drawing-table.component';

describe('DrawingTableComponent', () => {
  let component: DrawingTableComponent;
  let fixture: ComponentFixture<DrawingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
