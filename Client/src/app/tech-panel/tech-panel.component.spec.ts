import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPanelComponent } from './tech-panel.component';

describe('TechPanelComponent', () => {
  let component: TechPanelComponent;
  let fixture: ComponentFixture<TechPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
