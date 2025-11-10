import { TestBed } from '@angular/core/testing';

import { ButtonsFormService } from './buttons-form-service';

describe('ButtonsFormService', () => {
  let service: ButtonsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
