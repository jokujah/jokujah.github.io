import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPortalReportsListComponent } from './supplier-portal-reports-list.component';

describe('SupplierPortalReportsListComponent', () => {
  let component: SupplierPortalReportsListComponent;
  let fixture: ComponentFixture<SupplierPortalReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPortalReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPortalReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
