import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReviewReportComponent } from './administrative-review-report.component';

describe('AdministrativeReviewReportComponent', () => {
  let component: AdministrativeReviewReportComponent;
  let fixture: ComponentFixture<AdministrativeReviewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeReviewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
