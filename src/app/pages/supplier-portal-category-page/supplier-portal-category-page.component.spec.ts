import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPortalCategoryPageComponent } from './supplier-portal-category-page.component';

describe('SupplierPortalCategoryPageComponent', () => {
  let component: SupplierPortalCategoryPageComponent;
  let fixture: ComponentFixture<SupplierPortalCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPortalCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPortalCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
