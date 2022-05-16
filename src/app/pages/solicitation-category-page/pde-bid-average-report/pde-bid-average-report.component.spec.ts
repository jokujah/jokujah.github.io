import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdeBidAverageReportComponent } from './pde-bid-average-report.component';

describe('PdeBidAverageReportComponent', () => {
  let component: PdeBidAverageReportComponent;
  let fixture: ComponentFixture<PdeBidAverageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdeBidAverageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdeBidAverageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
