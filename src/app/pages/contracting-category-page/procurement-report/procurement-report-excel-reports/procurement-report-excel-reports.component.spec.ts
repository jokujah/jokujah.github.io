import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementReportExcelReportsComponent } from './procurement-report-excel-reports.component';

describe('ProcurementReportExcelReportsComponent', () => {
  let component: ProcurementReportExcelReportsComponent;
  let fixture: ComponentFixture<ProcurementReportExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementReportExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementReportExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
