import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationReportsListComponent } from './evaluation-reports-list.component';

describe('EvaluationReportsListComponent', () => {
  let component: EvaluationReportsListComponent;
  let fixture: ComponentFixture<EvaluationReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
