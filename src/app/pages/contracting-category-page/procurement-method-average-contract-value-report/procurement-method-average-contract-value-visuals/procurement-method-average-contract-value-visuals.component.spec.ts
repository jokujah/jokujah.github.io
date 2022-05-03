import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementMethodAverageContractValueVisualsComponent } from './procurement-method-average-contract-value-visuals.component';

describe('ProcurementMethodAverageContractValueVisualsComponent', () => {
  let component: ProcurementMethodAverageContractValueVisualsComponent;
  let fixture: ComponentFixture<ProcurementMethodAverageContractValueVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementMethodAverageContractValueVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementMethodAverageContractValueVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
