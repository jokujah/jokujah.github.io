import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedContractsReportComponent } from './completed-contracts-report.component';

describe('CompletedContractsReportComponent', () => {
  let component: CompletedContractsReportComponent;
  let fixture: ComponentFixture<CompletedContractsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedContractsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedContractsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
