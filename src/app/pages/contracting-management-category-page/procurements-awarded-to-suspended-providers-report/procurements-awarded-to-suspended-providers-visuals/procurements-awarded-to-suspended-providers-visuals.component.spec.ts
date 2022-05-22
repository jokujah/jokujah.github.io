import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementsAwardedToSuspendedProvidersVisualsComponent } from './procurements-awarded-to-suspended-providers-visuals.component';

describe('ProcurementsAwardedToSuspendedProvidersVisualsComponent', () => {
  let component: ProcurementsAwardedToSuspendedProvidersVisualsComponent;
  let fixture: ComponentFixture<ProcurementsAwardedToSuspendedProvidersVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementsAwardedToSuspendedProvidersVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementsAwardedToSuspendedProvidersVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
