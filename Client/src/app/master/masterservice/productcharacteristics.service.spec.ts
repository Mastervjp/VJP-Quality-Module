import { TestBed } from '@angular/core/testing';

import { ProductcharacteristicsService } from './productcharacteristics.service';

describe('ProductcharacteristicsService', () => {
  let service: ProductcharacteristicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcharacteristicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
