import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroProcurementReportComponent } from './micro-procurement-report.component';

describe('MicroProcurementReportComponent', () => {
  let component: MicroProcurementReportComponent;
  let fixture: ComponentFixture<MicroProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroProcurementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroProcurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
