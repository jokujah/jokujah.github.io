import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedContractsVisualsComponent } from './signed-contracts-visuals.component';

describe('SignedContractsVisualsComponent', () => {
  let component: SignedContractsVisualsComponent;
  let fixture: ComponentFixture<SignedContractsVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedContractsVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedContractsVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
