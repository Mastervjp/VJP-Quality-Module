import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingDrgDetailsComponent } from './casting-drg-details.component';

describe('CastingDrgDetailsComponent', () => {
  let component: CastingDrgDetailsComponent;
  let fixture: ComponentFixture<CastingDrgDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingDrgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingDrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
