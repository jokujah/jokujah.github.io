import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDeligenceVisualsComponent } from './due-deligence-visuals.component';

describe('DueDeligenceVisualsComponent', () => {
  let component: DueDeligenceVisualsComponent;
  let fixture: ComponentFixture<DueDeligenceVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDeligenceVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDeligenceVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
