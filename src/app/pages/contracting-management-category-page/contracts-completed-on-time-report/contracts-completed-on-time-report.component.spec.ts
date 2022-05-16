import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsCompletedOnTimeReportComponent } from './contracts-completed-on-time-report.component';

describe('ContractsCompletedOnTimeReportComponent', () => {
  let component: ContractsCompletedOnTimeReportComponent;
  let fixture: ComponentFixture<ContractsCompletedOnTimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsCompletedOnTimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsCompletedOnTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
