import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingPeriodicComponent } from './casting-periodic.component';

describe('CastingPeriodicComponent', () => {
  let component: CastingPeriodicComponent;
  let fixture: ComponentFixture<CastingPeriodicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingPeriodicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingPeriodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
