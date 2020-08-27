import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFlowDiagramComponent } from './process-flow-diagram.component';

describe('ProcessFlowDiagramComponent', () => {
  let component: ProcessFlowDiagramComponent;
  let fixture: ComponentFixture<ProcessFlowDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFlowDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFlowDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
