import { TestBed } from '@angular/core/testing';

import { DoanhoiService } from './doanhoi.service';

describe('DoanhoiService', () => {
  let service: DoanhoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoanhoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
