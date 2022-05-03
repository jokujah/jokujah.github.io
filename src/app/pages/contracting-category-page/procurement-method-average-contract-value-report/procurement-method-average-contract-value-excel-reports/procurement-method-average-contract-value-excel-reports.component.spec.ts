import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementMethodAverageContractValueExcelReportsComponent } from './procurement-method-average-contract-value-excel-reports.component';

describe('ProcurementMethodAverageContractValueExcelReportsComponent', () => {
  let component: ProcurementMethodAverageContractValueExcelReportsComponent;
  let fixture: ComponentFixture<ProcurementMethodAverageContractValueExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementMethodAverageContractValueExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementMethodAverageContractValueExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
