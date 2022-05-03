import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTenderReportComponent } from './cancelled-tender-report.component';

describe('CancelledTenderReportComponent', () => {
  let component: CancelledTenderReportComponent;
  let fixture: ComponentFixture<CancelledTenderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledTenderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledTenderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
