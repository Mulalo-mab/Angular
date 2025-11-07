import { TestBed } from '@angular/core/testing';

import { ExternalDropService } from './external-drop-service';

describe('ExternalDropService', () => {
  let service: ExternalDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
