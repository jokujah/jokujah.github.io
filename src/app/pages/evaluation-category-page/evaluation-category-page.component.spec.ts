import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCategoryPageComponent } from './evaluation-category-page.component';

describe('EvaluationCategoryPageComponent', () => {
  let component: EvaluationCategoryPageComponent;
  let fixture: ComponentFixture<EvaluationCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
