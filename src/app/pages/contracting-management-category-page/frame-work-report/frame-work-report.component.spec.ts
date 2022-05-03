import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameWorkReportComponent } from './frame-work-report.component';

describe('FrameWorkReportComponent', () => {
  let component: FrameWorkReportComponent;
  let fixture: ComponentFixture<FrameWorkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameWorkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
