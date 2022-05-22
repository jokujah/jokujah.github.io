import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsCompletedOnTimeVisualsComponent } from './contracts-completed-on-time-visuals.component';

describe('ContractsCompletedOnTimeVisualsComponent', () => {
  let component: ContractsCompletedOnTimeVisualsComponent;
  let fixture: ComponentFixture<ContractsCompletedOnTimeVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsCompletedOnTimeVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsCompletedOnTimeVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
