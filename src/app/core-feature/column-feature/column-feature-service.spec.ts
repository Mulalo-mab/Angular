import { TestBed } from '@angular/core/testing';

import { ColumnFeatureService } from './column-feature-service';

describe('ColumnFeatureService', () => {
  let service: ColumnFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
