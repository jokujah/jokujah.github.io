import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdeAverageContractValueExcelReportsComponent } from './pde-average-contract-value-excel-reports.component';

describe('PdeAverageContractValueExcelReportsComponent', () => {
  let component: PdeAverageContractValueExcelReportsComponent;
  let fixture: ComponentFixture<PdeAverageContractValueExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdeAverageContractValueExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdeAverageContractValueExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
