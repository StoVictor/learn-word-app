import { TestBed } from '@angular/core/testing';

import { CreatePackService } from './create-pack.service';

describe('CreatePackService', () => {
  let service: CreatePackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
