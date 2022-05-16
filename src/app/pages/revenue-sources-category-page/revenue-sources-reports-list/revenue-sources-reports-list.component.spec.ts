import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSourcesReportsListComponent } from './revenue-sources-reports-list.component';

describe('RevenueSourcesReportsListComponent', () => {
  let component: RevenueSourcesReportsListComponent;
  let fixture: ComponentFixture<RevenueSourcesReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueSourcesReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSourcesReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
