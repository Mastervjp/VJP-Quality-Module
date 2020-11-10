import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingFirstpartComponent } from './casting-firstpart.component';

describe('CastingFirstpartComponent', () => {
  let component: CastingFirstpartComponent;
  let fixture: ComponentFixture<CastingFirstpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingFirstpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingFirstpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
