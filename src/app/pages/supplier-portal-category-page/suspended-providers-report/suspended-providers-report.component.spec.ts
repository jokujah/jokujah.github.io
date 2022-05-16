import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedProvidersReportComponent } from './suspended-providers-report.component';

describe('SuspendedProvidersReportComponent', () => {
  let component: SuspendedProvidersReportComponent;
  let fixture: ComponentFixture<SuspendedProvidersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendedProvidersReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedProvidersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
