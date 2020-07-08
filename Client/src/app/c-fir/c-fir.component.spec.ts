import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CFirComponent } from './c-fir.component';

describe('CFirComponent', () => {
  let component: CFirComponent;
  let fixture: ComponentFixture<CFirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CFirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CFirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
