import { TestBed } from '@angular/core/testing';

import { PostComponentService } from './post-component-service';

describe('PostComponentService', () => {
  let service: PostComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
