import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalReportComponent } from './disposal-report.component';

describe('DisposalReportComponent', () => {
  let component: DisposalReportComponent;
  let fixture: ComponentFixture<DisposalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
