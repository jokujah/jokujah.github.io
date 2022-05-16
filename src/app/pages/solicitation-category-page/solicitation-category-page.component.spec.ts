import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationCategoryPageComponent } from './solicitation-category-page.component';

describe('SolicitationCategoryPageComponent', () => {
  let component: SolicitationCategoryPageComponent;
  let fixture: ComponentFixture<SolicitationCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitationCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
