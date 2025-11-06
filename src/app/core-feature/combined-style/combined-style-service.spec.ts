import { TestBed } from '@angular/core/testing';

import { CombinedStyleService } from './combined-style-service';

describe('CombinedStyleService', () => {
  let service: CombinedStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinedStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
