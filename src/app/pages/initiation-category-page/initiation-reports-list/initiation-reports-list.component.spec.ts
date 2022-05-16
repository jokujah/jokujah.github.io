import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiationReportsListComponent } from './initiation-reports-list.component';

describe('InitiationReportsListComponent', () => {
  let component: InitiationReportsListComponent;
  let fixture: ComponentFixture<InitiationReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiationReportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiationReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
