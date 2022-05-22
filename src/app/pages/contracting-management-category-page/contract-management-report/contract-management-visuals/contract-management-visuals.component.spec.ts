import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementVisualsComponent } from './contract-management-visuals.component';

describe('ContractManagementVisualsComponent', () => {
  let component: ContractManagementVisualsComponent;
  let fixture: ComponentFixture<ContractManagementVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractManagementVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
