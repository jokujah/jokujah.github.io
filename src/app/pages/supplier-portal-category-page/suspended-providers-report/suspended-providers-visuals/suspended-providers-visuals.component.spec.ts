import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedProvidersVisualsComponent } from './suspended-providers-visuals.component';

describe('SuspendedProvidersVisualsComponent', () => {
  let component: SuspendedProvidersVisualsComponent;
  let fixture: ComponentFixture<SuspendedProvidersVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendedProvidersVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedProvidersVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
