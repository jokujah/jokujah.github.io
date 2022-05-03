import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReviewExcelReportsComponent } from './administrative-review-excel-reports.component';

describe('AdministrativeReviewExcelReportsComponent', () => {
  let component: AdministrativeReviewExcelReportsComponent;
  let fixture: ComponentFixture<AdministrativeReviewExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeReviewExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReviewExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
