import { TestBed } from '@angular/core/testing';

import { AwardedContractReportService } from './awarded-contract-report.service';

describe('AwardedContractReportService', () => {
  let service: AwardedContractReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardedContractReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
