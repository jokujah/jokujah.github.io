import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedContractsVisualsComponent } from './completed-contracts-visuals.component';

describe('CompletedContractsVisualsComponent', () => {
  let component: CompletedContractsVisualsComponent;
  let fixture: ComponentFixture<CompletedContractsVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedContractsVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedContractsVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
