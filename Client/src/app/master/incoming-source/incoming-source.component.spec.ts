import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSourceComponent } from './incoming-source.component';

describe('IncomingSourceComponent', () => {
  let component: IncomingSourceComponent;
  let fixture: ComponentFixture<IncomingSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
