import { TestBed } from '@angular/core/testing';

import { ContractreviewService } from './contractreview.service';

describe('ContractreviewService', () => {
  let service: ContractreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
