import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSourcesCategoryPageComponent } from './revenue-sources-category-page.component';

describe('RevenueSourcesCategoryPageComponent', () => {
  let component: RevenueSourcesCategoryPageComponent;
  let fixture: ComponentFixture<RevenueSourcesCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueSourcesCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSourcesCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
