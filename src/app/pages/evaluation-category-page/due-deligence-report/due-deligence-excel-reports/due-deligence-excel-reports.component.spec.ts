import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDeligenceExcelReportsComponent } from './due-deligence-excel-reports.component';

describe('DueDeligenceExcelReportsComponent', () => {
  let component: DueDeligenceExcelReportsComponent;
  let fixture: ComponentFixture<DueDeligenceExcelReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDeligenceExcelReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDeligenceExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
