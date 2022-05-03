import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementMethodAverageContractValueReportComponent } from './procurement-method-average-contract-value-report.component';

describe('ProcurementMethodAverageContractValueReportComponent', () => {
  let component: ProcurementMethodAverageContractValueReportComponent;
  let fixture: ComponentFixture<ProcurementMethodAverageContractValueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementMethodAverageContractValueReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementMethodAverageContractValueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
