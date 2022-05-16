import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiationCategoryPageComponent } from './initiation-category-page.component';

describe('InitiationCategoryPageComponent', () => {
  let component: InitiationCategoryPageComponent;
  let fixture: ComponentFixture<InitiationCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiationCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiationCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
