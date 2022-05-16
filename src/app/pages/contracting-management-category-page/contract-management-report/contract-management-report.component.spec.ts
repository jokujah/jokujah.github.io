import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementReportComponent } from './contract-management-report.component';

describe('ContractManagementReportComponent', () => {
  let component: ContractManagementReportComponent;
  let fixture: ComponentFixture<ContractManagementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractManagementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
