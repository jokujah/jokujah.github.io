import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdeBidAverageVisualsComponent } from './pde-bid-average-visuals.component';

describe('PdeBidAverageVisualsComponent', () => {
  let component: PdeBidAverageVisualsComponent;
  let fixture: ComponentFixture<PdeBidAverageVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdeBidAverageVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdeBidAverageVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
