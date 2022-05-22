import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualVsPlannedProcurementVisualsComponent } from './actual-vs-planned-procurement-visuals.component';

describe('ActualVsPlannedProcurementVisualsComponent', () => {
  let component: ActualVsPlannedProcurementVisualsComponent;
  let fixture: ComponentFixture<ActualVsPlannedProcurementVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualVsPlannedProcurementVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualVsPlannedProcurementVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
