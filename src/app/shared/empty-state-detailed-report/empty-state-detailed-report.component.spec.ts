import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateDetailedReportComponent } from './empty-state-detailed-report.component';

describe('EmptyStateDetailedReportComponent', () => {
  let component: EmptyStateDetailedReportComponent;
  let fixture: ComponentFixture<EmptyStateDetailedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyStateDetailedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
