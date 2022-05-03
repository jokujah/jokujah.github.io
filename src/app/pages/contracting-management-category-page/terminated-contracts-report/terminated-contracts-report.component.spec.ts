import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatedContractsReportComponent } from './terminated-contracts-report.component';

describe('TerminatedContractsReportComponent', () => {
  let component: TerminatedContractsReportComponent;
  let fixture: ComponentFixture<TerminatedContractsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminatedContractsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatedContractsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
