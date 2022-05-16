import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPerformanceReportComponent } from './provider-performance-report.component';

describe('ProviderPerformanceReportComponent', () => {
  let component: ProviderPerformanceReportComponent;
  let fixture: ComponentFixture<ProviderPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderPerformanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
