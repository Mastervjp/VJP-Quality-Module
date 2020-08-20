import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesscharacteristicsComponent } from './processcharacteristics.component';

describe('ProcesscharacteristicsComponent', () => {
  let component: ProcesscharacteristicsComponent;
  let fixture: ComponentFixture<ProcesscharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesscharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesscharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
