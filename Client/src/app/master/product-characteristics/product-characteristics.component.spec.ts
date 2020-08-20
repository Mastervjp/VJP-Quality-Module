import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicsComponent } from './product-characteristics.component';

describe('ProductCharacteristicsComponent', () => {
  let component: ProductCharacteristicsComponent;
  let fixture: ComponentFixture<ProductCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
