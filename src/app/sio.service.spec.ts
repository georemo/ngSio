import { TestBed } from '@angular/core/testing';

import { SioService } from './sio.service';

describe('SioService', () => {
  let service: SioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
