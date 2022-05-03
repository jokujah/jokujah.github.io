import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReviewVisualsComponent } from './administrative-review-visuals.component';

describe('AdministrativeReviewVisualsComponent', () => {
  let component: AdministrativeReviewVisualsComponent;
  let fixture: ComponentFixture<AdministrativeReviewVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeReviewVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReviewVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
