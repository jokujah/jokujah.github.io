import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedContractsReportComponent } from './signed-contracts-report.component';

describe('SignedContractsReportComponent', () => {
  let component: SignedContractsReportComponent;
  let fixture: ComponentFixture<SignedContractsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedContractsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedContractsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
