import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementReportsListComponent } from './contract-management-reports-list.component';

describe('ContractManagementReportsListComponent', () => {
  let component: ContractManagementReportsListComponent;
  let fixture: ComponentFixture<ContractManagementReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractManagementReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
