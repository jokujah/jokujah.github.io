import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardedContractVisualsComponent } from './awarded-contract-visuals.component';

describe('AwardedContractVisualsComponent', () => {
  let component: AwardedContractVisualsComponent;
  let fixture: ComponentFixture<AwardedContractVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardedContractVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardedContractVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
