import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcharacteristicsComponent } from './productcharacteristics.component';

describe('ProductcharacteristicsComponent', () => {
  let component: ProductcharacteristicsComponent;
  let fixture: ComponentFixture<ProductcharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
