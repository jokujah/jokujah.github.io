import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateInitiationVisualsComponent } from './late-initiation-visuals.component';

describe('LateInitiationVisualsComponent', () => {
  let component: LateInitiationVisualsComponent;
  let fixture: ComponentFixture<LateInitiationVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateInitiationVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateInitiationVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
