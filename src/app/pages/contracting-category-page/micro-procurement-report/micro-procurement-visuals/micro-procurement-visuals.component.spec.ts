import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroProcurementVisualsComponent } from './micro-procurement-visuals.component';

describe('MicroProcurementVisualsComponent', () => {
  let component: MicroProcurementVisualsComponent;
  let fixture: ComponentFixture<MicroProcurementVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroProcurementVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroProcurementVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
