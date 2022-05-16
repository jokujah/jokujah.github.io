import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateInitiationReportComponent } from './late-initiation-report.component';

describe('LateInitiationReportComponent', () => {
  let component: LateInitiationReportComponent;
  let fixture: ComponentFixture<LateInitiationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateInitiationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateInitiationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
