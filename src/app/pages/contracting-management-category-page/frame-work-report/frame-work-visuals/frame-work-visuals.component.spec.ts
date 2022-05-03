import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameWorkVisualsComponent } from './frame-work-visuals.component';

describe('FrameWorkVisualsComponent', () => {
  let component: FrameWorkVisualsComponent;
  let fixture: ComponentFixture<FrameWorkVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameWorkVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameWorkVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
