import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardedContractExcelReportsComponent } from './awarded-contract-excel-reports.component';

describe('AwardedContractExcelReportsComponent', () => {
  let component: AwardedContractExcelReportsComponent;
  let fixture: ComponentFixture<AwardedContractExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardedContractExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardedContractExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
