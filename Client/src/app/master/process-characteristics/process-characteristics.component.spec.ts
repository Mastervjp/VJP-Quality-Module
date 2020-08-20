import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCharacteristicsComponent } from './process-characteristics.component';

describe('ProcessCharacteristicsComponent', () => {
  let component: ProcessCharacteristicsComponent;
  let fixture: ComponentFixture<ProcessCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
