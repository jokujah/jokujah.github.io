import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdeAverageContractValueVisualsComponent } from './pde-average-contract-value-visuals.component';

describe('PdeAverageContractValueVisualsComponent', () => {
  let component: PdeAverageContractValueVisualsComponent;
  let fixture: ComponentFixture<PdeAverageContractValueVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdeAverageContractValueVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdeAverageContractValueVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
