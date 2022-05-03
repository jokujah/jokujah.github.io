import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedContractsExcelReportsComponent } from './signed-contracts-excel-reports.component';

describe('SignedContractsExcelReportsComponent', () => {
  let component: SignedContractsExcelReportsComponent;
  let fixture: ComponentFixture<SignedContractsExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedContractsExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedContractsExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
