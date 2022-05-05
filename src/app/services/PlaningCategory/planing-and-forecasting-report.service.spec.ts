import { TestBed } from '@angular/core/testing';

import { PlaningAndForecastingReportService } from './planing-and-forecasting-report.service';

describe('PlaningAndForecastingReportService', () => {
  let service: PlaningAndForecastingReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaningAndForecastingReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
