import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningAndForecastingReportComponent } from './planing-and-forecasting-report.component';

describe('PlaningAndForecastingReportComponent', () => {
  let component: PlaningAndForecastingReportComponent;
  let fixture: ComponentFixture<PlaningAndForecastingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaningAndForecastingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaningAndForecastingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
