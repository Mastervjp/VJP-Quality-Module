import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar5Component } from './navbar5.component';

describe('Navbar5Component', () => {
  let component: Navbar5Component;
  let fixture: ComponentFixture<Navbar5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navbar5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navbar5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
