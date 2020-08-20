import { TestBed } from '@angular/core/testing';

import { IncomingsourceService } from './incomingsource.service';

describe('IncomingsourceService', () => {
  let service: IncomingsourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingsourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
