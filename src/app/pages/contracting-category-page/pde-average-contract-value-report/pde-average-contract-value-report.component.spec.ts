import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdeAverageContractValueReportComponent } from './pde-average-contract-value-report.component';

describe('PdeAverageContractValueReportComponent', () => {
  let component: PdeAverageContractValueReportComponent;
  let fixture: ComponentFixture<PdeAverageContractValueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdeAverageContractValueReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdeAverageContractValueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
