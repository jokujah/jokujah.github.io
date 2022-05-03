import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDeligenceReportComponent } from './due-deligence-report.component';

describe('DueDeligenceReportComponent', () => {
  let component: DueDeligenceReportComponent;
  let fixture: ComponentFixture<DueDeligenceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDeligenceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDeligenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
