import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualVsPlannedProcurementReportComponent } from './actual-vs-planned-procurement-report.component';

describe('ActualVsPlannedProcurementReportComponent', () => {
  let component: ActualVsPlannedProcurementReportComponent;
  let fixture: ComponentFixture<ActualVsPlannedProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualVsPlannedProcurementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualVsPlannedProcurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
