import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameWorkExcelReportsComponent } from './frame-work-excel-reports.component';

describe('FrameWorkExcelReportsComponent', () => {
  let component: FrameWorkExcelReportsComponent;
  let fixture: ComponentFixture<FrameWorkExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameWorkExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameWorkExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
