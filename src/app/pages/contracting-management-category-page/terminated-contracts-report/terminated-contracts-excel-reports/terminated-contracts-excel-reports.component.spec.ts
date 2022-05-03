import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatedContractsExcelReportsComponent } from './terminated-contracts-excel-reports.component';

describe('TerminatedContractsExcelReportsComponent', () => {
  let component: TerminatedContractsExcelReportsComponent;
  let fixture: ComponentFixture<TerminatedContractsExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminatedContractsExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatedContractsExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
