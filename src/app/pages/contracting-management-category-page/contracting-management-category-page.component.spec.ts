import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractingManagementCategoryPageComponent } from './contracting-management-category-page.component';

describe('ContractingManagementCategoryPageComponent', () => {
  let component: ContractingManagementCategoryPageComponent;
  let fixture: ComponentFixture<ContractingManagementCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractingManagementCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractingManagementCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
