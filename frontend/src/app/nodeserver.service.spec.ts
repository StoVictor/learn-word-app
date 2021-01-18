import { TestBed } from '@angular/core/testing';

import { NodeserverService } from './nodeserver.service';

describe('NodeserverService', () => {
  let service: NodeserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
