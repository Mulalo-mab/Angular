import { TestBed } from '@angular/core/testing';

import { ColumnGroupService } from './column-group-service';

describe('ColumnGroupService', () => {
  let service: ColumnGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
