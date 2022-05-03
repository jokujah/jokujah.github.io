import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractingReportsListComponent } from './contracting-reports-list.component';

describe('ContractingReportsListComponent', () => {
  let component: ContractingReportsListComponent;
  let fixture: ComponentFixture<ContractingReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractingReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractingReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
