import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalReportsListComponent } from './disposal-reports-list.component';

describe('DisposalReportsListComponent', () => {
  let component: DisposalReportsListComponent;
  let fixture: ComponentFixture<DisposalReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
