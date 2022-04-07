import { TestBed } from '@angular/core/testing';

import { SleepTimeService } from './sleep-time.service';

describe('SleepTimeService', () => {
  let service: SleepTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
