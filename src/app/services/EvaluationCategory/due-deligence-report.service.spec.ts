import { TestBed } from '@angular/core/testing';

import { DueDeligenceReportService } from './due-deligence-report.service';

describe('DueDeligenceReportService', () => {
  let service: DueDeligenceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DueDeligenceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
