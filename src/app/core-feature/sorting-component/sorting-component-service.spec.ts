import { TestBed } from '@angular/core/testing';

import { SortingComponentService } from './sorting-component-service';

describe('SortingComponentService', () => {
  let service: SortingComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
