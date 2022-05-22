import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementsAwardedToSuspendedProvidersReportComponent } from './procurements-awarded-to-suspended-providers-report.component';

describe('ProcurementsAwardedToSuspendedProvidersReportComponent', () => {
  let component: ProcurementsAwardedToSuspendedProvidersReportComponent;
  let fixture: ComponentFixture<ProcurementsAwardedToSuspendedProvidersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementsAwardedToSuspendedProvidersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementsAwardedToSuspendedProvidersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
