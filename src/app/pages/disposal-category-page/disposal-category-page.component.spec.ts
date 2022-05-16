import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalCategoryPageComponent } from './disposal-category-page.component';

describe('DisposalCategoryPageComponent', () => {
  let component: DisposalCategoryPageComponent;
  let fixture: ComponentFixture<DisposalCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
