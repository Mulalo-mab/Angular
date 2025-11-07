import { TestBed } from '@angular/core/testing';

import { UpdateRowService } from './update-row-service';

describe('UpdateRowService', () => {
  let service: UpdateRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
