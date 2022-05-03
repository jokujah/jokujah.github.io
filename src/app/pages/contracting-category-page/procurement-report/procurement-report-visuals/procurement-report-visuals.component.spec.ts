import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementReportVisualsComponent } from './procurement-report-visuals.component';

describe('ProcurementReportVisualsComponent', () => {
  let component: ProcurementReportVisualsComponent;
  let fixture: ComponentFixture<ProcurementReportVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementReportVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementReportVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
