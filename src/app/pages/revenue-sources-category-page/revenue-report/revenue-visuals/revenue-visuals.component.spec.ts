import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueVisualsComponent } from './revenue-visuals.component';

describe('RevenueVisualsComponent', () => {
  let component: RevenueVisualsComponent;
  let fixture: ComponentFixture<RevenueVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
