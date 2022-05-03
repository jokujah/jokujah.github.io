import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedContractsExcelReportsComponent } from './completed-contracts-excel-reports.component';

describe('CompletedContractsExcelReportsComponent', () => {
  let component: CompletedContractsExcelReportsComponent;
  let fixture: ComponentFixture<CompletedContractsExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedContractsExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedContractsExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
