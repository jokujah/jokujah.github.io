import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPerformanceVisualsComponent } from './provider-performance-visuals.component';

describe('ProviderPerformanceVisualsComponent', () => {
  let component: ProviderPerformanceVisualsComponent;
  let fixture: ComponentFixture<ProviderPerformanceVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderPerformanceVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPerformanceVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
