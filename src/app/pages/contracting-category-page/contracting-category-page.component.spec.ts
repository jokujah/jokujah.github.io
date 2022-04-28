import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractingCategoryPageComponent } from './contracting-category-page.component';

describe('ContractingCategoryPageComponent', () => {
  let component: ContractingCategoryPageComponent;
  let fixture: ComponentFixture<ContractingCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractingCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractingCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
