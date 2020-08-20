import { TestBed } from '@angular/core/testing';

import { ProcesscharacteristicsService } from './processcharacteristics.service';

describe('ProcesscharacteristicsService', () => {
  let service: ProcesscharacteristicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesscharacteristicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
