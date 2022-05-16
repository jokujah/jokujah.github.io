import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationReportsListComponent } from './solicitation-reports-list.component';

describe('SolicitationReportsListComponent', () => {
  let component: SolicitationReportsListComponent;
  let fixture: ComponentFixture<SolicitationReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitationReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
