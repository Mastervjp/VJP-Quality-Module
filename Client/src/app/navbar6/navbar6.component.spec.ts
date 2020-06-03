import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar6Component } from './navbar6.component';

describe('Navbar6Component', () => {
  let component: Navbar6Component;
  let fixture: ComponentFixture<Navbar6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navbar6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navbar6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
