import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar3Component } from './navbar3.component';

describe('Navbar3Component', () => {
  let component: Navbar3Component;
  let fixture: ComponentFixture<Navbar3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navbar3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navbar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
