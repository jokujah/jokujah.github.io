import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardedContractReportComponent } from './awarded-contract-report.component';

describe('AwardedContractReportComponent', () => {
  let component: AwardedContractReportComponent;
  let fixture: ComponentFixture<AwardedContractReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardedContractReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardedContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
