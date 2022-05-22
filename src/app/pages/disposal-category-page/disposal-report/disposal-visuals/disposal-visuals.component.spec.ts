import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalVisualsComponent } from './disposal-visuals.component';

describe('DisposalVisualsComponent', () => {
  let component: DisposalVisualsComponent;
  let fixture: ComponentFixture<DisposalVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalVisualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
