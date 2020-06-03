import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrgDetailsComponent } from './drg-details.component';

describe('DrgDetailsComponent', () => {
  let component: DrgDetailsComponent;
  let fixture: ComponentFixture<DrgDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
