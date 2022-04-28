import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningCategoryPageComponent } from './planning-category-page.component';

describe('PlanningCategoryPageComponent', () => {
  let component: PlanningCategoryPageComponent;
  let fixture: ComponentFixture<PlanningCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
