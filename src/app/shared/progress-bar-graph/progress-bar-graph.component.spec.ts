import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarGraphComponent } from './progress-bar-graph.component';

describe('ProgressBarGraphComponent', () => {
  let component: ProgressBarGraphComponent;
  let fixture: ComponentFixture<ProgressBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
