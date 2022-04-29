import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningReportsListComponent } from './planing-reports-list.component';

describe('PlaningReportsListComponent', () => {
  let component: PlaningReportsListComponent;
  let fixture: ComponentFixture<PlaningReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaningReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaningReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
