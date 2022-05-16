import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementsAwardedToSuspendedProvidersComponent } from './procurements-awarded-to-suspended-providers.component';

describe('ProcurementsAwardedToSuspendedProvidersComponent', () => {
  let component: ProcurementsAwardedToSuspendedProvidersComponent;
  let fixture: ComponentFixture<ProcurementsAwardedToSuspendedProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementsAwardedToSuspendedProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementsAwardedToSuspendedProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
