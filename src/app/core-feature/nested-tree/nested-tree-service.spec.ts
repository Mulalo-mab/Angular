import { TestBed } from '@angular/core/testing';

import { NestedTreeService } from './nested-tree-service';

describe('NestedTreeService', () => {
  let service: NestedTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestedTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
