import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledTenderVisualsComponent } from './cancelled-tender-visuals.component';

describe('CancelledTenderVisualsComponent', () => {
  let component: CancelledTenderVisualsComponent;
  let fixture: ComponentFixture<CancelledTenderVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledTenderVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledTenderVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
