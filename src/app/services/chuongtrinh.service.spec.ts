import { TestBed } from '@angular/core/testing';

import { ChuongtrinhService } from './chuongtrinh.service';

describe('ChuongtrinhService', () => {
  let service: ChuongtrinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuongtrinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
