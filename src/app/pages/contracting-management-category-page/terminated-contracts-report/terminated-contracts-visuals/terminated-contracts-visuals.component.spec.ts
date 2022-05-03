import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatedContractsVisualsComponent } from './terminated-contracts-visuals.component';

describe('TerminatedContractsVisualsComponent', () => {
  let component: TerminatedContractsVisualsComponent;
  let fixture: ComponentFixture<TerminatedContractsVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminatedContractsVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatedContractsVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
