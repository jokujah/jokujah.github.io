import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationTableComponent } from './visualization-table.component';

describe('VisualizationTableComponent', () => {
  let component: VisualizationTableComponent;
  let fixture: ComponentFixture<VisualizationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
