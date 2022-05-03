import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTenderExcelReportsComponent } from './cancelled-tender-excel-reports.component';

describe('CancelledTenderExcelReportsComponent', () => {
  let component: CancelledTenderExcelReportsComponent;
  let fixture: ComponentFixture<CancelledTenderExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledTenderExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledTenderExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
